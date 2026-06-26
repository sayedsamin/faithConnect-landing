import { describe, expect, it } from 'vitest'

import {
  termsEffectiveDate,
  termsHighlights,
  termsSections,
} from '../../src/routes/-components/terms-page/terms-data'

describe('terms page content', () => {
  it('uses GraceNexa-specific terms content', () => {
    const combinedTerms = termsSections
      .flatMap((section) => [section.title, ...section.body])
      .join(' ')

    expect(combinedTerms).toContain('GraceNexa')
    expect(combinedTerms).toContain('church management platform')
    expect(combinedTerms).not.toContain('Questura')
  })

  it('covers the important service boundaries', () => {
    expect(termsEffectiveDate).toBe('June 23, 2026')
    expect(termsHighlights).toHaveLength(3)
    expect(termsSections.map((section) => section.id)).toEqual([
      'agreement',
      'services',
      'accounts',
      'data',
      'communications',
      'subscriptions',
      'acceptable-use',
      'availability',
      'intellectual-property',
      'limitations',
      'updates',
      'contact',
    ])
  })
})
