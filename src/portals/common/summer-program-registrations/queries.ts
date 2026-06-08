import { queryOptions } from '@tanstack/react-query'
import { getCommonSummerProgramRegistrations } from './api'

export const commonSummerProgramRegistrationsQueryKey = [
  'common',
  'summer-program-registrations',
] as const

export function commonSummerProgramRegistrationsQueryOptions() {
  return queryOptions({
    queryKey: commonSummerProgramRegistrationsQueryKey,
    queryFn: getCommonSummerProgramRegistrations,
    staleTime: 30_000,
  })
}
