import { createFileRoute } from '@tanstack/react-router'
import { adminProgramIdSchema } from '#/portals/admin/programs/schemas'
import { SuperadminProgramEditPage } from './-components/superadmin-program-edit-page'

const adminProgramParamsSchema = adminProgramIdSchema.transform(
  (programId) => ({
    programId,
  }),
)

export const Route = createFileRoute(
  '/dashboard/superadmin/programs/$programId/edit',
)({
  params: {
    parse: (rawParams) => adminProgramParamsSchema.parse(rawParams),
  },
  component: SuperadminProgramEditRoute,
  head: () => ({
    meta: [{ title: 'Edit Program | Questura' }],
  }),
})

function SuperadminProgramEditRoute() {
  const { programId } = Route.useParams()

  return <SuperadminProgramEditPage programId={programId} />
}
