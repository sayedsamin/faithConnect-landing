import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { adminProgramStatusSchema } from '#/portals/admin/programs/schemas'
import { SuperadminProgramsPanel } from './-components/superadmin-programs-panel'

const superadminProgramsSearchSchema = z.object({
  status: adminProgramStatusSchema.optional().catch(undefined),
})

export const Route = createFileRoute('/dashboard/superadmin/programs/')({
  validateSearch: superadminProgramsSearchSchema,
  component: SuperadminProgramsPage,
  head: () => ({
    meta: [{ title: 'Superadmin Programs | Questura' }],
  }),
})

function SuperadminProgramsPage() {
  const { status } = Route.useSearch()

  return <SuperadminProgramsPanel activeStatus={status} />
}
