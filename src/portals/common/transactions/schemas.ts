import { z } from 'zod'

const timestampSchema = z.iso.datetime({ offset: true })

export const commonTransactionSchema = z.object({
  id: z.uuid(),
  zeffy_payment_id: z.string(),
  webhook_event_id: z.uuid().nullable(),
  guardian_id: z.uuid().nullable(),
  buyer_email: z.email().nullable(),
  buyer_phone: z.string().nullable(),
  amount_cents: z.number().int(),
  eligible_amount_cents: z.number().int(),
  currency: z.string(),
  status: z.string(),
  payment_type: z.string(),
  refund_status: z.string(),
  campaign_id: z.string().nullable(),
  campaign_type: z.string().nullable(),
  campaign_category: z.string().nullable(),
  campaign_title: z.string().nullable(),
  receipt_url: z.string().nullable(),
  paid_at: timestampSchema,
  raw_payload: z.record(z.string(), z.json()),
  created_at: timestampSchema,
  updated_at: timestampSchema,
})

export const commonParticipantSchema = z.object({
  id: z.uuid(),
  transaction_id: z.uuid().nullable(),
  guardian_id: z.uuid(),
  zeffy_payment_id: z.string().nullable(),
  zeffy_item_id: z.string().nullable(),
  first_name: z.string(),
  last_name: z.string().nullable(),
  age: z.string().nullable(),
  gender: z.string().nullable(),
  grade_level: z.string().nullable(),
  amount_cents: z.number().int().nullable(),
  currency: z.string().nullable(),
  raw_item: z.record(z.string(), z.json()),
  created_at: timestampSchema,
  updated_at: timestampSchema,
})

export const commonTransactionsSchema = z.array(commonTransactionSchema)
export const commonParticipantsSchema = z.array(commonParticipantSchema)

export const commonTransactionsResponseSchema = z.object({
  participants: commonParticipantsSchema,
  participantWarning: z.string().nullable(),
  transactions: commonTransactionsSchema,
})

export type CommonTransaction = z.infer<typeof commonTransactionSchema>
export type CommonParticipant = z.infer<typeof commonParticipantSchema>
export type CommonTransactionsResponse = z.infer<
  typeof commonTransactionsResponseSchema
>
