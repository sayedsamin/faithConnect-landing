import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { useParticipantsByTransactionId } from '#/portals/common/transactions/hooks'
import { commonTransactionsQueryOptions } from '#/portals/common/transactions/queries'
import type {
  CommonParticipant,
  CommonTransaction,
} from '#/portals/common/transactions/schemas'

type TransactionsTableProps = {
  audience: 'guardian' | 'admin'
}

export function TransactionsTable({ audience }: TransactionsTableProps) {
  const transactionsQuery = useQuery(commonTransactionsQueryOptions())
  const data = transactionsQuery.data ?? {
    participants: [],
    participantWarning: null,
    transactions: [],
  }
  const {
    participantWarning,
    participants: participantRows,
    transactions,
  } = data
  const participantsByTransactionId =
    useParticipantsByTransactionId(participantRows)

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
  const participantCount = Array.from(
    participantsByTransactionId.values(),
  ).reduce((total, participants) => total + participants.length, 0)
  const totalAmountCents = transactions.reduce(
    (total, transaction) => total + transaction.amount_cents,
    0,
  )

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">
            {audience === 'guardian' ? 'Family Payments' : 'Payments'}
          </p>
          <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
            Transactions
          </h1>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
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

          {audience === 'guardian' ? (
            <div className="mt-8 grid gap-4">
              {transactions.map((transaction) => (
                <GuardianTransactionCard
                  key={transaction.id}
                  participants={
                    participantsByTransactionId.get(transaction.id) ?? []
                  }
                  transaction={transaction}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto rounded-md border border-border">
              <table className="min-w-230 border-collapse text-left text-sm">
                <thead className="bg-muted text-xs uppercase text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-extrabold">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3 font-extrabold">
                      Buyer
                    </th>
                    <th scope="col" className="px-4 py-3 font-extrabold">
                      Participants
                    </th>
                    <th scope="col" className="px-4 py-3 font-extrabold">
                      Payment
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-extrabold"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => {
                    const participants =
                      participantsByTransactionId.get(transaction.id) ?? []

                    return (
                      <tr
                        key={transaction.id}
                        className="border-t border-border align-top"
                      >
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
                                    {[
                                      participant.age
                                        ? `Age ${participant.age}`
                                        : null,
                                      participant.gender
                                        ? formatToken(participant.gender)
                                        : null,
                                      participant.grade_level
                                        ? formatToken(participant.grade_level)
                                        : null,
                                    ]
                                      .filter(Boolean)
                                      .join(' · ') || 'Details not provided'}
                                  </p>
                                </article>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              No participants matched
                            </span>
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
                          {formatMoney(
                            transaction.amount_cents,
                            transaction.currency,
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
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

type GuardianTransactionCardProps = {
  participants: CommonParticipant[]
  transaction: CommonTransaction
}

function GuardianTransactionCard({
  participants,
  transaction,
}: GuardianTransactionCardProps) {
  return (
    <article className="rounded-md border border-border bg-background p-5 shadow-[0_14px_28px_rgba(23,58,64,0.06)]">
      <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-bold text-muted-foreground">
            {formatDate(transaction.paid_at)}
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-foreground">
            {getBuyerName(transaction) ?? 'Unknown buyer'}
          </h2>
          <p className="mt-1 wrap-break-word text-sm text-muted-foreground">
            {transaction.buyer_email ?? 'No email on file'}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-2xl font-extrabold text-foreground tabular-nums">
            {formatMoney(transaction.amount_cents, transaction.currency)}
          </p>
          <p className="mt-1 text-sm font-bold capitalize text-muted-foreground">
            {formatToken(transaction.payment_type)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
            Participants
          </h3>
          {participants.length ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {participants.map((participant) => (
                <article
                  key={participant.id}
                  className="rounded-md border border-border bg-muted/40 p-3"
                >
                  <p className="font-extrabold text-foreground">
                    {getParticipantName(participant)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {getParticipantDetails(participant)}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-3 rounded-md border border-border bg-muted/40 p-3 text-sm font-semibold text-muted-foreground">
              No participants matched
            </p>
          )}
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
            Payment ID
          </h3>
          <p className="mt-3 break-all rounded-md border border-border bg-muted/40 p-3 text-sm font-semibold leading-6 text-foreground">
            {transaction.zeffy_payment_id}
          </p>
          {transaction.buyer_phone ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {formatPhone(transaction.buyer_phone)}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
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
      .join(', ') || 'Details not provided'
  )
}

function getParticipantName(participant: CommonParticipant) {
  return [participant.first_name, participant.last_name]
    .filter((value): value is string => Boolean(value))
    .join(' ')
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
