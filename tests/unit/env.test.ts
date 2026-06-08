import { describe, expect, test } from 'vitest'
import { hasSupabaseConfig } from '../../src/lib/env'

describe('env helpers', () => {
  test('hasSupabaseConfig returns a boolean', () => {
    expect(typeof hasSupabaseConfig()).toBe('boolean')
  })
})
