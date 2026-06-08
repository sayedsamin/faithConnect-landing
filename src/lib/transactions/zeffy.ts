import { z } from 'zod'
import { getPrismaClient } from '#/integrations/prisma/server'
import type { Prisma } from '#/generated/prisma/client'
import type {
  ZeffyPayment,
  ZeffyPaymentCompletedEvent,
} from '#/integrations/zeffy'

const PARTICIPANT_QUESTION_LABELS = {
  age: ['participant age', 'age'],
  firstName: ['participant first name', 'first name'],
  fullName: ['full name', 'name', 'student name', 'participant name'],
  gender: ['participant gender', 'gender'],
  gradeLevel: ['participant grade level', 'grade level', 'grade'],
  lastName: ['participant last name', 'last name'],
  phone: ['phone number', 'phone'],
}

export const zeffyTransactionInsertSchema = z.object({
  zeffy_payment_id: z.string().min(1),
  webhook_event_id: z.uuid().nullable(),
  guardian_id: z.uuid().nullable(),
  buyer_email: z.email().nullable(),
  buyer_phone: z.string().nullable(),
  amount_cents: z.number().int(),
  eligible_amount_cents: z.number().int(),
  currency: z.string().min(1),
  status: z.string().min(1),
  payment_type: z.string().min(1),
  refund_status: z.string().min(1),
  campaign_id: z.string().nullable(),
  campaign_type: z.string().nullable(),
  campaign_category: z.string().nullable(),
  campaign_title: z.string().nullable(),
  receipt_url: z.string().nullable(),
  paid_at: z.string().datetime(),
  raw_payload: z.record(z.string(), z.unknown()),
})

export const zeffyParticipantInsertSchema = z.object({
  transaction_id: z.uuid(),
  guardian_id: z.uuid(),
  zeffy_payment_id: z.string().min(1),
  zeffy_item_id: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().nullable(),
  age: z.string().nullable(),
  gender: z.string().nullable(),
  grade_level: z.string().nullable(),
  amount_cents: z.number().int().nullable(),
  currency: z.string().nullable(),
  raw_item: z.record(z.string(), z.unknown()),
})

export type ZeffyTransactionInsert = z.infer<
  typeof zeffyTransactionInsertSchema
>
export type ZeffyParticipantInsert = z.infer<
  typeof zeffyParticipantInsertSchema
>

export function normalizeGuardianEmail(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const email = value.trim().toLowerCase()
  return z.email().safeParse(email).success ? email : null
}

export function getZeffyBuyerEmail(payment: ZeffyPayment) {
  return normalizeGuardianEmail(payment.buyer.email)
}

export function getZeffyBuyerPhone(payment: ZeffyPayment) {
  return normalizeQuestionAnswer(
    getQuestionAnswer(
      payment.buyer_questions,
      PARTICIPANT_QUESTION_LABELS.phone,
    ),
  )
}

export function mapZeffyPaymentToTransactionInsert(
  event: ZeffyPaymentCompletedEvent,
  guardianId: string | null,
) {
  const payment = event.data
  const payload = {
    zeffy_payment_id: payment.id,
    webhook_event_id: event.id,
    guardian_id: guardianId,
    buyer_email: getZeffyBuyerEmail(payment),
    buyer_phone: getZeffyBuyerPhone(payment),
    amount_cents: payment.amount,
    eligible_amount_cents: payment.eligible_amount,
    currency: payment.currency,
    status: payment.status,
    payment_type: payment.type,
    refund_status: payment.refund_status,
    campaign_id: payment.campaign_id,
    campaign_type: payment.campaign_type,
    campaign_category: payment.campaign_category,
    campaign_title:
      typeof payment.description === 'string' ? payment.description : null,
    receipt_url:
      typeof payment.receipt_url === 'string' ? payment.receipt_url : null,
    paid_at: new Date(payment.created * 1000).toISOString(),
    raw_payload: event,
  }

  return zeffyTransactionInsertSchema.parse(payload)
}

export function mapZeffyItemsToParticipantInserts(
  event: ZeffyPaymentCompletedEvent,
  transactionId: string,
  guardianId: string | null,
) {
  if (!guardianId) {
    return []
  }

  return event.data.items
    .map((item) => {
      const questions = item.questions ?? []
      const participantName = getParticipantName(questions)

      if (!item.id || !participantName) {
        return null
      }

      return zeffyParticipantInsertSchema.parse({
        transaction_id: transactionId,
        guardian_id: guardianId,
        zeffy_payment_id: event.data.id,
        zeffy_item_id: item.id,
        first_name: participantName.firstName,
        last_name: participantName.lastName,
        age: normalizeQuestionAnswer(
          getQuestionAnswer(questions, PARTICIPANT_QUESTION_LABELS.age),
        ),
        gender: normalizeQuestionAnswer(
          getQuestionAnswer(questions, PARTICIPANT_QUESTION_LABELS.gender),
        ),
        grade_level: normalizeQuestionAnswer(
          getQuestionAnswer(questions, PARTICIPANT_QUESTION_LABELS.gradeLevel),
        ),
        amount_cents: item.amount ?? null,
        currency: item.currency ?? null,
        raw_item: item,
      })
    })
    .filter((participant): participant is ZeffyParticipantInsert =>
      Boolean(participant),
    )
}

export async function findGuardianIdByEmail(
  prisma: Prisma.TransactionClient,
  email: string | null,
) {
  if (!email) {
    return null
  }

  const profile = await prisma.profile.findFirst({
    where: {
      role: 'guardian',
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
    select: { id: true },
  })

  return profile?.id ?? null
}

export async function updateGuardianPhoneById(
  prisma: Prisma.TransactionClient,
  guardianId: string | null,
  phone: string | null,
) {
  if (!guardianId || !phone) {
    return
  }

  await prisma.profile.updateMany({
    where: {
      id: guardianId,
      role: 'guardian',
    },
    data: { phone },
  })
}

export async function upsertZeffyPaymentTransaction(
  prisma: Prisma.TransactionClient,
  transaction: ZeffyTransactionInsert,
) {
  const data = toPrismaTransactionData(transaction)
  const storedTransaction = await prisma.transaction.upsert({
    where: { zeffyPaymentId: transaction.zeffy_payment_id },
    create: data,
    update: data,
    select: { id: true },
  })

  return storedTransaction.id
}

export async function upsertZeffyParticipants(
  prisma: Prisma.TransactionClient,
  participants: ZeffyParticipantInsert[],
) {
  if (!participants.length) {
    return
  }

  await Promise.all(
    participants.map((participant) => {
      const data = toPrismaParticipantData(participant)

      return prisma.participant.upsert({
        where: { zeffyItemId: participant.zeffy_item_id },
        create: data,
        update: data,
      })
    }),
  )
}

export async function persistZeffyPaymentCompletedEvent(
  event: ZeffyPaymentCompletedEvent,
) {
  if (event.data.status !== 'succeeded') {
    return { stored: false, reason: 'not_succeeded' } as const
  }

  return getPrismaClient().$transaction(async (prisma) => {
    const buyerEmail = getZeffyBuyerEmail(event.data)
    const guardianId = await findGuardianIdByEmail(prisma, buyerEmail)
    const buyerPhone = getZeffyBuyerPhone(event.data)
    const transaction = mapZeffyPaymentToTransactionInsert(event, guardianId)
    const transactionId = await upsertZeffyPaymentTransaction(
      prisma,
      transaction,
    )
    await updateGuardianPhoneById(prisma, guardianId, buyerPhone)
    const participants = mapZeffyItemsToParticipantInserts(
      event,
      transactionId,
      guardianId,
    )

    await upsertZeffyParticipants(prisma, participants)

    return { stored: true, guardianId } as const
  })
}

export function validateZeffyWebhookToken(
  receivedToken: string | null,
  expectedToken: string | undefined,
) {
  if (!receivedToken || !expectedToken) {
    return false
  }

  const maxLength = Math.max(receivedToken.length, expectedToken.length)
  let mismatch = receivedToken.length === expectedToken.length ? 0 : 1

  for (let index = 0; index < maxLength; index += 1) {
    const receivedCode = receivedToken.charCodeAt(index) || 0
    const expectedCode = expectedToken.charCodeAt(index) || 0
    mismatch |= receivedCode ^ expectedCode
  }

  return mismatch === 0
}

function getQuestionAnswer(
  questions: { answer?: unknown; question?: string }[],
  acceptedLabels: string[],
) {
  const answer = questions.find((question) => {
    const label = question.question?.trim().toLowerCase()
    return label ? acceptedLabels.includes(label) : false
  })?.answer

  return answer
}

function getParticipantName(
  questions: { answer?: unknown; question?: string }[],
) {
  const firstName = normalizeQuestionAnswer(
    getQuestionAnswer(questions, PARTICIPANT_QUESTION_LABELS.firstName),
  )
  const lastName = normalizeQuestionAnswer(
    getQuestionAnswer(questions, PARTICIPANT_QUESTION_LABELS.lastName),
  )

  if (firstName) {
    return { firstName, lastName }
  }

  const fullName = normalizeQuestionAnswer(
    getQuestionAnswer(questions, PARTICIPANT_QUESTION_LABELS.fullName),
  )

  if (!fullName) {
    return null
  }

  const [fallbackFirstName, ...fallbackLastNameParts] = fullName.split(/\s+/)
  const fallbackLastName = fallbackLastNameParts.join(' ').trim()

  return {
    firstName: fallbackFirstName,
    lastName: fallbackLastName || null,
  }
}

function normalizeQuestionAnswer(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const answer = value.trim()
  return answer ? answer : null
}

function toPrismaTransactionData(transaction: ZeffyTransactionInsert) {
  return {
    zeffyPaymentId: transaction.zeffy_payment_id,
    webhookEventId: transaction.webhook_event_id,
    guardianId: transaction.guardian_id,
    buyerEmail: transaction.buyer_email,
    buyerPhone: transaction.buyer_phone,
    amountCents: transaction.amount_cents,
    eligibleAmountCents: transaction.eligible_amount_cents,
    currency: transaction.currency,
    status: transaction.status,
    paymentType: transaction.payment_type,
    refundStatus: transaction.refund_status,
    campaignId: transaction.campaign_id,
    campaignType: transaction.campaign_type,
    campaignCategory: transaction.campaign_category,
    campaignTitle: transaction.campaign_title,
    receiptUrl: transaction.receipt_url,
    paidAt: new Date(transaction.paid_at),
    rawPayload: toPrismaJson(transaction.raw_payload),
  }
}

function toPrismaParticipantData(participant: ZeffyParticipantInsert) {
  return {
    transactionId: participant.transaction_id,
    guardianId: participant.guardian_id,
    zeffyPaymentId: participant.zeffy_payment_id,
    zeffyItemId: participant.zeffy_item_id,
    firstName: participant.first_name,
    lastName: participant.last_name,
    age: participant.age,
    gender: participant.gender,
    gradeLevel: participant.grade_level,
    amountCents: participant.amount_cents,
    currency: participant.currency,
    rawItem: toPrismaJson(participant.raw_item),
  }
}

function toPrismaJson(value: unknown) {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue
}
