import { createFileRoute } from '@tanstack/react-router'
import { SummerProgramRegistrationApprovalsPanel } from '#/components/summer-program-registration-approvals-panel'
import { commonSummerProgramRegistrationsSearchSchema } from '#/portals/common/summer-program-registrations/schemas'
import type { CommonSummerProgramRegistrationsSearch } from '#/portals/common/summer-program-registrations/schemas'

export const Route = createFileRoute('/dashboard/superadmin/registrations')({
  validateSearch: commonSummerProgramRegistrationsSearchSchema,
  component: SuperadminRegistrationsPage,
  head: () => ({
    meta: [{ title: 'Superadmin Registration Approvals | Questura' }],
  }),
})

function SuperadminRegistrationsPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  function updateSearch(
    nextSearch: Partial<CommonSummerProgramRegistrationsSearch>,
  ) {
    void navigate({
      replace: true,
      search: (previousSearch) => ({
        ...previousSearch,
        ...nextSearch,
      }),
    })
  }

  function resetSearch() {
    void navigate({
      replace: true,
      search: {
        dir: 'desc',
        sort: 'submitted_at',
      },
    })
  }

  return (
    <SummerProgramRegistrationApprovalsPanel
      search={search}
      onResetSearch={resetSearch}
      onSearchChange={updateSearch}
    />
  )
}
