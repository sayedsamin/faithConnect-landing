import { z } from 'zod'
import { openApiRegistry } from './openapi'

export const contactTopicSchema = z.enum([
  'general',
  'programs',
  'summer-program',
  'partnerships',
])

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter your phone number'),
  topic: contactTopicSchema,
  message: z
    .string()
    .trim()
    .min(10, 'Message should be at least 10 characters'),
})

export const contactResponseSchema = z.object({
  ok: z.literal(true),
  messageId: z.uuid(),
})

export const contactErrorResponseSchema = z.object({
  error: z.string(),
})

openApiRegistry.registerPath({
  method: 'post',
  path: '/api/contact',
  description:
    'Stores a contact message with request metadata and sends it to the configured contact inbox using SMTP.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: contactRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Contact message stored and email sent',
      content: {
        'application/json': {
          schema: contactResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid contact payload',
      content: {
        'application/json': {
          schema: contactErrorResponseSchema,
        },
      },
    },
    429: {
      description: 'Rate limit exceeded',
      content: {
        'application/json': {
          schema: contactErrorResponseSchema,
        },
      },
    },
    500: {
      description: 'Unable to complete contact submission',
      content: {
        'application/json': {
          schema: contactErrorResponseSchema,
        },
      },
    },
  },
})

export type ContactRequest = z.infer<typeof contactRequestSchema>
export type ContactTopic = z.infer<typeof contactTopicSchema>
