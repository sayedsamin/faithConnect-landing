import { createFileRoute } from '@tanstack/react-router'
import { AdminProgramForm } from '../admin/-components/admin-program-form'

export const Route = createFileRoute('/dashboard/superadmin/programs/new')({
  component: SuperadminNewProgramPage,
  head: () => ({
    meta: [{ title: 'New Program | Questura' }],
  }),
})

function SuperadminNewProgramPage() {
  return <AdminProgramForm />
}
