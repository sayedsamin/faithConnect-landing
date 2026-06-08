import { Outlet, createFileRoute } from '@tanstack/react-router'
import { DashboardShell } from '#/components/dashboard/dashboard-shell'
import { requireDashboardRole } from '#/lib/auth/dashboard-route-guard'
import { adminDashboardSections } from './-components/admin-nav'

export const Route = createFileRoute('/dashboard/admin')({
  beforeLoad: async ({ location }) => {
    await requireDashboardRole({
      redirect: location.href,
      requiredRole: 'admin',
    })
  },
  component: AdminDashboardPage,
  head: () => ({
    meta: [{ title: 'Admin Dashboard | Questura' }],
  }),
})

function AdminDashboardPage() {
  return (
    <DashboardShell role="admin" sections={adminDashboardSections}>
      <Outlet />
    </DashboardShell>
  )
}
