import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  AlertTriangle,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
} from 'lucide-react'
import { useParticipantsByTransactionId } from '#/portals/common/transactions/hooks'
import { commonTransactionsQueryOptions } from '#/portals/common/transactions/queries'
import type {
  CommonParticipant,
  CommonTransaction,
} from '#/portals/common/transactions/schemas'

type SortColumn = 'date' | 'buyer' | 'participants' | 'payment' | 'amount'
type SortDirection = 'asc' | 'desc'

export function TransactionsPanel() {
  const transactionsQuery = useQuery(commonTransactionsQueryOptions())
  const [sortColumn, setSortColumn] = useState<SortColumn>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const data = transactionsQuery.data ?? {
    participants: [],
    participantWarning: null,
    transactions: [],
  }
  const { participantWarning, participants, transactions } = data
  const participantsByTransactionId =
    useParticipantsByTransactionId(participants)
  const sortedTransactions = useMemo(
    () =>
      [...transactions].sort((first, second) =>
        compareTransactions(
          first,
          second,
          participantsByTransactionId,
          sortColumn,
          sortDirection,
        ),
      ),
    [participantsByTransactionId, sortColumn, sortDirection, transactions],
  )

  function handleSort(nextColumn: SortColumn) {
    if (sortColumn === nextColumn) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortColumn(nextColumn)
    setSortDirection(nextColumn === 'date' ? 'desc' : 'asc')
  }

  if (transactionsQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading transactions…
      </p>
    )
  }

  if (transactionsQuery.isError) {
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
      >
        Unable to load transactions.
      </p>
    )
  }

  const primaryCurrency = transactions[0]?.currency ?? 'cad'
  const participantCount = participants.length
  const totalAmountCents = transactions.reduce(
    (total, transaction) => total + transaction.amount_cents,
    0,
  )

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">Payments</p>
          <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
            Transactions
          </h1>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          onClick={() => void transactionsQuery.refetch()}
        >
          <RefreshCcw aria-hidden="true" className="size-4" />
          Refresh
        </button>
      </div>

      {participantWarning ? (
        <div className="mt-6 flex gap-3 rounded-md border border-school-bus-yellow/45 bg-school-bus-yellow/14 px-4 py-3 text-sm font-semibold text-foreground">
          <AlertTriangle
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-primary"
          />
          <p>{participantWarning}</p>
        </div>
      ) : null}

      {transactions.length ? (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Transactions', transactions.length.toLocaleString()],
              ['Participants', participantCount.toLocaleString()],
              ['Total paid', formatMoney(totalAmountCents, primaryCurrency)],
            ].map(([label, value]) => (
              <article
                key={label}
                className="rounded-md border border-border p-5"
              >
                <p className="text-sm font-bold text-muted-foreground">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-extrabold text-foreground tabular-nums">
                  {value}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 w-full overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead className="bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  <SortableHeader
                    column="date"
                    label="Date"
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    column="buyer"
                    label="Buyer"
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    column="participants"
                    label="Participants"
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    column="payment"
                    label="Payment"
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    align="right"
                    column="amount"
                    label="Amount"
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    participants={
                      participantsByTransactionId.get(transaction.id) ?? []
                    }
                    transaction={transaction}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-md border border-border p-6">
          <h2 className="text-xl font-extrabold text-foreground">
            No transactions yet
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Payments will appear here once they have been completed.
          </p>
        </div>
      )}
    </section>
  )
}

function SortableHeader({
  align = 'left',
  column,
  label,
  sortColumn,
  sortDirection,
  onSort,
}: {
  align?: 'left' | 'right'
  column: SortColumn
  label: string
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSort: (column: SortColumn) => void
}) {
  return (
    <th
      scope="col"
      aria-sort={getAriaSort(column, sortColumn, sortDirection)}
      className="px-4 py-3 font-extrabold"
    >
      <SortHeaderButton
        align={align}
        column={column}
        label={label}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      />
    </th>
  )
}

function SortHeaderButton({
  align,
  column,
  label,
  sortColumn,
  sortDirection,
  onSort,
}: {
  align: 'left' | 'right'
  column: SortColumn
  label: string
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSort: (column: SortColumn) => void
}) {
  const isActive = column === sortColumn
  const Icon = isActive
    ? sortDirection === 'asc'
      ? ChevronUp
      : ChevronDown
    : ArrowUpDown

  return (
    <button
      type="button"
      className={`inline-flex min-h-8 w-full items-center gap-2 rounded-sm text-xs font-extrabold uppercase text-muted-foreground touch-manipulation hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 ${
        align === 'right' ? 'justify-end' : 'justify-start'
      }`}
      onClick={() => onSort(column)}
    >
      {label}
      <Icon aria-hidden="true" className="size-3.5" />
    </button>
  )
}

function TransactionRow({
  participants,
  transaction,
}: {
  participants: CommonParticipant[]
  transaction: CommonTransaction
}) {
  return (
    <tr className="border-t border-border align-top">
      <td className="px-4 py-4 font-semibold text-foreground">
        {formatDate(transaction.paid_at)}
      </td>
      <td className="max-w-72 px-4 py-4">
        <span className="block font-bold text-foreground">
          {getBuyerName(transaction) ?? 'Unknown buyer'}
        </span>
        <span className="mt-1 block wrap-break-word text-xs text-muted-foreground">
          {transaction.buyer_email ?? 'No email on file'}
        </span>
        {transaction.buyer_phone ? (
          <span className="mt-1 block text-xs text-muted-foreground">
            {formatPhone(transaction.buyer_phone)}
          </span>
        ) : null}
      </td>
      <td className="min-w-72 px-4 py-4">
        {participants.length ? (
          <div className="flex flex-col gap-2">
            {participants.map((participant) => (
              <article
                key={participant.id}
                className="rounded-md border border-border bg-muted/40 p-3"
              >
                <p className="font-extrabold text-foreground">
                  {getParticipantName(participant)}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {getParticipantDetails(participant)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground">No participants matched</span>
        )}
      </td>
      <td className="min-w-80 px-4 py-4">
        <span className="block font-bold capitalize text-foreground">
          {formatToken(transaction.payment_type)}
        </span>
        <span className="mt-1 block break-all text-xs leading-5 text-muted-foreground">
          {transaction.zeffy_payment_id}
        </span>
      </td>
      <td className="px-4 py-4 text-right font-extrabold text-foreground tabular-nums">
        {formatMoney(transaction.amount_cents, transaction.currency)}
      </td>
    </tr>
  )
}

function compareTransactions(
  first: CommonTransaction,
  second: CommonTransaction,
  participantsByTransactionId: Map<string, CommonParticipant[]>,
  sortColumn: SortColumn,
  sortDirection: SortDirection,
) {
  const direction = sortDirection === 'asc' ? 1 : -1
  let result = 0

  if (sortColumn === 'date') {
    result =
      new Date(first.paid_at).getTime() - new Date(second.paid_at).getTime()
  } else if (sortColumn === 'buyer') {
    result = getSortableBuyer(first).localeCompare(getSortableBuyer(second))
  } else if (sortColumn === 'participants') {
    result = getParticipantSortValue(
      participantsByTransactionId.get(first.id) ?? [],
    ).localeCompare(
      getParticipantSortValue(participantsByTransactionId.get(second.id) ?? []),
    )
  } else if (sortColumn === 'payment') {
    result = getPaymentSortValue(first).localeCompare(
      getPaymentSortValue(second),
    )
  } else {
    result = first.amount_cents - second.amount_cents
  }

  if (result === 0) {
    result =
      new Date(first.paid_at).getTime() - new Date(second.paid_at).getTime()
  }

  return result * direction
}

function getAriaSort(
  column: SortColumn,
  sortColumn: SortColumn,
  sortDirection: SortDirection,
) {
  if (column !== sortColumn) {
    return 'none'
  }

  return sortDirection === 'asc' ? 'ascending' : 'descending'
}

function formatMoney(amountCents: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amountCents / 100)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatToken(value: string) {
  return value.replaceAll('_', ' ')
}

function formatPhone(value: string) {
  return value
}

function getParticipantDetails(participant: CommonParticipant) {
  return (
    [
      participant.age ? `Age ${participant.age}` : null,
      participant.gender ? formatToken(participant.gender) : null,
      participant.grade_level ? formatToken(participant.grade_level) : null,
    ]
      .filter(Boolean)
      .join(' · ') || 'Details not provided'
  )
}

function getParticipantName(participant: CommonParticipant) {
  return [participant.first_name, participant.last_name]
    .filter((value): value is string => Boolean(value))
    .join(' ')
}

function getSortableBuyer(transaction: CommonTransaction) {
  return (
    getBuyerName(transaction) ??
    transaction.buyer_email ??
    'unknown buyer'
  ).toLocaleLowerCase()
}

function getParticipantSortValue(participants: CommonParticipant[]) {
  return [
    participants.length.toString().padStart(4, '0'),
    participants.map(getParticipantName).join(' '),
  ]
    .join(' ')
    .toLocaleLowerCase()
}

function getPaymentSortValue(transaction: CommonTransaction) {
  return `${transaction.payment_type} ${transaction.zeffy_payment_id}`.toLocaleLowerCase()
}

function getBuyerName(transaction: CommonTransaction) {
  const buyer = getRawPayloadBuyer(transaction.raw_payload)
  const name = [buyer?.first_name, buyer?.last_name]
    .filter((value): value is string => Boolean(value))
    .join(' ')
    .trim()

  return name || null
}

function getRawPayloadBuyer(rawPayload: Record<string, unknown>) {
  const data = rawPayload.data

  if (!data || typeof data !== 'object' || !('buyer' in data)) {
    return null
  }

  const buyer = data.buyer

  if (!buyer || typeof buyer !== 'object') {
    return null
  }

  return buyer as {
    first_name?: string | null
    last_name?: string | null
  }
}
