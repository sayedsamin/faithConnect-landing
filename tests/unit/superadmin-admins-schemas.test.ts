import { describe, expect, it } from 'vitest'
import {
  addSuperadminAdminInputSchema,
  removeSuperadminAdminInputSchema,
  superadminAdminsResponseSchema,
} from '#/portals/superadmin/admins/schemas'

describe('superadminAdminsResponseSchema', () => {
  it('validates admin profile responses', () => {
    expect(() =>
      superadminAdminsResponseSchema.parse({
        admins: [
          {
            id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
            email: 'admin@example.com',
            full_name: 'Ada Admin',
            phone: '+1 204 555 0100',
            role: 'admin',
            created_at: '2026-05-16T14:30:00+00:00',
            updated_at: '2026-05-16T14:30:00.123456+00:00',
          },
        ],
        total: 1,
      }),
    ).not.toThrow()
  })

  it('rejects non-admin profiles', () => {
    const result = superadminAdminsResponseSchema.safeParse({
      admins: [
        {
          id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
          email: 'superadmin@example.com',
          full_name: 'Sam Superadmin',
          phone: null,
          role: 'superadmin',
          created_at: '2026-05-16T14:30:00.000Z',
          updated_at: '2026-05-16T14:30:00.000Z',
        },
      ],
      total: 1,
    })

    expect(result.success).toBe(false)
  })

  it('normalizes add-admin email input', () => {
    expect(
      addSuperadminAdminInputSchema.parse({
        email: '  ADMIN9@QUESTURA.CA  ',
      }),
    ).toEqual({
      email: 'admin9@questura.ca',
    })
  })

  it('validates remove-admin input ids', () => {
    expect(
      removeSuperadminAdminInputSchema.safeParse({
        adminId: 'not-an-id',
      }).success,
    ).toBe(false)
  })
})
