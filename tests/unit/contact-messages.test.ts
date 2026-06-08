import { describe, expect, test, vi } from 'vitest'
import {
  createContactMessage,
  getRequestMetadata,
  mapContactRequestToInsert,
  markContactMessageEmailStatus,
} from '../../src/lib/contact/messages'

describe('contact message metadata', () => {
  test('captures client metadata from request headers', () => {
    const request = new Request('https://questura.ca/api/contact', {
      headers: {
        'accept-language': 'en-CA,en;q=0.9',
        referer: 'https://questura.ca/contact',
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1',
        'x-forwarded-for': '203.0.113.42, 10.0.0.1',
      },
    })

    expect(getRequestMetadata(request)).toMatchObject({
      accept_language: 'en-CA,en;q=0.9',
      browser: 'Safari',
      device: 'Mobile',
      ip_address: '203.0.113.42',
      referer: 'https://questura.ca/contact',
    })
  })

  test('maps contact request to database insert payload', () => {
    const request = new Request('https://questura.ca/api/contact')

    expect(
      mapContactRequestToInsert(
        {
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '431-996-9120',
          topic: 'general',
          message: 'Please contact me about Questura programs.',
        },
        request,
      ),
    ).toMatchObject({
      email: 'alex@example.com',
      email_status: 'pending',
      ip_address: 'unknown',
      name: 'Alex Morgan',
      phone: '431-996-9120',
      topic: 'general',
    })
  })

  test('stores contact messages and delivery status with Prisma', async () => {
    const create = vi.fn().mockResolvedValue({ id: 'message-id' })
    const update = vi.fn().mockResolvedValue({ id: 'message-id' })
    const prisma = { contactMessage: { create, update } }
    const insert = mapContactRequestToInsert(
      {
        name: 'Alex Morgan',
        email: 'alex@example.com',
        phone: '431-996-9120',
        topic: 'general',
        message: 'Please contact me about Questura programs.',
      },
      new Request('https://questura.ca/api/contact'),
    )

    await expect(
      createContactMessage(
        prisma as unknown as Parameters<typeof createContactMessage>[0],
        insert,
      ),
    ).resolves.toBe('message-id')
    await markContactMessageEmailStatus(
      prisma as unknown as Parameters<typeof markContactMessageEmailStatus>[0],
      'message-id',
      'sent',
      null,
    )

    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: 'alex@example.com',
        emailStatus: 'pending',
        ipAddress: 'unknown',
      }),
      select: { id: true },
    })
    expect(update).toHaveBeenCalledWith({
      where: { id: 'message-id' },
      data: {
        emailStatus: 'sent',
        emailError: null,
        emailedAt: expect.any(Date),
      },
    })
  })
})
