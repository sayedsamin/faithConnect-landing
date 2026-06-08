import { createFileRoute } from '@tanstack/react-router'
import { GuardianDashboard } from './-components/guardian-dashboard'

export const Route = createFileRoute('/dashboard/guardian/')({
  component: GuardianDashboardIndexPage,
  head: () => ({
    meta: [{ title: 'Guardian Dashboard | Questura' }],
  }),
})

function GuardianDashboardIndexPage() {
  return <GuardianDashboard />
}
