import { queryOptions } from '@tanstack/react-query'
import { getAdminProgram, getAdminPrograms } from './api'

export const adminProgramsQueryKey = ['admin', 'programs'] as const

export const adminProgramQueryKey = (programId: string) =>
  ['admin', 'programs', programId] as const

export function adminProgramsQueryOptions() {
  return queryOptions({
    queryKey: adminProgramsQueryKey,
    queryFn: getAdminPrograms,
    staleTime: 60_000,
  })
}

export function adminProgramQueryOptions(programId: string) {
  return queryOptions({
    queryKey: adminProgramQueryKey(programId),
    queryFn: () => getAdminProgram({ data: programId }),
    staleTime: 60_000,
  })
}
