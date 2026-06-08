import { describe, expect, it } from 'vitest'
import { commonTransactionsResponseSchema } from '#/portals/common/transactions/schemas'

describe('commonTransactionsResponseSchema', () => {
  it('validates transaction responses with offset timestamps', () => {
    expect(() =>
      commonTransactionsResponseSchema.parse({
        participantWarning: null,
        participants: [
          {
            id: '0c4b74cb-bd78-4cbd-82c8-49d85df7df5e',
            transaction_id: '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
            guardian_id: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
            zeffy_payment_id: 'payment-123',
            zeffy_item_id: 'item-123',
            first_name: 'Sayed',
            last_name: 'Rahman',
            age: '17',
            gender: 'Male',
            grade_level: 'Grade 11',
            amount_cents: 100,
            currency: 'cad',
            raw_item: {},
            created_at: '2026-05-16T14:30:00+00:00',
            updated_at: '2026-05-16T14:30:00.123456+00:00',
          },
        ],
        transactions: [
          {
            id: '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
            zeffy_payment_id: 'payment-123',
            webhook_event_id: null,
            guardian_id: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
            buyer_email: 'guardian@example.com',
            buyer_phone: null,
            amount_cents: 5000,
            eligible_amount_cents: 5000,
            currency: 'cad',
            status: 'succeeded',
            payment_type: 'online',
            refund_status: 'none',
            campaign_id: null,
            campaign_type: null,
            campaign_category: null,
            campaign_title: null,
            receipt_url: null,
            paid_at: '2026-05-16T14:30:00+00:00',
            raw_payload: {},
            created_at: '2026-05-16T14:30:00+00:00',
            updated_at: '2026-05-16T14:30:00.123456+00:00',
          },
        ],
      }),
    ).not.toThrow()
  })
})
