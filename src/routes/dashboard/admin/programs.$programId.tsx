import { createFileRoute } from '@tanstack/react-router'
import { adminProgramIdSchema } from '#/portals/admin/programs/schemas'
import { AdminProgramDetailsPanel } from './-components/admin-program-details-panel'

export const Route = createFileRoute('/dashboard/admin/programs/$programId')({
  component: AdminProgramDetailsPage,
  head: () => ({
    meta: [{ title: 'Program Details | Questura' }],
  }),
})

function AdminProgramDetailsPage() {
  const { programId } = Route.useParams()
  const parsedProgramId = adminProgramIdSchema.safeParse(programId)

  if (!parsedProgramId.success) {
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
      >
        Invalid program id.
      </p>
    )
  }

  return <AdminProgramDetailsPanel programId={parsedProgramId.data} />
}
