import { createFileRoute } from '@tanstack/react-router'
import { SupervisorDashboard } from './-components/supervisor-dashboard'

export const Route = createFileRoute('/dashboard/supervisor/')({
  component: SupervisorDashboardIndexPage,
  head: () => ({
    meta: [{ title: 'Supervisor Dashboard | Questura' }],
  }),
})

function SupervisorDashboardIndexPage() {
  return <SupervisorDashboard />
}
