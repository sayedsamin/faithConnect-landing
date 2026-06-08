import { z } from 'zod'
import { openApiRegistry } from './openapi'
import { zeffyPaymentCompletedEventSchema } from './zeffy'

export const transactionSchema = z.object({
  id: z.uuid().openapi({
    example: '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
  }),
  zeffy_payment_id: z.string().openapi({
    example: 'p1b2c3d4-e5f6-7890-abcd-ef1234567890',
  }),
  webhook_event_id: z.uuid().nullable().openapi({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  }),
  guardian_id: z.uuid().nullable().openapi({
    example: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
  }),
  buyer_email: z
    .email()
    .nullable()
    .openapi({ example: 'guardian@example.com' }),
  buyer_phone: z.string().nullable().openapi({ example: '12049638646' }),
  amount_cents: z.number().int().openapi({ example: 5000 }),
  eligible_amount_cents: z.number().int().openapi({ example: 5000 }),
  currency: z.string().openapi({ example: 'cad' }),
  status: z.string().openapi({ example: 'succeeded' }),
  payment_type: z.string().openapi({ example: 'online' }),
  refund_status: z.string().openapi({ example: 'none' }),
  campaign_id: z.string().nullable().openapi({
    example: 'c1b2c3d4-e5f6-7890-abcd-ef1234567890',
  }),
  campaign_type: z.string().nullable().openapi({ example: 'donation_form' }),
  campaign_category: z.string().nullable().openapi({ example: 'event' }),
  campaign_title: z
    .string()
    .nullable()
    .openapi({ example: 'Annual Gala 2025' }),
  receipt_url: z.string().nullable().openapi({
    example: 'https://zeffy.com/receipts/abc123',
  }),
  paid_at: z.string().datetime().openapi({
    example: '2024-01-15T14:32:00.000Z',
  }),
  raw_payload: z.record(z.string(), z.unknown()).openapi({ example: {} }),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export const participantSchema = z.object({
  id: z.uuid().openapi({
    example: '0c4b74cb-bd78-4cbd-82c8-49d85df7df5e',
  }),
  transaction_id: z.uuid().openapi({
    example: '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
  }),
  guardian_id: z.uuid().openapi({
    example: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
  }),
  zeffy_payment_id: z.string().openapi({
    example: 'f0530379-a3b9-4b0b-b21f-f82fe52fc2cd',
  }),
  zeffy_item_id: z.string().openapi({
    example: 'f7ad9468-efcd-4250-b6fa-134f082acbf8',
  }),
  first_name: z.string().openapi({ example: 'Sayed' }),
  last_name: z.string().nullable().openapi({ example: 'Rahman' }),
  age: z.string().nullable().openapi({ example: '17' }),
  gender: z.string().nullable().openapi({ example: 'Male' }),
  grade_level: z.string().nullable().openapi({ example: 'Grade 11' }),
  amount_cents: z.number().int().nullable().openapi({ example: 100 }),
  currency: z.string().nullable().openapi({ example: 'cad' }),
  raw_item: z.record(z.string(), z.unknown()).openapi({ example: {} }),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export const transactionListResponseSchema = z.object({
  transactions: z.array(transactionSchema),
})

export const zeffyWebhookErrorResponseSchema = z.object({
  error: z.string().openapi({ example: 'Unauthorized' }),
})

openApiRegistry.registerPath({
  method: 'post',
  path: '/api/zeffy/webhook',
  description:
    'Receives Zeffy payment.completed webhook events and stores succeeded payments as transactions.',
  request: {
    query: z.object({
      token: z.string().min(1),
    }),
    body: {
      content: {
        'application/json': {
          schema: zeffyPaymentCompletedEventSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Webhook accepted',
    },
    400: {
      description: 'Invalid webhook payload',
      content: {
        'application/json': {
          schema: zeffyWebhookErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Invalid webhook token',
      content: {
        'application/json': {
          schema: zeffyWebhookErrorResponseSchema,
        },
      },
    },
    429: {
      description: 'Rate limit exceeded',
      content: {
        'application/json': {
          schema: zeffyWebhookErrorResponseSchema,
        },
      },
    },
    500: {
      description: 'Storage failed; Zeffy should retry',
      content: {
        'application/json': {
          schema: zeffyWebhookErrorResponseSchema,
        },
      },
    },
  },
})

export type Transaction = z.infer<typeof transactionSchema>
export type Participant = z.infer<typeof participantSchema>
