import { describe, expect, it } from 'vitest'
import {
  addCommonStaffInputSchema,
  commonStaffResponseSchema,
  updateCommonStaffInputSchema,
} from '#/portals/common/staff/schemas'

describe('common staff schemas', () => {
  it('validates staff responses', () => {
    expect(() =>
      commonStaffResponseSchema.parse({
        staff: [
          {
            id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
            email: 'supervisor@example.com',
            full_name: 'Sue Supervisor',
            phone: '+1 204 555 0100',
            role: 'supervisor',
            created_at: '2026-05-16T14:30:00+00:00',
            updated_at: '2026-05-16T14:30:00.123456+00:00',
          },
        ],
        total: 1,
      }),
    ).not.toThrow()
  })

  it('rejects non-staff roles', () => {
    const result = commonStaffResponseSchema.safeParse({
      staff: [
        {
          id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
          email: 'admin@example.com',
          full_name: 'Ada Admin',
          phone: null,
          role: 'admin',
          created_at: '2026-05-16T14:30:00.000Z',
          updated_at: '2026-05-16T14:30:00.000Z',
        },
      ],
      total: 1,
    })

    expect(result.success).toBe(false)
  })

  it('normalizes add-staff email input', () => {
    expect(
      addCommonStaffInputSchema.parse({
        email: '  LEADER@QUESTURA.CA  ',
        role: 'camp_leader',
      }),
    ).toEqual({
      email: 'leader@questura.ca',
      role: 'camp_leader',
    })
  })

  it('validates editable staff fields', () => {
    expect(
      updateCommonStaffInputSchema.parse({
        staffId: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
        full_name: '  Lina Leader  ',
        phone: '  +1 204 555 0101  ',
        role: 'camp_leader',
      }),
    ).toEqual({
      staffId: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
      full_name: 'Lina Leader',
      phone: '+1 204 555 0101',
      role: 'camp_leader',
    })
  })
})
