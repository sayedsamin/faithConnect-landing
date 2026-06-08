import { createFileRoute } from '@tanstack/react-router'
import { AdminProgramForm } from './-components/admin-program-form'

export const Route = createFileRoute('/dashboard/admin/programs/new')({
  component: AdminNewProgramPage,
  head: () => ({
    meta: [{ title: 'New Program | Questura' }],
  }),
})

function AdminNewProgramPage() {
  return <AdminProgramForm />
}
