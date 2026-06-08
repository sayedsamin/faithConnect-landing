import { describe, expect, it } from 'vitest'
import { toSuperadminAdminProfile } from '#/portals/superadmin/admins/mappers'

describe('superadmin admin Prisma mapper', () => {
  it('maps Prisma profile fields to the validated portal response', () => {
    expect(
      toSuperadminAdminProfile({
        id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
        email: 'admin@example.com',
        fullName: 'Ada Admin',
        phone: '+1 204 555 0100',
        role: 'admin',
        createdAt: new Date('2026-05-16T14:30:00.000Z'),
        updatedAt: new Date('2026-05-16T14:30:00.000Z'),
      }),
    ).toEqual({
      id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
      email: 'admin@example.com',
      full_name: 'Ada Admin',
      phone: '+1 204 555 0100',
      role: 'admin',
      created_at: '2026-05-16T14:30:00.000Z',
      updated_at: '2026-05-16T14:30:00.000Z',
    })
  })
})
