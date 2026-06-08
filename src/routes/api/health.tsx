import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { healthResponseSchema } from '#/contracts/health'
import { enforceRateLimit } from '#/lib/server/rate-limit'
import { applySecurityHeaders } from '#/lib/server/security'
import {
  addRequestId,
  createRequestContext,
  logRequest,
} from '#/lib/observability/logging'

export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const context = createRequestContext({
          request,
          path: '/api/health',
          method: 'GET',
        })
        const headers = applySecurityHeaders()
        addRequestId(headers, context.requestId)
        const start = Date.now()
        const ip = context.ip
        let status = 200
        const rateLimit = await enforceRateLimit(`health:${ip}`)

        if (!rateLimit.allowed) {
          headers.set('retry-after', String(rateLimit.retryAfterSeconds))
          status = 429
          logRequest({
            context,
            action: 'api.health.rate_limit',
            status,
            durationMs: Date.now() - start,
            metadata: {
              reason: 'rate_limit_exceeded',
              ip,
            },
          })

          return json({ ok: false }, { status, headers })
        }

        const payload = healthResponseSchema.parse({
          ok: true,
          service: 'questura-v2',
          timestamp: new Date().toISOString(),
        })
        const response = json(payload, { headers })
        status = response.status
        logRequest({
          context,
          action: 'api.health.success',
          status,
          durationMs: Date.now() - start,
          metadata: {
            service: 'questura-v2',
          },
        })

        return response
      },
    },
  },
})
