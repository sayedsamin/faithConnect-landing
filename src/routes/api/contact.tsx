import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { ZodError } from 'zod'
import {
  contactErrorResponseSchema,
  contactRequestSchema,
  contactResponseSchema,
} from '#/contracts/contact'
import {
  ContactSmtpConfigError,
  handleContactSubmission,
} from '#/lib/contact/messages'
import { enforceRateLimit } from '#/lib/server/rate-limit'
import { applySecurityHeaders } from '#/lib/server/security'
import {
  addRequestId,
  createRequestContext,
  getRequestIp,
  logRequest,
} from '#/lib/observability/logging'

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const context = createRequestContext({
          request,
          path: '/api/contact',
          method: 'POST',
        })
        const headers = applySecurityHeaders()
        addRequestId(headers, context.requestId)
        const start = Date.now()
        const ip = getRequestIp(request)
        let status = 200
        let response: Response
        const rateLimit = await enforceRateLimit(`contact:${ip}`)
        const action = 'api.contact.submit'
        const logMetadata = {
          actor: 'anonymous',
        }

        if (!rateLimit.allowed) {
          headers.set('retry-after', String(rateLimit.retryAfterSeconds))
          status = 429
          response = json(
            contactErrorResponseSchema.parse({
              error: 'Rate limit exceeded',
            }),
            { status: 429, headers },
          )
          logRequest({
            context,
            action: `${action}.denied`,
            status,
            durationMs: Date.now() - start,
            metadata: {
              ...logMetadata,
              reason: 'rate_limit_exceeded',
              ip,
            },
          })

          return response
        }

        try {
          const contact = contactRequestSchema.parse(await request.json())
          const { messageId } = await handleContactSubmission(contact, request)
          response = json(
            contactResponseSchema.parse({ ok: true, messageId }),
            {
              headers,
            },
          )
          status = response.status
          logRequest({
            context,
            action,
            status,
            durationMs: Date.now() - start,
            metadata: {
              ...logMetadata,
              messageId,
              ip,
            },
          })

          return response
        } catch (error) {
          status = 500
          if (error instanceof ZodError || error instanceof SyntaxError) {
            status = 400
            response = json(
              contactErrorResponseSchema.parse({
                error: 'Invalid contact message',
              }),
              { status, headers },
            )
            logRequest({
              context,
              action: `${action}.validation_failed`,
              status,
              durationMs: Date.now() - start,
              metadata: {
                ...logMetadata,
                reason: 'invalid_payload',
                ip,
              },
              error,
            })

            return response
          }

          if (error instanceof ContactSmtpConfigError) {
            response = json(
              contactErrorResponseSchema.parse({
                error: 'Contact delivery is not configured',
              }),
              { status, headers },
            )
            logRequest({
              context,
              action: `${action}.smtp_config_missing`,
              status,
              durationMs: Date.now() - start,
              metadata: {
                ...logMetadata,
                reason: 'smtp_not_configured',
                ip,
              },
              error,
            })

            return response
          }

          response = json(
            contactErrorResponseSchema.parse({
              error: 'Unable to send contact message',
            }),
            { status, headers },
          )
          logRequest({
            context,
            action: `${action}.failure`,
            status,
            durationMs: Date.now() - start,
            metadata: {
              ...logMetadata,
              reason: 'delivery_failed',
              ip,
            },
            error,
          })

          return response
        }
      },
    },
  },
})
