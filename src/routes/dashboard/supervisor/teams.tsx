import { createFileRoute } from '@tanstack/react-router'
import { requireDashboardRole } from '#/lib/auth/dashboard-route-guard'
import { TeamManagementPanel } from '../-components/team-management-panel'

export const Route = createFileRoute('/dashboard/supervisor/teams')({
  beforeLoad: async ({ location }) => {
    await requireDashboardRole({
      redirect: location.href,
      requiredRole: 'supervisor',
    })
  },
  component: SupervisorTeamsPage,
  head: () => ({
    meta: [{ title: 'Supervisor Teams | Questura' }],
  }),
})

function SupervisorTeamsPage() {
  return <TeamManagementPanel />
}
