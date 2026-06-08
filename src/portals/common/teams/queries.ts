import { queryOptions } from '@tanstack/react-query'
import { getCommonTeams } from './api'

export const commonTeamsQueryKey = ['common', 'teams'] as const

export function commonTeamsQueryOptions() {
  return queryOptions({
    queryKey: commonTeamsQueryKey,
    queryFn: getCommonTeams,
    staleTime: 60_000,
  })
}
