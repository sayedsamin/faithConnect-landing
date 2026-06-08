import { queryOptions } from '@tanstack/react-query'
import { getCommonStaff } from './api'

export const commonStaffQueryKey = ['common', 'staff'] as const

export function commonStaffQueryOptions() {
  return queryOptions({
    queryKey: commonStaffQueryKey,
    queryFn: getCommonStaff,
    staleTime: 60_000,
  })
}
