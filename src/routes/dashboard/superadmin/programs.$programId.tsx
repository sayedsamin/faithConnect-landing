import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { adminProgramIdSchema } from '#/portals/admin/programs/schemas'
import { SuperadminProgramDetailsPanel } from './-components/superadmin-program-details-panel'

const adminProgramParamsSchema = adminProgramIdSchema.transform(
  (programId) => ({
    programId,
  }),
)

export const Route = createFileRoute(
  '/dashboard/superadmin/programs/$programId',
)({
  params: {
    parse: (rawParams) => adminProgramParamsSchema.parse(rawParams),
  },
  component: SuperadminProgramDetailsPage,
  head: () => ({
    meta: [{ title: 'Superadmin Program Details | Questura' }],
  }),
})

function SuperadminProgramDetailsPage() {
  const { programId } = Route.useParams()
  const location = useLocation()

  if (location.pathname.endsWith('/edit')) {
    return <Outlet />
  }

  return <SuperadminProgramDetailsPanel programId={programId} />
}
