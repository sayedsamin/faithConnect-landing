import { describe, expect, test } from 'vitest'
import { contactFormSchema } from '../../src/components/forms/contact-form'

describe('contact form schema', () => {
  test('accepts a complete contact message', () => {
    expect(
      contactFormSchema.safeParse({
        name: 'Alex Morgan',
        email: 'alex@example.com',
        phone: '431-996-9120',
        topic: 'summer-program',
        message: 'I would like more information about summer camp.',
      }).success,
    ).toBe(true)
  })

  test('rejects invalid contact details', () => {
    expect(
      contactFormSchema.safeParse({
        name: 'A',
        email: 'not-an-email',
        phone: '',
        topic: 'summer-program',
        message: 'Hi',
      }).success,
    ).toBe(false)
  })

  test('requires a phone number', () => {
    expect(
      contactFormSchema.safeParse({
        name: 'Alex Morgan',
        email: 'alex@example.com',
        phone: '',
        topic: 'general',
        message: 'Please contact me about Questura programs.',
      }).success,
    ).toBe(false)
  })
})
