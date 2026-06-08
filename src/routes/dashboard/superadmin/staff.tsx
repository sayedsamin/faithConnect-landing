import { createFileRoute } from '@tanstack/react-router'
import { StaffManagementPanel } from '../-components/staff-management-panel'

export const Route = createFileRoute('/dashboard/superadmin/staff')({
  component: SuperadminStaffPage,
  head: () => ({
    meta: [{ title: 'Staff | Questura' }],
  }),
})

function SuperadminStaffPage() {
  return <StaffManagementPanel />
}
