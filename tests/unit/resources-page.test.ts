import { describe, expect, it } from 'vitest'

import {
  filterPopularResources,
  popularResources,
} from '../../src/routes/-components/resources-page/resources-data'

describe('resource search', () => {
  it('returns every resource for an empty search', () => {
    expect(filterPopularResources(popularResources, '   ')).toEqual(
      popularResources,
    )
  })

  it('matches titles without case sensitivity', () => {
    const matches = filterPopularResources(popularResources, 'GRACENEXA')

    expect(matches.map((resource) => resource.title)).toEqual([
      'Getting Started with GraceNexa',
    ])
  })

  it('matches resource types and descriptions', () => {
    expect(filterPopularResources(popularResources, 'template')).toHaveLength(1)
    expect(filterPopularResources(popularResources, 'dashboard')).toHaveLength(
      1,
    )
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterPopularResources(popularResources, 'accounting')).toEqual([])
  })
})
