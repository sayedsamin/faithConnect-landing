import { createFileRoute } from '@tanstack/react-router'
import { AdminApprovedParticipantsPanel } from './-components/admin-approved-participants-panel'

export const Route = createFileRoute(
  '/dashboard/admin/registrations/summer2026/participants',
)({
  component: AdminRegistrationsSummer2026ParticipantsPage,
  head: () => ({
    meta: [{ title: 'Admin Approved Participants | Questura' }],
  }),
})

function AdminRegistrationsSummer2026ParticipantsPage() {
  return <AdminApprovedParticipantsPanel />
}
