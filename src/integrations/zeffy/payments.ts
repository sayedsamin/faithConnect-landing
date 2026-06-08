import {
  zeffyPaymentListQuerySchema,
  zeffyPaymentListSchema,
  zeffyPaymentSchema,
} from './schemas'
import type { ZeffyPaymentListQuery } from './schemas'
import { zeffyFetch } from './client'

export function toZeffyTimestamp(value: Date | number) {
  if (typeof value === 'number') {
    return Math.floor(value)
  }

  return Math.floor(value.getTime() / 1000)
}

export function normalizeZeffyPaymentFilters(filters: ZeffyPaymentListQuery) {
  const parsed = zeffyPaymentListQuerySchema.parse(filters)

  return {
    currency: parsed.currency,
    contact: parsed.contact,
    campaign: parsed.campaign,
    type: parsed.type,
    status: parsed.status,
    'created[lte]': parsed.created?.lte,
    'created[lt]': parsed.created?.lt,
    'created[gte]': parsed.created?.gte,
    'created[gt]': parsed.created?.gt,
    ending_before: parsed.ending_before,
    starting_after: parsed.starting_after,
    limit: parsed.limit,
  }
}

export function listZeffyPayments(filters: ZeffyPaymentListQuery = {}) {
  return zeffyFetch('/api/v1/payments', zeffyPaymentListSchema, {
    query: normalizeZeffyPaymentFilters(filters),
  })
}

export function getZeffyPayment(paymentId: string) {
  return zeffyFetch(
    `/api/v1/payments/${encodeURIComponent(paymentId)}`,
    zeffyPaymentSchema,
  )
}

export function hasMoreZeffyPages(page: { has_more: boolean }) {
  return page.has_more
}

export function getNextZeffyCursor(page: { next_cursor: string | null }) {
  return page.next_cursor
}

export async function fetchNextZeffyPaymentPage(
  previousPage: { next_cursor: string | null },
  filters: ZeffyPaymentListQuery = {},
) {
  if (!previousPage.next_cursor) {
    return null
  }

  return listZeffyPayments({
    ...filters,
    starting_after: previousPage.next_cursor,
  })
}

export async function* iterateZeffyPayments(
  filters: ZeffyPaymentListQuery = {},
) {
  let startingAfter = filters.starting_after

  do {
    const page = await listZeffyPayments({
      ...filters,
      starting_after: startingAfter,
    })

    for (const payment of page.data) {
      yield payment
    }

    startingAfter = page.next_cursor ?? undefined
  } while (startingAfter)
}

export async function listAllZeffyPayments(
  filters: ZeffyPaymentListQuery = {},
) {
  const payments = []

  for await (const payment of iterateZeffyPayments(filters)) {
    payments.push(payment)
  }

  return payments
}
