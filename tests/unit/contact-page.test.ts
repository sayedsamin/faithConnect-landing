import { describe, expect, it } from 'vitest'

import {
  contactFaqs,
  contactOptions,
} from '../../src/routes/-components/contact-page/contact-data'

describe('contact page company information', () => {
  it('provides distinct company contact paths', () => {
    expect(contactOptions.map((option) => option.title)).toEqual([
      'Talk to sales',
      'Product support',
      'Partnerships',
    ])
    expect(new Set(contactOptions.map((option) => option.email)).size).toBe(
      contactOptions.length,
    )
  })

  it('uses GraceNexa company email addresses', () => {
    contactOptions.forEach((option) => {
      expect(option.email).toMatch(/@gracenexa\.com$/)
    })
  })

  it('provides guidance for common company inquiries', () => {
    expect(contactFaqs).toHaveLength(4)
    contactFaqs.forEach((item) => {
      expect(item.question.length).toBeGreaterThan(10)
      expect(item.answer.length).toBeGreaterThan(40)
    })
  })
})
