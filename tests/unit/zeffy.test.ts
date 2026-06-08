import { describe, expect, test, vi } from 'vitest'
import {
  buildZeffyUrl,
  fetchNextZeffyPaymentPage,
  getNextZeffyCursor,
  hasMoreZeffyPages,
  normalizeZeffyPaymentFilters,
  parseZeffyResponse,
  toZeffyTimestamp,
  zeffyPaymentCompletedEventSchema,
  zeffyPaymentListSchema,
} from '../../src/integrations/zeffy'
import {
  findGuardianIdByEmail,
  getZeffyBuyerEmail,
  getZeffyBuyerPhone,
  mapZeffyItemsToParticipantInserts,
  mapZeffyPaymentToTransactionInsert,
  normalizeGuardianEmail,
  updateGuardianPhoneById,
  upsertZeffyPaymentTransaction,
  validateZeffyWebhookToken,
} from '../../src/lib/transactions/zeffy'
import type { ZeffyPayment } from '../../src/integrations/zeffy'

const payment: ZeffyPayment = {
  id: 'p1b2c3d4-e5f6-7890-abcd-ef1234567890',
  object: 'payment',
  created: 1700000000,
  amount: 5000,
  eligible_amount: 5000,
  currency: 'cad',
  status: 'succeeded',
  type: 'online',
  refund_status: 'none',
  refunds: [],
  dispute: null,
  description: 'Annual Gala 2025',
  contact: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  payment_method: { type: 'card' },
  buyer: { email: 'donor@example.com' },
  discount: null,
  campaign_type: 'donation_form',
  campaign_id: 'c1b2c3d4-e5f6-7890-abcd-ef1234567890',
  campaign_category: 'event',
  buyer_questions: [
    {
      question: 'Phone Number',
      type: 'phone',
      answer: '12049638646',
    },
  ],
  items: [
    {
      id: 'f7ad9468-efcd-4250-b6fa-134f082acbf8',
      object: 'item',
      type: 'ticket',
      amount: 100,
      currency: 'cad',
      questions: [
        {
          question: 'Participant First Name',
          type: 'name',
          answer: 'Sayed',
        },
        {
          question: 'Participant Last Name',
          type: 'name',
          answer: 'Rahman',
        },
        {
          question: 'Participant Age',
          type: 'text',
          answer: '17',
        },
        {
          question: 'Participant Gender',
          type: 'multi_select',
          answer: 'Male',
        },
        {
          question: 'Participant Grade Level',
          type: 'single_select',
          answer: 'Grade 11',
        },
      ],
    },
  ],
  occurrence_id: null,
  receipt_url: 'https://zeffy.com/receipts/abc123',
  recurring: null,
  metadata: {},
}

describe('Zeffy helpers', () => {
  test('normalizes payment filters to Zeffy query parameter names', () => {
    expect(
      normalizeZeffyPaymentFilters({
        currency: 'cad',
        status: 'succeeded',
        type: 'online',
        created: { gte: 1700000000, lte: 1700100000 },
        limit: 25,
      }),
    ).toEqual({
      currency: 'cad',
      contact: undefined,
      campaign: undefined,
      type: 'online',
      status: 'succeeded',
      'created[lte]': 1700100000,
      'created[lt]': undefined,
      'created[gte]': 1700000000,
      'created[gt]': undefined,
      ending_before: undefined,
      starting_after: undefined,
      limit: 25,
    })
  })

  test('validates payment list responses', () => {
    expect(
      zeffyPaymentListSchema.parse({
        object: 'list',
        data: [payment],
        has_more: true,
        next_cursor: payment.id,
      }).data,
    ).toHaveLength(1)
  })

  test('validates payment completed webhook payloads', () => {
    expect(
      zeffyPaymentCompletedEventSchema.safeParse({
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        type: 'payment.completed',
        version: 1,
        dispatchedAt: '2024-01-15T14:32:00.000Z',
        data: payment,
      }).success,
    ).toBe(true)
  })

  test('builds Zeffy urls with supported query values', () => {
    const url = buildZeffyUrl('/api/v1/payments', {
      limit: 100,
      status: 'succeeded',
      empty: undefined,
    })

    expect(url.toString()).toBe(
      'https://api.zeffy.com/api/v1/payments?limit=100&status=succeeded',
    )
  })

  test('converts dates to unix timestamps', () => {
    expect(toZeffyTimestamp(new Date('2024-01-15T14:32:00.000Z'))).toBe(
      1705329120,
    )
  })

  test('exposes pagination helpers', () => {
    const page = { has_more: true, next_cursor: payment.id }

    expect(hasMoreZeffyPages(page)).toBe(true)
    expect(getNextZeffyCursor(page)).toBe(payment.id)
  })

  test('maps Zeffy API errors', async () => {
    await expect(
      parseZeffyResponse(
        zeffyPaymentListSchema,
        new Response(
          JSON.stringify({
            error: {
              type: 'invalid_request_error',
              code: 'bad_limit',
              message: 'Invalid limit',
              param: 'limit',
              status: 400,
            },
          }),
          { status: 400 },
        ),
      ),
    ).rejects.toMatchObject({
      name: 'ZeffyApiError',
      status: 400,
      code: 'bad_limit',
      param: 'limit',
    })
  })

  test('does not fetch another payment page without a cursor', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')

    const page = await fetchNextZeffyPaymentPage(
      { next_cursor: null },
      { limit: 10 },
    )

    expect(page).toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()

    fetchMock.mockRestore()
  })

  test('normalizes guardian email values', () => {
    expect(normalizeGuardianEmail(' Guardian@Example.COM ')).toBe(
      'guardian@example.com',
    )
    expect(normalizeGuardianEmail('not-an-email')).toBeNull()
    expect(normalizeGuardianEmail(null)).toBeNull()
  })

  test('maps completed payments to transaction inserts', () => {
    const event = {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      type: 'payment.completed',
      version: 1,
      dispatchedAt: '2024-01-15T14:32:00.000Z',
      data: payment,
    } as const

    expect(getZeffyBuyerEmail(payment)).toBe('donor@example.com')
    expect(getZeffyBuyerPhone(payment)).toBe('12049638646')
    expect(
      mapZeffyPaymentToTransactionInsert(
        event,
        '8a61b62e-3072-43dc-a6fa-e8482db74b07',
      ),
    ).toMatchObject({
      zeffy_payment_id: payment.id,
      webhook_event_id: event.id,
      guardian_id: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
      buyer_email: 'donor@example.com',
      buyer_phone: '12049638646',
      amount_cents: 5000,
      eligible_amount_cents: 5000,
      currency: 'cad',
      status: 'succeeded',
      payment_type: 'online',
      refund_status: 'none',
      campaign_id: 'c1b2c3d4-e5f6-7890-abcd-ef1234567890',
      campaign_type: 'donation_form',
      campaign_category: 'event',
      campaign_title: 'Annual Gala 2025',
      receipt_url: 'https://zeffy.com/receipts/abc123',
      paid_at: '2023-11-14T22:13:20.000Z',
      raw_payload: event,
    })
  })

  test('maps Zeffy items to guardian participants', () => {
    const event = {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      type: 'payment.completed',
      version: 1,
      dispatchedAt: '2024-01-15T14:32:00.000Z',
      data: payment,
    } as const

    expect(
      mapZeffyItemsToParticipantInserts(
        event,
        '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
        '8a61b62e-3072-43dc-a6fa-e8482db74b07',
      ),
    ).toEqual([
      expect.objectContaining({
        transaction_id: '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
        guardian_id: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
        zeffy_payment_id: payment.id,
        zeffy_item_id: 'f7ad9468-efcd-4250-b6fa-134f082acbf8',
        first_name: 'Sayed',
        last_name: 'Rahman',
        age: '17',
        gender: 'Male',
        grade_level: 'Grade 11',
        amount_cents: 100,
        currency: 'cad',
      }),
    ])
  })

  test('does not map participants without a matched guardian', () => {
    const event = {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      type: 'payment.completed',
      version: 1,
      dispatchedAt: '2024-01-15T14:32:00.000Z',
      data: payment,
    } as const

    expect(
      mapZeffyItemsToParticipantInserts(
        event,
        '7bf885aa-25f1-4921-b089-0f71cbad6c3b',
        null,
      ),
    ).toEqual([])
  })

  test('handles missing optional payment fields while mapping transactions', () => {
    const event = {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      type: 'payment.completed',
      version: 1,
      dispatchedAt: '2024-01-15T14:32:00.000Z',
      data: {
        ...payment,
        buyer: {},
        description: null,
        receipt_url: null,
      },
    } as const

    expect(mapZeffyPaymentToTransactionInsert(event, null)).toMatchObject({
      guardian_id: null,
      buyer_email: null,
      campaign_title: null,
      receipt_url: null,
    })
  })

  test('validates webhook shared tokens', () => {
    expect(validateZeffyWebhookToken('secret-token', 'secret-token')).toBe(true)
    expect(validateZeffyWebhookToken('secret-token', 'different-token')).toBe(
      false,
    )
    expect(validateZeffyWebhookToken(null, 'secret-token')).toBe(false)
  })

  test('finds guardians by normalized email and ignores unmatched emails', async () => {
    const findFirst = vi.fn().mockResolvedValue({ id: payment.id })
    const prisma = { profile: { findFirst } }

    await expect(
      findGuardianIdByEmail(
        prisma as unknown as Parameters<typeof findGuardianIdByEmail>[0],
        'donor@example.com',
      ),
    ).resolves.toBe(payment.id)
    await expect(
      findGuardianIdByEmail(
        prisma as unknown as Parameters<typeof findGuardianIdByEmail>[0],
        null,
      ),
    ).resolves.toBeNull()

    expect(findFirst).toHaveBeenCalledWith({
      where: {
        role: 'guardian',
        email: {
          equals: 'donor@example.com',
          mode: 'insensitive',
        },
      },
      select: { id: true },
    })
  })

  test('updates matched guardian phone numbers', async () => {
    const updateMany = vi.fn().mockResolvedValue({ count: 1 })
    const prisma = { profile: { updateMany } }

    await expect(
      updateGuardianPhoneById(
        prisma as unknown as Parameters<typeof updateGuardianPhoneById>[0],
        '8a61b62e-3072-43dc-a6fa-e8482db74b07',
        '12049638646',
      ),
    ).resolves.toBeUndefined()

    expect(updateMany).toHaveBeenCalledWith({
      where: {
        id: '8a61b62e-3072-43dc-a6fa-e8482db74b07',
        role: 'guardian',
      },
      data: { phone: '12049638646' },
    })
  })

  test('skips guardian phone updates without a matched guardian or phone', async () => {
    const updateMany = vi.fn()
    const prisma = { profile: { updateMany } }

    await updateGuardianPhoneById(
      prisma as unknown as Parameters<typeof updateGuardianPhoneById>[0],
      null,
      '12049638646',
    )
    await updateGuardianPhoneById(
      prisma as unknown as Parameters<typeof updateGuardianPhoneById>[0],
      '8a61b62e-3072-43dc-a6fa-e8482db74b07',
      null,
    )

    expect(updateMany).not.toHaveBeenCalled()
  })

  test('upserts transactions by Zeffy payment id', async () => {
    const upsert = vi.fn().mockResolvedValue({ id: payment.id })
    const prisma = { transaction: { upsert } }
    const transaction = mapZeffyPaymentToTransactionInsert(
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        type: 'payment.completed',
        version: 1,
        dispatchedAt: '2024-01-15T14:32:00.000Z',
        data: payment,
      },
      null,
    )

    await expect(
      upsertZeffyPaymentTransaction(
        prisma as unknown as Parameters<
          typeof upsertZeffyPaymentTransaction
        >[0],
        transaction,
      ),
    ).resolves.toBe(payment.id)

    expect(upsert).toHaveBeenCalledWith({
      where: { zeffyPaymentId: payment.id },
      create: expect.objectContaining({
        zeffyPaymentId: payment.id,
        amountCents: 5000,
      }),
      update: expect.objectContaining({
        zeffyPaymentId: payment.id,
        amountCents: 5000,
      }),
      select: { id: true },
    })
  })
})
