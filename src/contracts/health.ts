import { z } from 'zod'
import { openApiRegistry } from './openapi'

export const healthResponseSchema = z.object({
  ok: z.boolean().openapi({ example: true }),
  service: z.string().openapi({ example: 'questura-v2' }),
  timestamp: z.string().datetime(),
})

openApiRegistry.registerPath({
  method: 'get',
  path: '/api/health',
  description: 'Returns service health and basic metadata.',
  responses: {
    200: {
      description: 'Service health payload',
      content: {
        'application/json': {
          schema: healthResponseSchema,
        },
      },
    },
  },
})
