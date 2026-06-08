import { Outlet, createFileRoute } from '@tanstack/react-router'
import { DashboardShell } from '#/components/dashboard/dashboard-shell'
import { requireDashboardRole } from '#/lib/auth/dashboard-route-guard'
import { supervisorDashboardSections } from './-components/supervisor-nav'

export const Route = createFileRoute('/dashboard/supervisor')({
  beforeLoad: async ({ location }) => {
    await requireDashboardRole({
      allowedRoles: ['supervisor', 'camp_leader'],
      redirect: location.href,
    })
  },
  component: SupervisorDashboardLayout,
  head: () => ({
    meta: [{ title: 'Supervisor Dashboard | Questura' }],
  }),
})

function SupervisorDashboardLayout() {
  return (
    <DashboardShell
      allowedRoles={['supervisor', 'camp_leader']}
      role="supervisor"
      sections={supervisorDashboardSections}
    >
      <Outlet />
    </DashboardShell>
  )
}
