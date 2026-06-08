import { createFileRoute } from '@tanstack/react-router'
import { StaffManagementPanel } from '../-components/staff-management-panel'

export const Route = createFileRoute('/dashboard/admin/staff')({
  component: AdminStaffPage,
  head: () => ({
    meta: [{ title: 'Staff | Questura' }],
  }),
})

function AdminStaffPage() {
  return <StaffManagementPanel />
}
