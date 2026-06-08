import { queryOptions } from '@tanstack/react-query'
import { getSuperadminAdmins } from './api'

export const superadminAdminsQueryKey = ['superadmin', 'admins'] as const

export function superadminAdminsQueryOptions() {
  return queryOptions({
    queryKey: superadminAdminsQueryKey,
    queryFn: () => getSuperadminAdmins(),
    staleTime: 60_000,
  })
}
