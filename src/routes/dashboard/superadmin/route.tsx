import { Outlet, createFileRoute } from '@tanstack/react-router'
import { DashboardShell } from '#/components/dashboard/dashboard-shell'
import { requireDashboardRole } from '#/lib/auth/dashboard-route-guard'
import { superadminDashboardSections } from './-components/superadmin-nav'

export const Route = createFileRoute('/dashboard/superadmin')({
  beforeLoad: async ({ location }) => {
    await requireDashboardRole({
      redirect: location.href,
      requiredRole: 'superadmin',
    })
  },
  component: SuperadminDashboardPage,
  head: () => ({
    meta: [{ title: 'Superadmin Dashboard | Questura' }],
  }),
})

function SuperadminDashboardPage() {
  return (
    <DashboardShell role="superadmin" sections={superadminDashboardSections}>
      <Outlet />
    </DashboardShell>
  )
}
