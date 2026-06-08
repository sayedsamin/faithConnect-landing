import { createFileRoute } from '@tanstack/react-router'
import { AdminRolesPanel } from './-components/admin-roles-panel'

export const Route = createFileRoute('/dashboard/superadmin/roles')({
  component: SuperadminRolesPage,
  head: () => ({
    meta: [{ title: 'Roles | Questura' }],
  }),
})

function SuperadminRolesPage() {
  return <AdminRolesPanel />
}
