import { createFileRoute } from '@tanstack/react-router'
import { TransactionsPanel } from '#/components/transactions/transactions-panel'

export const Route = createFileRoute('/dashboard/admin/transactions')({
  component: AdminTransactionsPage,
  head: () => ({
    meta: [{ title: 'Admin Transactions | Questura' }],
  }),
})

function AdminTransactionsPage() {
  return <TransactionsPanel />
}
