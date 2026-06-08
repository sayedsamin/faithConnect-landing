import { describe, expect, it } from 'vitest'
import {
  guardianSummerProgramRegistrationSchema,
  guardianSummerProgramRegistrationsListSchema,
} from '#/portals/guardian/summer-program/schemas'

const validRegistration = {
  guardian_name: ' Alex Morgan ',
  guardian_email: 'alex@example.com',
  guardian_phone: '204-555-0198',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  notes: 'Please call in the afternoon.',
  participants: [
    {
      first_name: ' Taylor ',
      last_name: ' Morgan ',
      age: '12',
      grade_level: '7',
      gender: 'Female',
    },
  ],
  accept_terms: true,
}

describe('guardianSummerProgramRegistrationSchema', () => {
  it('validates and normalizes a free registration form', () => {
    expect(
      guardianSummerProgramRegistrationSchema.parse(validRegistration),
    ).toMatchObject({
      guardian_name: 'Alex Morgan',
      emergency_contact_name: undefined,
      emergency_contact_phone: undefined,
      participants: [
        {
          first_name: 'Taylor',
          last_name: 'Morgan',
          age: 12,
          grade_level: 7,
          gender: 'Female',
        },
      ],
    })
  })

  it('rejects participants outside the supported age range', () => {
    const result = guardianSummerProgramRegistrationSchema.safeParse({
      ...validRegistration,
      participants: [
        {
          ...validRegistration.participants[0],
          age: 10,
        },
      ],
    })

    expect(result.success).toBe(false)
  })

  it('requires terms acceptance before submission', () => {
    const result = guardianSummerProgramRegistrationSchema.safeParse({
      ...validRegistration,
      accept_terms: false,
    })

    expect(result.success).toBe(false)
  })

  it('rejects unsupported participant gender values', () => {
    const result = guardianSummerProgramRegistrationSchema.safeParse({
      ...validRegistration,
      participants: [
        {
          ...validRegistration.participants[0],
          gender: 'Non-binary',
        },
      ],
    })

    expect(result.success).toBe(false)
  })

  it('requires participant gender selection', () => {
    const result = guardianSummerProgramRegistrationSchema.safeParse({
      ...validRegistration,
      participants: [
        {
          ...validRegistration.participants[0],
          gender: '',
        },
      ],
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid participant grade values', () => {
    const result = guardianSummerProgramRegistrationSchema.safeParse({
      ...validRegistration,
      participants: [
        {
          ...validRegistration.participants[0],
          grade_level: '13',
        },
      ],
    })

    expect(result.success).toBe(false)
  })

  it('rejects removed authorized pickup names field', () => {
    const result = guardianSummerProgramRegistrationSchema.safeParse({
      ...validRegistration,
      pickup_authorized_names: 'Alex Morgan',
    })

    expect(result.success).toBe(false)
  })

  it('rejects removed medical notes field', () => {
    const result = guardianSummerProgramRegistrationSchema.safeParse({
      ...validRegistration,
      participants: [
        {
          ...validRegistration.participants[0],
          medical_notes: 'No allergies.',
        },
      ],
    })

    expect(result.success).toBe(false)
  })
})

describe('guardianSummerProgramRegistrationsListSchema', () => {
  it('validates active registration list items with participant details', () => {
    const result = guardianSummerProgramRegistrationsListSchema.parse([
      {
        id: '11111111-1111-4111-8111-111111111111',
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
        status: 'confirmed',
        terms_accepted_at: '2026-06-02T15:00:00.000Z',
        created_at: '2026-06-02T15:00:00.000Z',
        updated_at: '2026-06-02T16:00:00.000Z',
      },
    ])

    expect(result[0]?.status).toBe('confirmed')
    expect(result[0]?.participants[0]?.first_name).toBe('Taylor')
  })

  it('rejects unsupported registration statuses', () => {
    const result = guardianSummerProgramRegistrationsListSchema.safeParse([
      {
        id: '11111111-1111-4111-8111-111111111111',
        program_code: 'summer-program-2026',
        guardian_name: 'Alex Morgan',
        guardian_email: 'alex@example.com',
        guardian_phone: '204-555-0198',
        emergency_contact_name: null,
        emergency_contact_phone: null,
        notes: null,
        participants: [
          {
            first_name: 'Taylor',
            last_name: 'Morgan',
            age: 12,
            grade_level: 7,
            gender: 'Female',
          },
        ],
        status: 'approved',
        terms_accepted_at: '2026-06-02T15:00:00.000Z',
        created_at: '2026-06-02T15:00:00.000Z',
        updated_at: '2026-06-02T16:00:00.000Z',
      },
    ])

    expect(result.success).toBe(false)
  })
})
