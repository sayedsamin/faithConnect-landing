import { queryOptions } from '@tanstack/react-query'
import { getGuardianSummerProgramRegistrations } from './api'

export const guardianSummerProgramRegistrationsQueryKey = [
  'guardian',
  'summer-program',
  'registrations',
] as const

export function guardianSummerProgramRegistrationsQueryOptions() {
  return queryOptions({
    queryKey: guardianSummerProgramRegistrationsQueryKey,
    queryFn: getGuardianSummerProgramRegistrations,
    staleTime: 60_000,
  })
}
