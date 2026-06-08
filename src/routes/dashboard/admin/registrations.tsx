import { createFileRoute, useLocation, Outlet } from '@tanstack/react-router'
import { SummerProgramRegistrationApprovalsPanel } from '#/components/summer-program-registration-approvals-panel'
import { commonSummerProgramRegistrationsSearchSchema } from '#/portals/common/summer-program-registrations/schemas'
import type { CommonSummerProgramRegistrationsSearch } from '#/portals/common/summer-program-registrations/schemas'

export const Route = createFileRoute('/dashboard/admin/registrations')({
  validateSearch: commonSummerProgramRegistrationsSearchSchema,
  component: AdminRegistrationsPage,
  head: () => ({
    meta: [{ title: 'Admin Registration Approvals | Questura' }],
  }),
})

function AdminRegistrationsPage() {
  const { pathname } = useLocation()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const isNestedRoute = pathname.startsWith('/dashboard/admin/registrations/')

  if (isNestedRoute) {
    return <Outlet />
  }

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
