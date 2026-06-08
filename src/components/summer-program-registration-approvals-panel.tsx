import { useMutationState, useQuery } from '@tanstack/react-query'
import {
  ArrowUpDown,
  CheckCircle2,
  Clock,
  RefreshCcw,
  Search,
  XCircle,
} from 'lucide-react'
import { useMemo } from 'react'
import { getVisibleCommonSummerProgramRegistrations } from '#/portals/common/summer-program-registrations/filters'
import { useUpdateCommonSummerProgramRegistrationStatusMutation } from '#/portals/common/summer-program-registrations/mutations'
import { commonSummerProgramRegistrationsQueryOptions } from '#/portals/common/summer-program-registrations/queries'
import type {
  CommonSummerProgramRegistration,
  CommonSummerProgramRegistrationAction,
  CommonSummerProgramRegistrationSort,
  CommonSummerProgramRegistrationSortDirection,
  CommonSummerProgramRegistrationStatus,
  CommonSummerProgramRegistrationsSearch,
} from '#/portals/common/summer-program-registrations/schemas'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const statusFilters = [
  { value: undefined, label: 'All' },
  { value: 'awaiting_confirmation', label: 'Awaiting approval' },
  { value: 'confirmed', label: 'Approved' },
  { value: 'cancelled', label: 'Declined' },
] satisfies {
  label: string
  value: CommonSummerProgramRegistrationStatus | undefined
}[]

const sortOptions = [
  { value: 'submitted_at', label: 'Submitted date' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'status', label: 'Status' },
  { value: 'participant_count', label: 'Participant count' },
  { value: 'program', label: 'Program' },
] satisfies { label: string; value: CommonSummerProgramRegistrationSort }[]

type SummerProgramRegistrationApprovalsPanelProps = {
  onResetSearch: () => void
  onSearchChange: (
    search: Partial<CommonSummerProgramRegistrationsSearch>,
  ) => void
  search: CommonSummerProgramRegistrationsSearch
}

export function SummerProgramRegistrationApprovalsPanel({
  onResetSearch,
  onSearchChange,
  search,
}: SummerProgramRegistrationApprovalsPanelProps) {
  const registrationsQuery = useQuery(
    commonSummerProgramRegistrationsQueryOptions(),
  )
  const registrations = registrationsQuery.data ?? []
  const visibleRegistrations = useMemo(
    () => getVisibleCommonSummerProgramRegistrations(registrations, search),
    [registrations, search],
  )
  const programOptions = useMemo(
    () =>
      Array.from(
        new Set(registrations.map((registration) => registration.program_code)),
      ).sort((first, second) => first.localeCompare(second)),
    [registrations],
  )
  const hasActiveFilters = Boolean(search.status || search.q || search.program)
  const hasCustomSort = search.sort !== 'submitted_at' || search.dir !== 'desc'
  const canClearControls = hasActiveFilters || hasCustomSort

  function updateQuery(value: string) {
    onSearchChange({ q: value.trim() || undefined })
  }

  function updateProgram(value: string) {
    onSearchChange({ program: value || undefined })
  }

  function updateSort(value: CommonSummerProgramRegistrationSort) {
    onSearchChange({
      sort: value,
      dir: value === search.sort ? search.dir : getDefaultSortDirection(value),
    })
  }

  function toggleSortDirection() {
    onSearchChange({ dir: search.dir === 'asc' ? 'desc' : 'asc' })
  }

  if (registrationsQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading registrations…
      </p>
    )
  }

  if (registrationsQuery.isError) {
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
      >
        Unable to load registrations.
      </p>
    )
  }

  return (
    <section className="rounded-md border border-border bg-background/86 p-5 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">Program Operations</p>
          <h1 className="display-title mt-2 text-3xl font-bold text-foreground">
            Registration approvals
          </h1>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          onClick={() => void registrationsQuery.refetch()}
        >
          <RefreshCcw aria-hidden="true" className="size-4" />
          Refresh
        </button>
      </div>

      <div className="mt-6 rounded-md border border-border bg-muted/20 p-4">
        <div className="flex flex-col gap-4">
          <div
            aria-label="Filter registrations by status"
            className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
          >
            {statusFilters.map((filter) => {
              const isActive = search.status === filter.value
              const count = filter.value
                ? registrations.filter(
                    (registration) => registration.status === filter.value,
                  ).length
                : registrations.length

              return (
                <button
                  key={filter.value ?? 'all'}
                  type="button"
                  className={`min-h-16 rounded-md border px-4 py-3 text-left touch-manipulation transition-[background-color,border-color,color] duration-150 ease-out hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 motion-reduce:transition-none ${
                    isActive
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background'
                  }`}
                  aria-pressed={isActive}
                  onClick={() => onSearchChange({ status: filter.value })}
                >
                  <span className="block text-sm font-extrabold text-foreground">
                    {filter.label}
                  </span>
                  <span className="mt-1 block text-xs font-bold text-muted-foreground tabular-nums">
                    {count.toLocaleString()} submissions
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_minmax(12rem,16rem)_minmax(12rem,16rem)_auto_auto] lg:items-end">
            <label className="grid gap-2 text-sm font-bold text-foreground">
              <span>Search</span>
              <span className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="search"
                  name="registration-search"
                  value={search.q ?? ''}
                  placeholder="Name, email, phone, participant..."
                  className="min-h-11 w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                  onChange={(event) => updateQuery(event.target.value)}
                />
              </span>
            </label>

            <label className="grid gap-2 text-sm font-bold text-foreground">
              <span>Program</span>
              <select
                name="registration-program"
                value={search.program ?? ''}
                className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                onChange={(event) => updateProgram(event.target.value)}
              >
                <option value="">All programs</option>
                {programOptions.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-foreground">
              <span>Sort by</span>
              <select
                name="registration-sort"
                value={search.sort}
                className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                onChange={(event) =>
                  updateSort(
                    event.target.value as CommonSummerProgramRegistrationSort,
                  )
                }
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              onClick={toggleSortDirection}
            >
              <ArrowUpDown aria-hidden="true" className="size-4" />
              {search.dir === 'asc' ? 'Ascending' : 'Descending'}
            </button>

            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              disabled={!canClearControls}
              onClick={onResetSearch}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {registrations.length ? (
        visibleRegistrations.length ? (
          <>
            <p className="mt-5 text-sm font-semibold text-muted-foreground">
              Showing{' '}
              <span className="font-extrabold text-foreground tabular-nums">
                {visibleRegistrations.length.toLocaleString()}
              </span>{' '}
              of{' '}
              <span className="font-extrabold text-foreground tabular-nums">
                {registrations.length.toLocaleString()}
              </span>{' '}
              registrations
            </p>
            <div className="mt-4 grid gap-3">
              {visibleRegistrations.map((registration) => (
                <RegistrationReviewCard
                  key={registration.id}
                  registration={registration}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-md border border-border p-6">
            <h2 className="text-xl font-extrabold text-foreground">
              No matching registrations
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Adjust the filters or clear them to review the full registration
              list.
            </p>
          </div>
        )
      ) : (
        <div className="mt-8 rounded-md border border-border p-6">
          <h2 className="text-xl font-extrabold text-foreground">
            No registrations yet
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            New guardian submissions will appear here for admin review.
          </p>
        </div>
      )}
    </section>
  )
}

function RegistrationReviewCard({
  registration,
}: {
  registration: CommonSummerProgramRegistration
}) {
  const updateStatusMutation =
    useUpdateCommonSummerProgramRegistrationStatusMutation()
  const pendingMutations = useMutationState({
    filters: { status: 'pending' },
    select: (mutation) => mutation.state.variables,
  })
  const isUpdating = pendingMutations.some(
    (variables) =>
      typeof variables === 'object' &&
      variables !== null &&
      'id' in variables &&
      variables.id === registration.id,
  )

  function updateStatus(status: CommonSummerProgramRegistrationAction) {
    updateStatusMutation.mutate({
      id: registration.id,
      status,
    })
  }

  return (
    <article className="rounded-md border border-border bg-background px-4 py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-extrabold text-foreground">
              {registration.guardian_name}
            </h2>
            <RegistrationStatusBadge status={registration.status} />
          </div>
          <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <InlineDetail
              label="Submitted"
              value={formatDateTime(registration.created_at)}
            />
            <InlineDetail label="Email" value={registration.guardian_email} />
            <InlineDetail label="Phone" value={registration.guardian_phone} />
          </dl>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground touch-manipulation hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            disabled={isUpdating || registration.status === 'confirmed'}
            onClick={() => updateStatus('confirmed')}
          >
            <CheckCircle2 aria-hidden="true" className="size-4" />
            {isUpdating ? 'Saving…' : 'Approve'}
          </button>
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 py-2 text-sm font-extrabold text-destructive touch-manipulation hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            disabled={isUpdating || registration.status === 'cancelled'}
            onClick={() => updateStatus('cancelled')}
          >
            <XCircle aria-hidden="true" className="size-4" />
            {isUpdating ? 'Saving…' : 'Decline'}
          </button>
        </div>
      </div>

      {updateStatusMutation.isError ? (
        <p
          role="alert"
          className="mt-4 rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
        >
          Unable to update this registration.
        </p>
      ) : null}

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
        <section aria-labelledby={`${registration.id}-participants`}>
          <h3
            id={`${registration.id}-participants`}
            className="text-xs font-extrabold uppercase text-muted-foreground"
          >
            Participants
          </h3>
          <div className="mt-2 overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead className="bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  {['Name', 'Age', 'Grade', 'Gender'].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-2">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registration.participants.map((participant, index) => (
                  <tr
                    key={`${participant.first_name}-${participant.last_name}-${index}`}
                    className="border-t border-border"
                  >
                    <td className="px-3 py-2.5 font-extrabold text-foreground">
                      {participant.first_name} {participant.last_name}
                    </td>
                    <td className="px-3 py-2.5 text-foreground tabular-nums">
                      {participant.age.toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 text-foreground tabular-nums">
                      {participant.grade_level.toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">
                      {participant.gender}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <dl className="grid content-start gap-2 text-sm">
          <Detail
            label="Emergency contact"
            value={registration.emergency_contact_name ?? 'Not provided'}
          />
          <Detail
            label="Emergency phone"
            value={registration.emergency_contact_phone ?? 'Not provided'}
          />
          <Detail label="Notes" value={registration.notes ?? 'None'} />
          <Detail
            label="Terms accepted"
            value={formatDateTime(registration.terms_accepted_at)}
          />
        </dl>
      </div>
    </article>
  )
}

function RegistrationStatusBadge({
  status,
}: {
  status: CommonSummerProgramRegistrationStatus
}) {
  const statusDetails = getStatusDetails(status)
  const Icon = statusDetails.Icon

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-md border px-3 text-xs font-extrabold uppercase ${statusDetails.className}`}
    >
      <Icon aria-hidden="true" className="size-4" />
      {statusDetails.label}
    </span>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-border py-2 last:border-b-0">
      <dt className="text-xs font-extrabold uppercase text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words font-semibold text-foreground">
        {value}
      </dd>
    </div>
  )
}

function InlineDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="sr-only">{label}</dt>
      <dd className="break-words">
        <span className="font-bold text-foreground">{label}:</span> {value}
      </dd>
    </div>
  )
}

function getStatusDetails(status: CommonSummerProgramRegistrationStatus) {
  if (status === 'confirmed') {
    return {
      label: 'Approved',
      Icon: CheckCircle2,
      className:
        'border-emerald-600/45 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
    }
  }

  if (status === 'cancelled') {
    return {
      label: 'Declined',
      Icon: XCircle,
      className: 'border-destructive bg-destructive/10 text-destructive',
    }
  }

  return {
    label: 'Awaiting approval',
    Icon: Clock,
    className:
      'border-orange-500/45 bg-orange-500/12 text-orange-700 dark:text-orange-300',
  }
}

function getDefaultSortDirection(
  sort: CommonSummerProgramRegistrationSort,
): CommonSummerProgramRegistrationSortDirection {
  return sort === 'submitted_at' ? 'desc' : 'asc'
}

function formatDateTime(value: string) {
  return dateFormatter.format(new Date(value))
}
