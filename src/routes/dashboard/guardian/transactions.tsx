import { createFileRoute } from '@tanstack/react-router'
import { TransactionsTable } from '#/components/transactions/transactions-table'
import { GuardianRegistrationCta } from './-components/guardian-registration-cta'

export const Route = createFileRoute('/dashboard/guardian/transactions')({
  component: GuardianTransactionsPage,
  head: () => ({
    meta: [{ title: 'Guardian Transactions | Questura' }],
  }),
})

function GuardianTransactionsPage() {
  return (
    <>
      <GuardianRegistrationCta />
      <TransactionsTable audience="guardian" />
    </>
  )
}
