import { describe, expect, it } from 'vitest'
import {
  adminProgramListItemSchema,
  createAdminProgramInputSchema,
} from '#/portals/admin/programs/schemas'

const validProgram = {
  name: ' Summer Leadership Camp ',
  description: ' A practical week of leadership and STEAM activities. ',
  minimum_age: 8,
  maximum_age: 12,
  start_date: '2026-07-06',
  end_date: '2026-07-10',
  location: ' Questura Academy ',
  capacity: 24,
  registration_status: 'closed',
  program_status: 'draft',
}

describe('createAdminProgramInputSchema', () => {
  it('validates and normalizes a program payload', () => {
    expect(createAdminProgramInputSchema.parse(validProgram)).toEqual({
      ...validProgram,
      name: 'Summer Leadership Camp',
      description: 'A practical week of leadership and STEAM activities.',
      location: 'Questura Academy',
    })
  })

  it('coerces numeric form values', () => {
    expect(
      createAdminProgramInputSchema.parse({
        ...validProgram,
        capacity: '30',
        maximum_age: '14',
        minimum_age: '10',
      }),
    ).toMatchObject({
      capacity: 30,
      maximum_age: 14,
      minimum_age: 10,
    })
  })

  it('rejects invalid age, date, capacity, and status values', () => {
    const result = createAdminProgramInputSchema.safeParse({
      ...validProgram,
      capacity: 0,
      end_date: '2026-07-01',
      maximum_age: 7,
      minimum_age: 8,
      program_status: 'live',
      registration_status: 'paused',
    })

    expect(result.success).toBe(false)
  })
})

describe('adminProgramListItemSchema', () => {
  it('validates list fields required by the admin programs table', () => {
    expect(
      adminProgramListItemSchema.parse({
        ...createAdminProgramInputSchema.parse(validProgram),
        id: '5b8064e4-832b-45f5-9068-f5188742ca8c',
        assigned_supervisors: [' Avery Stone '],
        created_at: '2026-05-19T17:00:00.000Z',
        created_by: '4425a084-894d-4eb2-91c0-b1ba6d4ce2f9',
        registered_children_count: 12,
        updated_at: '2026-05-19T17:00:00.000Z',
      }),
    ).toMatchObject({
      assigned_supervisors: ['Avery Stone'],
      registered_children_count: 12,
    })
  })

  it('rejects negative registered child counts', () => {
    const result = adminProgramListItemSchema.safeParse({
      ...createAdminProgramInputSchema.parse(validProgram),
      id: '5b8064e4-832b-45f5-9068-f5188742ca8c',
      assigned_supervisors: [],
      created_at: '2026-05-19T17:00:00.000Z',
      created_by: '4425a084-894d-4eb2-91c0-b1ba6d4ce2f9',
      registered_children_count: -1,
      updated_at: '2026-05-19T17:00:00.000Z',
    })

    expect(result.success).toBe(false)
  })
})
