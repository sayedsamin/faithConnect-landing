import { z } from 'zod'

export const zeffyCurrencySchema = z.enum(['cad', 'usd'])
export const zeffyPaymentStatusSchema = z.enum([
  'succeeded',
  'failed',
  'pending',
])
export const zeffyPaymentTypeSchema = z.enum(['online', 'manual', 'imported'])
export const zeffyRefundStatusSchema = z.enum(['none', 'partial', 'full'])
export const zeffyCampaignCategorySchema = z.enum([
  'auction',
  'donation',
  'event',
  'raffle',
  'membership',
  'peer_to_peer',
  'shop',
  'custom',
])

const zeffyUnknownRecordSchema = z.object({}).catchall(z.unknown())
const zeffyNullableUnknownSchema = z.unknown().nullable()

export const zeffyPaymentMethodDetailSchema = zeffyUnknownRecordSchema
  .extend({
    type: z.string().optional(),
  })
  .passthrough()

export const zeffyBuyerSchema = zeffyUnknownRecordSchema
  .extend({
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    email: z.email().nullable().optional(),
    phone: z.string().nullable().optional(),
  })
  .passthrough()

export const zeffyRefundSchema = zeffyUnknownRecordSchema
  .extend({
    id: z.string().optional(),
    amount: z.number().optional(),
    created: z.number().optional(),
  })
  .passthrough()

export const zeffyQuestionAnswerSchema = zeffyUnknownRecordSchema
  .extend({
    question: z.string().optional(),
    type: z.string().optional(),
    answer: z.unknown().optional(),
  })
  .passthrough()

export const zeffyItemSchema = zeffyUnknownRecordSchema
  .extend({
    id: z.string().optional(),
    object: z.string().optional(),
    type: z.string().optional(),
    name: z.string().optional(),
    amount: z.number().optional(),
    currency: z.string().optional(),
    quantity: z.number().optional(),
    questions: z.array(zeffyQuestionAnswerSchema).optional(),
  })
  .passthrough()

export const zeffyPaymentSchema = zeffyUnknownRecordSchema
  .extend({
    id: z.string().min(1),
    object: z.literal('payment'),
    created: z.number(),
    amount: z.number(),
    eligible_amount: z.number(),
    currency: z.string().min(1),
    status: z.string().min(1),
    type: zeffyPaymentTypeSchema,
    refund_status: zeffyRefundStatusSchema,
    refunds: z.array(zeffyRefundSchema),
    dispute: zeffyNullableUnknownSchema,
    description: zeffyNullableUnknownSchema,
    contact: zeffyNullableUnknownSchema,
    payment_method: zeffyPaymentMethodDetailSchema,
    buyer: zeffyBuyerSchema,
    discount: zeffyNullableUnknownSchema,
    campaign_type: z.string().min(1),
    campaign_id: z.string().min(1),
    campaign_category: zeffyCampaignCategorySchema,
    buyer_questions: z.array(zeffyQuestionAnswerSchema),
    items: z.array(zeffyItemSchema),
    occurrence_id: zeffyNullableUnknownSchema,
    receipt_url: zeffyNullableUnknownSchema,
    recurring: zeffyNullableUnknownSchema,
    metadata: zeffyUnknownRecordSchema,
  })
  .passthrough()

export const zeffyPaymentListSchema = z
  .object({
    object: z.literal('list'),
    data: z.array(zeffyPaymentSchema),
    has_more: z.boolean(),
    next_cursor: z.string().nullable(),
  })
  .passthrough()

export const zeffyPaymentListQuerySchema = z
  .object({
    currency: zeffyCurrencySchema.optional(),
    contact: z.string().min(1).optional(),
    campaign: z.string().min(1).optional(),
    type: zeffyPaymentTypeSchema.optional(),
    status: zeffyPaymentStatusSchema.optional(),
    created: z
      .object({
        lte: z.number().optional(),
        lt: z.number().optional(),
        gte: z.number().optional(),
        gt: z.number().optional(),
      })
      .optional(),
    ending_before: z.string().min(1).optional(),
    starting_after: z.string().min(1).optional(),
    limit: z.number().int().min(1).max(100).optional(),
  })
  .strict()

export const zeffyErrorSchema = z
  .object({
    error: z
      .object({
        type: z.enum([
          'invalid_request_error',
          'authentication_error',
          'rate_limit_error',
          'api_error',
        ]),
        code: z.string(),
        message: z.string(),
        param: z.string().nullable().optional(),
        status: z.number().int().optional(),
      })
      .passthrough(),
  })
  .passthrough()

export const zeffyPaymentCompletedEventSchema = z
  .object({
    id: z.uuid(),
    type: z.literal('payment.completed'),
    version: z.number().int(),
    dispatchedAt: z.iso.datetime(),
    data: zeffyPaymentSchema,
  })
  .passthrough()

export type ZeffyPayment = z.infer<typeof zeffyPaymentSchema>
export type ZeffyPaymentList = z.infer<typeof zeffyPaymentListSchema>
export type ZeffyPaymentListQuery = z.infer<typeof zeffyPaymentListQuerySchema>
export type ZeffyPaymentCompletedEvent = z.infer<
  typeof zeffyPaymentCompletedEventSchema
>
