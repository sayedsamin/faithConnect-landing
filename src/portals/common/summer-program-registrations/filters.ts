import type {
  CommonSummerProgramRegistration,
  CommonSummerProgramRegistrationsSearch,
} from './schemas'

const statusSortOrder = {
  awaiting_confirmation: 0,
  confirmed: 1,
  cancelled: 2,
} satisfies Record<CommonSummerProgramRegistration['status'], number>

export function filterCommonSummerProgramRegistrations(
  registrations: CommonSummerProgramRegistration[],
  search: CommonSummerProgramRegistrationsSearch,
) {
  const query = normalizeSearchValue(search.q)
  const program = normalizeSearchValue(search.program)

  return registrations.filter((registration) => {
    if (search.status && registration.status !== search.status) {
      return false
    }

    if (
      program &&
      normalizeSearchValue(registration.program_code) !== program
    ) {
      return false
    }

    if (query && !getRegistrationSearchText(registration).includes(query)) {
      return false
    }

    return true
  })
}

export function sortCommonSummerProgramRegistrations(
  registrations: CommonSummerProgramRegistration[],
  search: CommonSummerProgramRegistrationsSearch,
) {
  const direction = search.dir === 'asc' ? 1 : -1

  return [...registrations].sort((first, second) => {
    let result = compareRegistrations(first, second, search.sort) * direction

    if (result === 0) {
      result = compareDate(first.created_at, second.created_at) * -1
    }

    if (result === 0) {
      result = first.id.localeCompare(second.id)
    }

    return result
  })
}

export function getVisibleCommonSummerProgramRegistrations(
  registrations: CommonSummerProgramRegistration[],
  search: CommonSummerProgramRegistrationsSearch,
) {
  return sortCommonSummerProgramRegistrations(
    filterCommonSummerProgramRegistrations(registrations, search),
    search,
  )
}

function compareRegistrations(
  first: CommonSummerProgramRegistration,
  second: CommonSummerProgramRegistration,
  sort: CommonSummerProgramRegistrationsSearch['sort'],
) {
  if (sort === 'submitted_at') {
    return compareDate(first.created_at, second.created_at)
  }

  if (sort === 'guardian') {
    return first.guardian_name.localeCompare(second.guardian_name)
  }

  if (sort === 'status') {
    return statusSortOrder[first.status] - statusSortOrder[second.status]
  }

  if (sort === 'participant_count') {
    return first.participant_count - second.participant_count
  }

  return first.program_code.localeCompare(second.program_code)
}

function compareDate(first: string, second: string) {
  return new Date(first).getTime() - new Date(second).getTime()
}

function getRegistrationSearchText(
  registration: CommonSummerProgramRegistration,
) {
  return normalizeSearchValue(
    [
      registration.id,
      registration.guardian_name,
      registration.guardian_email,
      registration.guardian_phone,
      registration.program_code,
      registration.emergency_contact_name,
      registration.emergency_contact_phone,
      registration.notes,
      ...registration.participants.flatMap((participant) => [
        participant.first_name,
        participant.last_name,
        `${participant.first_name} ${participant.last_name}`,
        participant.gender,
        participant.age.toString(),
        participant.grade_level.toString(),
      ]),
    ]
      .filter((value): value is string => Boolean(value))
      .join(' '),
  )
}

function normalizeSearchValue(value: string | null | undefined) {
  return value?.trim().toLocaleLowerCase() ?? ''
}
