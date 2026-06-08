import { createFileRoute } from '@tanstack/react-router'
import { GuardianRegistrationsPanel } from './-components/guardian-registrations-panel'

export const Route = createFileRoute('/dashboard/guardian/registrations')({
  component: GuardianRegistrationsPage,
  head: () => ({
    meta: [{ title: 'Guardian Registrations | Questura' }],
  }),
})

function GuardianRegistrationsPage() {
  return <GuardianRegistrationsPanel />
}
