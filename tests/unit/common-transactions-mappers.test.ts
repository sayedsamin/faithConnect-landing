import { describe, expect, it } from 'vitest'
import {
  toCommonParticipant,
  toCommonTransaction,
} from '#/portals/common/transactions/mappers'

const createdAt = new Date('2026-05-16T14:30:00.000Z')

describe('common transaction Prisma mappers', () => {
  it('maps Prisma transactions to the validated portal shape', () => {
    expect(
      toCommonTransaction({
        id: '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
        zeffyPaymentId: 'payment-123',
        webhookEventId: null,
        guardianId: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
        buyerEmail: 'guardian@example.com',
        buyerPhone: null,
        amountCents: 5000,
        eligibleAmountCents: 5000,
        currency: 'cad',
        status: 'succeeded',
        paymentType: 'online',
        refundStatus: 'none',
        campaignId: null,
        campaignType: null,
        campaignCategory: null,
        campaignTitle: null,
        receiptUrl: null,
        paidAt: createdAt,
        rawPayload: {},
        createdAt,
        updatedAt: createdAt,
      }),
    ).toMatchObject({
      zeffy_payment_id: 'payment-123',
      guardian_id: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
      paid_at: createdAt.toISOString(),
    })
  })

  it('maps Prisma participants to the validated portal shape', () => {
    expect(
      toCommonParticipant({
        id: '0c4b74cb-bd78-4cbd-82c8-49d85df7df5e',
        transactionId: '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
        guardianId: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
        zeffyPaymentId: 'payment-123',
        zeffyItemId: 'item-123',
        firstName: 'Sayed',
        lastName: 'Rahman',
        age: '17',
        gender: 'Male',
        gradeLevel: 'Grade 11',
        amountCents: 100,
        currency: 'cad',
        rawItem: {},
        createdAt,
        updatedAt: createdAt,
      }),
    ).toMatchObject({
      transaction_id: '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
      zeffy_item_id: 'item-123',
      first_name: 'Sayed',
      last_name: 'Rahman',
    })
  })
})
