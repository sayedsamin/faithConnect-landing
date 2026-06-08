import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { ZodError } from 'zod'
import { parseZeffyWebhookPayload } from '#/integrations/zeffy'
import { envServer } from '#/lib/env.server'
import { enforceRateLimit } from '#/lib/server/rate-limit'
import { applySecurityHeaders } from '#/lib/server/security'
import {
  addRequestId,
  createRequestContext,
  getRequestIp,
  logRequest,
} from '#/lib/observability/logging'
import {
  persistZeffyPaymentCompletedEvent,
  validateZeffyWebhookToken,
} from '#/lib/transactions/zeffy'
import '#/contracts/transactions'

export const Route = createFileRoute('/api/zeffy/webhook')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const context = createRequestContext({
          request,
          path: '/api/zeffy/webhook',
          method: 'POST',
        })
        const headers = applySecurityHeaders()
        addRequestId(headers, context.requestId)
        const start = Date.now()
        const ip = getRequestIp(request)
        const action = 'api.zeffy.webhook'
        const logMetadata = { ip }
        let status = 204
        const rateLimit = await enforceRateLimit(`zeffy-webhook:${ip}`)

        if (!rateLimit.allowed) {
          headers.set('retry-after', String(rateLimit.retryAfterSeconds))
          status = 429
          const response = json(
            { error: 'Rate limit exceeded' },
            { status, headers },
          )
          logRequest({
            context,
            action: `${action}.rate_limit`,
            status,
            durationMs: Date.now() - start,
            metadata: {
              ...logMetadata,
              reason: 'rate_limit_exceeded',
            },
          })
          return response
        }

        const url = new URL(request.url)
        const isAuthorized = validateZeffyWebhookToken(
          url.searchParams.get('token'),
          envServer.ZEFFY_WEBHOOK_SECRET,
        )

        if (!isAuthorized) {
          status = 401
          const response = json({ error: 'Unauthorized' }, { status, headers })
          logRequest({
            context,
            action: `${action}.unauthorized`,
            status,
            durationMs: Date.now() - start,
            metadata: {
              ...logMetadata,
              reason: 'unauthorized_webhook',
            },
          })
          return response
        }

        try {
          const event = await parseZeffyWebhookPayload(request)
          await persistZeffyPaymentCompletedEvent(event)

          const response = new Response(null, { status, headers })
          logRequest({
            context,
            action,
            status,
            durationMs: Date.now() - start,
            metadata: {
              ...logMetadata,
              event: {
                eventId: event.id,
                eventType: event.type,
              },
            },
          })
          return response
        } catch (error) {
          if (error instanceof ZodError || error instanceof SyntaxError) {
            status = 400
            const response = json(
              { error: 'Invalid webhook payload' },
              { status, headers },
            )
            logRequest({
              context,
              action: `${action}.invalid_payload`,
              status,
              durationMs: Date.now() - start,
              metadata: logMetadata,
              error,
            })

            return response
          }

          status = 500
          const response = json(
            { error: 'Unable to store webhook payment' },
            { status, headers },
          )
          logRequest({
            context,
            action: `${action}.failure`,
            status,
            durationMs: Date.now() - start,
            metadata: logMetadata,
            error,
          })
          return response
        }
      },
    },
  },
})
