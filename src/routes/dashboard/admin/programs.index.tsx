import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { adminProgramStatusSchema } from '#/portals/admin/programs/schemas'
import { AdminProgramsPanel } from './-components/admin-programs-panel'

const adminProgramsSearchSchema = z.object({
  status: adminProgramStatusSchema.optional().catch(undefined),
})

export const Route = createFileRoute('/dashboard/admin/programs/')({
  validateSearch: adminProgramsSearchSchema,
  component: AdminProgramsPage,
  head: () => ({
    meta: [{ title: 'Admin Programs | Questura' }],
  }),
})

function AdminProgramsPage() {
  const { status } = Route.useSearch()

  return <AdminProgramsPanel activeStatus={status} />
}
