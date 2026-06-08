import { commonParticipantSchema, commonTransactionSchema } from './schemas'

interface PrismaTransactionRow {
  id: string
  zeffyPaymentId: string
  webhookEventId: string | null
  guardianId: string | null
  buyerEmail: string | null
  buyerPhone: string | null
  amountCents: number
  eligibleAmountCents: number
  currency: string
  status: string
  paymentType: string
  refundStatus: string
  campaignId: string | null
  campaignType: string | null
  campaignCategory: string | null
  campaignTitle: string | null
  receiptUrl: string | null
  paidAt: Date
  rawPayload: unknown
  createdAt: Date
  updatedAt: Date
}

interface PrismaParticipantRow {
  id: string
  transactionId: string | null
  guardianId: string
  zeffyPaymentId: string | null
  zeffyItemId: string | null
  firstName: string
  lastName: string | null
  age: string | null
  gender: string | null
  gradeLevel: string | null
  amountCents: number | null
  currency: string | null
  rawItem: unknown
  createdAt: Date
  updatedAt: Date
}

export function toCommonTransaction(row: PrismaTransactionRow) {
  return commonTransactionSchema.parse({
    id: row.id,
    zeffy_payment_id: row.zeffyPaymentId,
    webhook_event_id: row.webhookEventId,
    guardian_id: row.guardianId,
    buyer_email: row.buyerEmail,
    buyer_phone: row.buyerPhone,
    amount_cents: row.amountCents,
    eligible_amount_cents: row.eligibleAmountCents,
    currency: row.currency,
    status: row.status,
    payment_type: row.paymentType,
    refund_status: row.refundStatus,
    campaign_id: row.campaignId,
    campaign_type: row.campaignType,
    campaign_category: row.campaignCategory,
    campaign_title: row.campaignTitle,
    receipt_url: row.receiptUrl,
    paid_at: row.paidAt.toISOString(),
    raw_payload: row.rawPayload,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  })
}

export function toCommonParticipant(row: PrismaParticipantRow) {
  return commonParticipantSchema.parse({
    id: row.id,
    transaction_id: row.transactionId,
    guardian_id: row.guardianId,
    zeffy_payment_id: row.zeffyPaymentId,
    zeffy_item_id: row.zeffyItemId,
    first_name: row.firstName,
    last_name: row.lastName,
    age: row.age,
    gender: row.gender,
    grade_level: row.gradeLevel,
    amount_cents: row.amountCents,
    currency: row.currency,
    raw_item: row.rawItem,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  })
}
