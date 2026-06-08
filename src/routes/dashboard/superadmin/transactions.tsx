import { createFileRoute } from '@tanstack/react-router'
import { TransactionsPanel } from '#/components/transactions/transactions-panel'

export const Route = createFileRoute('/dashboard/superadmin/transactions')({
  component: SuperadminTransactionsPage,
  head: () => ({
    meta: [{ title: 'Superadmin Transactions | Questura' }],
  }),
})

function SuperadminTransactionsPage() {
  return <TransactionsPanel />
}
