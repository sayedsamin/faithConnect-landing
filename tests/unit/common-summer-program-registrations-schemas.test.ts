import { describe, expect, it } from 'vitest'
import {
  commonSummerProgramRegistrationsSchema,
  commonSummerProgramRegistrationsSearchSchema,
  updateCommonSummerProgramRegistrationStatusInputSchema,
} from '#/portals/common/summer-program-registrations/schemas'

const validRegistration = {
  id: '11111111-1111-4111-8111-111111111111',
  guardian_id: '22222222-2222-4222-8222-222222222222',
  program_code: 'summer-program-2026',
  guardian_name: 'Alex Morgan',
  guardian_email: 'alex@example.com',
  guardian_phone: '204-555-0198',
  emergency_contact_name: null,
  emergency_contact_phone: null,
  notes: 'Please call in the afternoon.',
  participants: [
    {
      first_name: 'Taylor',
      last_name: 'Morgan',
      age: 12,
      grade_level: 7,
      gender: 'Female',
    },
  ],
  participant_count: 1,
  status: 'awaiting_confirmation',
  terms_accepted_at: '2026-06-02T15:00:00.000Z',
  created_at: '2026-06-02T15:00:00.000Z',
  updated_at: '2026-06-02T16:00:00.000Z',
}

describe('commonSummerProgramRegistrationsSchema', () => {
  it('validates admin-visible summer registration review items', () => {
    const result = commonSummerProgramRegistrationsSchema.parse([
      validRegistration,
    ])

    expect(result[0]?.participant_count).toBe(1)
    expect(result[0]?.status).toBe('awaiting_confirmation')
  })

  it('rejects unsupported review statuses', () => {
    const result = commonSummerProgramRegistrationsSchema.safeParse([
      {
        ...validRegistration,
        status: 'approved',
      },
    ])

    expect(result.success).toBe(false)
  })
})

describe('updateCommonSummerProgramRegistrationStatusInputSchema', () => {
  it('accepts approval and decline actions', () => {
    expect(
      updateCommonSummerProgramRegistrationStatusInputSchema.parse({
        id: validRegistration.id,
        status: 'confirmed',
      }),
    ).toMatchObject({ status: 'confirmed' })

    expect(
      updateCommonSummerProgramRegistrationStatusInputSchema.parse({
        id: validRegistration.id,
        status: 'cancelled',
      }),
    ).toMatchObject({ status: 'cancelled' })
  })

  it('rejects direct pending updates from privileged review actions', () => {
    const result =
      updateCommonSummerProgramRegistrationStatusInputSchema.safeParse({
        id: validRegistration.id,
        status: 'awaiting_confirmation',
      })

    expect(result.success).toBe(false)
  })
})

describe('commonSummerProgramRegistrationsSearchSchema', () => {
  it('defaults missing sorting search params', () => {
    expect(commonSummerProgramRegistrationsSearchSchema.parse({})).toEqual({
      dir: 'desc',
      sort: 'submitted_at',
    })
  })

  it('trims optional text filters', () => {
    expect(
      commonSummerProgramRegistrationsSearchSchema.parse({
        program: ' summer-2026 ',
        q: ' Alex ',
      }),
    ).toMatchObject({
      program: 'summer-2026',
      q: 'Alex',
    })
  })

  it('falls back for invalid search params', () => {
    expect(
      commonSummerProgramRegistrationsSearchSchema.parse({
        dir: 'sideways',
        program: '',
        q: '',
        sort: 'unknown',
        status: 'approved',
      }),
    ).toEqual({
      dir: 'desc',
      sort: 'submitted_at',
    })
  })
})
