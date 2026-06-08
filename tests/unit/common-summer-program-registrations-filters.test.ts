import { describe, expect, it } from 'vitest'
import {
  filterCommonSummerProgramRegistrations,
  getVisibleCommonSummerProgramRegistrations,
  sortCommonSummerProgramRegistrations,
} from '#/portals/common/summer-program-registrations/filters'
import type {
  CommonSummerProgramRegistration,
  CommonSummerProgramRegistrationsSearch,
} from '#/portals/common/summer-program-registrations/schemas'

const defaultSearch = {
  dir: 'desc',
  sort: 'submitted_at',
} satisfies CommonSummerProgramRegistrationsSearch

const registrations = [
  makeRegistration({
    id: '11111111-1111-4111-8111-111111111111',
    created_at: '2026-06-03T15:00:00.000Z',
    guardian_email: 'alex@example.com',
    guardian_name: 'Alex Morgan',
    guardian_phone: '204-555-0101',
    participant_count: 1,
    participants: [
      {
        age: 11,
        first_name: 'Taylor',
        gender: 'Female',
        grade_level: 6,
        last_name: 'Morgan',
      },
    ],
    program_code: 'summer-2026',
    status: 'awaiting_confirmation',
  }),
  makeRegistration({
    id: '22222222-2222-4222-8222-222222222222',
    created_at: '2026-06-01T15:00:00.000Z',
    guardian_email: 'casey@example.com',
    guardian_name: 'Casey Reed',
    guardian_phone: '204-555-0202',
    participant_count: 2,
    participants: [
      {
        age: 9,
        first_name: 'Jordan',
        gender: 'Male',
        grade_level: 4,
        last_name: 'Reed',
      },
      {
        age: 8,
        first_name: 'Riley',
        gender: 'Female',
        grade_level: 3,
        last_name: 'Reed',
      },
    ],
    program_code: 'spring-2026',
    status: 'confirmed',
  }),
  makeRegistration({
    id: '33333333-3333-4333-8333-333333333333',
    created_at: '2026-06-02T15:00:00.000Z',
    guardian_email: 'blair@example.com',
    guardian_name: 'Blair Singh',
    guardian_phone: '204-555-0303',
    participant_count: 3,
    participants: [
      {
        age: 12,
        first_name: 'Avery',
        gender: 'Nonbinary',
        grade_level: 7,
        last_name: 'Singh',
      },
    ],
    program_code: 'summer-2026',
    status: 'cancelled',
  }),
] satisfies CommonSummerProgramRegistration[]

describe('filterCommonSummerProgramRegistrations', () => {
  it('filters by each review status', () => {
    expect(
      filterCommonSummerProgramRegistrations(registrations, {
        ...defaultSearch,
        status: 'awaiting_confirmation',
      }).map((registration) => registration.id),
    ).toEqual(['11111111-1111-4111-8111-111111111111'])

    expect(
      filterCommonSummerProgramRegistrations(registrations, {
        ...defaultSearch,
        status: 'confirmed',
      }).map((registration) => registration.id),
    ).toEqual(['22222222-2222-4222-8222-222222222222'])

    expect(
      filterCommonSummerProgramRegistrations(registrations, {
        ...defaultSearch,
        status: 'cancelled',
      }).map((registration) => registration.id),
    ).toEqual(['33333333-3333-4333-8333-333333333333'])
  })

  it('searches guardian, contact, participant, and id fields case-insensitively', () => {
    expect(getMatchingIds({ ...defaultSearch, q: 'alex' })).toEqual([
      '11111111-1111-4111-8111-111111111111',
    ])
    expect(getMatchingIds({ ...defaultSearch, q: '204-555-0202' })).toEqual([
      '22222222-2222-4222-8222-222222222222',
    ])
    expect(getMatchingIds({ ...defaultSearch, q: 'avery singh' })).toEqual([
      '33333333-3333-4333-8333-333333333333',
    ])
    expect(getMatchingIds({ ...defaultSearch, q: '22222222' })).toEqual([
      '22222222-2222-4222-8222-222222222222',
    ])
  })

  it('filters by program code', () => {
    expect(
      getMatchingIds({ ...defaultSearch, program: 'summer-2026' }),
    ).toEqual([
      '11111111-1111-4111-8111-111111111111',
      '33333333-3333-4333-8333-333333333333',
    ])
  })
})

describe('sortCommonSummerProgramRegistrations', () => {
  it('sorts by submitted date', () => {
    expect(getSortedIds({ dir: 'desc', sort: 'submitted_at' })).toEqual([
      '11111111-1111-4111-8111-111111111111',
      '33333333-3333-4333-8333-333333333333',
      '22222222-2222-4222-8222-222222222222',
    ])
  })

  it('sorts by guardian, status, participant count, and program', () => {
    expect(getSortedIds({ dir: 'asc', sort: 'guardian' })).toEqual([
      '11111111-1111-4111-8111-111111111111',
      '33333333-3333-4333-8333-333333333333',
      '22222222-2222-4222-8222-222222222222',
    ])

    expect(getSortedIds({ dir: 'asc', sort: 'status' })).toEqual([
      '11111111-1111-4111-8111-111111111111',
      '22222222-2222-4222-8222-222222222222',
      '33333333-3333-4333-8333-333333333333',
    ])

    expect(getSortedIds({ dir: 'desc', sort: 'participant_count' })).toEqual([
      '33333333-3333-4333-8333-333333333333',
      '22222222-2222-4222-8222-222222222222',
      '11111111-1111-4111-8111-111111111111',
    ])

    expect(getSortedIds({ dir: 'asc', sort: 'program' })).toEqual([
      '22222222-2222-4222-8222-222222222222',
      '11111111-1111-4111-8111-111111111111',
      '33333333-3333-4333-8333-333333333333',
    ])
  })
})

describe('getVisibleCommonSummerProgramRegistrations', () => {
  it('combines filters and sorting predictably', () => {
    expect(
      getVisibleCommonSummerProgramRegistrations(registrations, {
        dir: 'asc',
        program: 'summer-2026',
        q: 'singh',
        sort: 'guardian',
      }).map((registration) => registration.id),
    ).toEqual(['33333333-3333-4333-8333-333333333333'])
  })
})

function getMatchingIds(search: CommonSummerProgramRegistrationsSearch) {
  return filterCommonSummerProgramRegistrations(registrations, search).map(
    (registration) => registration.id,
  )
}

function getSortedIds(search: CommonSummerProgramRegistrationsSearch) {
  return sortCommonSummerProgramRegistrations(registrations, search).map(
    (registration) => registration.id,
  )
}

function makeRegistration(
  registration: Pick<
    CommonSummerProgramRegistration,
    | 'created_at'
    | 'guardian_email'
    | 'guardian_name'
    | 'guardian_phone'
    | 'id'
    | 'participant_count'
    | 'participants'
    | 'program_code'
    | 'status'
  >,
): CommonSummerProgramRegistration {
  return {
    emergency_contact_name: 'Emergency Contact',
    emergency_contact_phone: '204-555-9999',
    guardian_id: '44444444-4444-4444-8444-444444444444',
    notes: 'No notes',
    terms_accepted_at: registration.created_at,
    updated_at: registration.created_at,
    ...registration,
  }
}
