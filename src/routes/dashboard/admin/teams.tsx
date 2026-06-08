import { createFileRoute } from '@tanstack/react-router'
import { TeamManagementPanel } from '../-components/team-management-panel'

export const Route = createFileRoute('/dashboard/admin/teams')({
  component: AdminTeamsPage,
  head: () => ({
    meta: [{ title: 'Teams | Questura' }],
  }),
})

function AdminTeamsPage() {
  return <TeamManagementPanel />
}
