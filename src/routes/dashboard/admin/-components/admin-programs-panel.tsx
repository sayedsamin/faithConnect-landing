import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { CalendarPlus, RefreshCcw, Search } from 'lucide-react'
import { adminProgramsQueryOptions } from '#/portals/admin/programs/queries'
import type {
  AdminProgramListItem,
  AdminProgramStatus,
} from '#/portals/admin/programs/schemas'

const statusFilters = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
] satisfies { value: AdminProgramStatus; label: string }[]

export function AdminProgramsPanel({
  activeStatus,
}: {
  activeStatus?: AdminProgramStatus
}) {
  const programsQuery = useQuery(adminProgramsQueryOptions())
  const programs = programsQuery.data ?? []
  const visiblePrograms = activeStatus
    ? programs.filter((program) => program.program_status === activeStatus)
    : programs

  if (programsQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading programs
      </p>
    )
  }

  if (programsQuery.isError) {
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
      >
        Unable to load programs.
      </p>
    )
  }

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">Program Operations</p>
          <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
            Programs
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Monitor draft, published, and archived programs.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            onClick={() => void programsQuery.refetch()}
          >
            <RefreshCcw aria-hidden="true" className="size-4" />
            Refresh
          </button>
          <Link
            to="/dashboard/admin/programs/new"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-extrabold touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            style={{ color: 'var(--white)' }}
          >
            <CalendarPlus aria-hidden="true" className="size-4" />
            New program
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ProgramCountCard
          hrefSearch={{}}
          isActive={!activeStatus}
          label="All programs"
          value={programs.length}
        />
        {statusFilters.map((filter) => (
          <ProgramCountCard
            key={filter.value}
            hrefSearch={{ status: filter.value }}
            isActive={activeStatus === filter.value}
            label={`${filter.label} programs`}
            value={
              programs.filter(
                (program) => program.program_status === filter.value,
              ).length
            }
          />
        ))}
      </div>

      {visiblePrograms.length ? (
        <div className="mt-8 w-full overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-muted text-xs uppercase text-muted-foreground">
              <tr>
                {[
                  'Program name',
                  'Capacity',
                  'Registered',
                  'Assigned supervisors',
                  'Status',
                  'Details',
                ].map((heading) => (
                  <th key={heading} scope="col" className="px-4 py-3">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visiblePrograms.map((program) => (
                <ProgramRow key={program.id} program={program} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-border p-6">
          <h2 className="text-xl font-extrabold text-foreground">
            No programs found
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Programs will appear here as admins create and schedule them.
          </p>
        </div>
      )}
    </section>
  )
}

function ProgramCountCard({
  hrefSearch,
  isActive,
  label,
  value,
}: {
  hrefSearch: { status?: AdminProgramStatus }
  isActive: boolean
  label: string
  value: number
}) {
  return (
    <Link
      to="/dashboard/admin/programs"
      search={hrefSearch}
      className={`rounded-md border p-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 ${
        isActive
          ? 'border-primary bg-primary/10'
          : 'border-border hover:border-primary'
      }`}
    >
      <span className="block text-sm font-bold text-muted-foreground">
        {label}
      </span>
      <span className="mt-2 block text-2xl font-extrabold text-foreground tabular-nums">
        {value.toLocaleString()}
      </span>
    </Link>
  )
}

function ProgramRow({ program }: { program: AdminProgramListItem }) {
  return (
    <tr className="border-t border-border align-top">
      <td className="max-w-72 px-4 py-4">
        <span className="block font-extrabold text-foreground">
          {program.name}
        </span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          Ages {program.minimum_age.toLocaleString()}-
          {program.maximum_age.toLocaleString()}
        </span>
      </td>
      <td className="px-4 py-4 font-extrabold text-foreground tabular-nums">
        {program.capacity.toLocaleString()}
      </td>
      <td className="px-4 py-4 font-extrabold text-foreground tabular-nums">
        {program.registered_children_count.toLocaleString()}
      </td>
      <td className="max-w-72 px-4 py-4 text-muted-foreground">
        {program.assigned_supervisors.length
          ? program.assigned_supervisors.join(', ')
          : 'Unassigned'}
      </td>
      <td className="px-4 py-4">
        <span className="inline-flex min-h-7 items-center rounded-md border border-border bg-muted px-3 text-xs font-extrabold uppercase text-foreground">
          {formatStatus(program.program_status)}
        </span>
      </td>
      <td className="px-4 py-4">
        <Link
          to="/dashboard/admin/programs/$programId"
          params={{ programId: program.id }}
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
        >
          <Search aria-hidden="true" className="size-3.5" />
          Details
        </Link>
      </td>
    </tr>
  )
}

function formatStatus(status: AdminProgramStatus) {
  return status.replaceAll('_', ' ')
}
