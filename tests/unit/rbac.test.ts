import { describe, expect, test } from 'vitest'
import {
  APP_ROLES,
  getDashboardPathForRole,
  hasMinimumRole,
  parseAppRole,
} from '../../src/lib/auth/rbac'

describe('rbac roles', () => {
  test('uses the Questura app roles', () => {
    expect(APP_ROLES).toEqual([
      'superadmin',
      'admin',
      'supervisor',
      'camp_leader',
      'guardian',
      'student',
    ])
  })

  test('orders privileged staff above public guardian accounts', () => {
    expect(hasMinimumRole('superadmin', 'admin')).toBe(true)
    expect(hasMinimumRole('admin', 'supervisor')).toBe(true)
    expect(hasMinimumRole('supervisor', 'camp_leader')).toBe(true)
    expect(hasMinimumRole('camp_leader', 'supervisor')).toBe(false)
    expect(hasMinimumRole('guardian', 'admin')).toBe(false)
    expect(hasMinimumRole('student', 'guardian')).toBe(false)
  })

  test('maps each role to its dashboard route', () => {
    expect(getDashboardPathForRole('superadmin')).toBe('/dashboard/superadmin')
    expect(getDashboardPathForRole('admin')).toBe('/dashboard/admin')
    expect(getDashboardPathForRole('supervisor')).toBe('/dashboard/supervisor')
    expect(getDashboardPathForRole('camp_leader')).toBe('/dashboard/supervisor')
    expect(getDashboardPathForRole('guardian')).toBe('/dashboard/guardian')
    expect(getDashboardPathForRole('student')).toBe('/dashboard/student')
  })

  test('validates app roles from untrusted values', () => {
    expect(parseAppRole('guardian')).toBe('guardian')
    expect(parseAppRole('camp_leader')).toBe('camp_leader')
    expect(parseAppRole('authenticated')).toBeNull()
    expect(parseAppRole(undefined)).toBeNull()
  })
})
