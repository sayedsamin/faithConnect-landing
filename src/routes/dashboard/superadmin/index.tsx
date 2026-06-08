import { createFileRoute } from '@tanstack/react-router'
import { SuperadminDashboardOverview } from './-components/superadmin-dashboard'

export const Route = createFileRoute('/dashboard/superadmin/')({
  component: SuperadminDashboardIndexPage,
  head: () => ({
    meta: [{ title: 'Superadmin Dashboard | Questura' }],
  }),
})

function SuperadminDashboardIndexPage() {
  return <SuperadminDashboardOverview />
}
