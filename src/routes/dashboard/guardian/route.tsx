import { Outlet, createFileRoute } from '@tanstack/react-router'
import { DashboardShell } from '#/components/dashboard/dashboard-shell'
import { requireDashboardRole } from '#/lib/auth/dashboard-route-guard'
import { guardianDashboardItems } from './-components/guardian-nav'

export const Route = createFileRoute('/dashboard/guardian')({
  beforeLoad: async ({ location }) => {
    await requireDashboardRole({
      redirect: location.href,
      requiredRole: 'guardian',
    })
  },
  component: GuardianDashboardLayout,
  head: () => ({
    meta: [{ title: 'Guardian Dashboard | Questura' }],
  }),
})

function GuardianDashboardLayout() {
  return (
    <DashboardShell role="guardian" items={guardianDashboardItems}>
      <Outlet />
    </DashboardShell>
  )
}
