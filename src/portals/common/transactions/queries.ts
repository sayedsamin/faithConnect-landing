import { queryOptions } from '@tanstack/react-query'
import { getCommonTransactions } from './api'

export const commonTransactionsQueryKey = ['common', 'transactions'] as const

export function commonTransactionsQueryOptions() {
  return queryOptions({
    queryKey: commonTransactionsQueryKey,
    queryFn: getCommonTransactions,
    staleTime: 60_000,
  })
}
