import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboard } from './-components/admin-dashboard'

export const Route = createFileRoute('/dashboard/admin/')({
  component: AdminDashboardIndexPage,
  head: () => ({
    meta: [{ title: 'Admin Dashboard | Questura' }],
  }),
})

function AdminDashboardIndexPage() {
  return <AdminDashboard />
}
