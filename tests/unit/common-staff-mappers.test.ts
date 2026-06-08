import { describe, expect, it } from 'vitest'
import { toCommonStaffProfile } from '#/portals/common/staff/mappers'

describe('common staff Prisma mapper', () => {
  it('maps Prisma profile fields to the validated staff response', () => {
    expect(
      toCommonStaffProfile({
        id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
        email: 'supervisor@example.com',
        fullName: 'Sue Supervisor',
        phone: '+1 204 555 0100',
        role: 'supervisor',
        createdAt: new Date('2026-05-16T14:30:00.000Z'),
        updatedAt: new Date('2026-05-16T14:30:00.000Z'),
      }),
    ).toEqual({
      id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
      email: 'supervisor@example.com',
      full_name: 'Sue Supervisor',
      phone: '+1 204 555 0100',
      role: 'supervisor',
      created_at: '2026-05-16T14:30:00.000Z',
      updated_at: '2026-05-16T14:30:00.000Z',
    })
  })
})
