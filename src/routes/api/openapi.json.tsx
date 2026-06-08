import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import '#/contracts/contact'
import '#/contracts/health'
import '#/contracts/transactions'
import { createOpenApiDocument } from '#/contracts/openapi'
import { applySecurityHeaders } from '#/lib/server/security'
import {
  addRequestId,
  createRequestContext,
  logRequest,
} from '#/lib/observability/logging'

export const Route = createFileRoute('/api/openapi/json')({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => {
        const context = createRequestContext({
          request,
          path: '/api/openapi/json',
          method: 'GET',
        })
        const start = Date.now()
        const headers = applySecurityHeaders()
        addRequestId(headers, context.requestId)
        const document = createOpenApiDocument()
        const response = json(document, { headers })

        logRequest({
          context,
          action: 'api.openapi.success',
          status: response.status,
          durationMs: Date.now() - start,
          metadata: {
            source: 'contract',
          },
        })

        return response
      },
    },
  },
})
