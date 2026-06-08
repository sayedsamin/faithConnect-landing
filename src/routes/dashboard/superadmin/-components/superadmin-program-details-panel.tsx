import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Pencil,
  UsersRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { adminProgramQueryOptions } from '#/portals/admin/programs/queries'
import type { AdminProgramStatus } from '#/portals/admin/programs/schemas'

export function SuperadminProgramDetailsPanel({
  programId,
}: {
  programId: string
}) {
  const programQuery = useQuery(adminProgramQueryOptions(programId))
  const program = programQuery.data

  if (programQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading program details
      </p>
    )
  }

  if (programQuery.isError) {
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
      >
        Unable to load program details.
      </p>
    )
  }

  if (!program) {
    return (
      <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
        <BackLink />
        <h1 className="mt-6 text-2xl font-extrabold text-foreground">
          Program not found
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This program may have been removed or you may not have access to it.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <BackLink />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="island-kicker">Program Details</p>
          <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
            {program.name}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            {program.description}
          </p>
        </div>
        <span className="inline-flex min-h-7 w-fit items-center rounded-md border border-border bg-muted px-3 text-xs font-extrabold uppercase text-foreground">
          {formatStatus(program.program_status)}
        </span>
      </div>

      <div className="mt-6">
        <Link
          to="/dashboard/superadmin/programs/$programId/edit"
          params={{ programId }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          style={{ color: 'var(--white)' }}
        >
          <Pencil aria-hidden="true" className="size-4" />
          Edit program
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <DetailCard
          Icon={CalendarDays}
          label="Date range"
          value={formatDateRange(program.start_date, program.end_date)}
        />
        <DetailCard Icon={MapPin} label="Location" value={program.location} />
        <DetailCard
          Icon={UsersRound}
          label="Capacity"
          value={program.capacity.toLocaleString()}
        />
      </div>

      <dl className="mt-8 grid gap-4 rounded-md border border-border p-5 sm:grid-cols-2">
        <DetailTerm
          label="Registration status"
          value={program.registration_status}
        />
        <DetailTerm
          label="Age range"
          value={`${program.minimum_age.toLocaleString()}-${program.maximum_age.toLocaleString()}`}
        />
        <DetailTerm
          label="Created date"
          value={formatDate(program.created_at)}
        />
        <DetailTerm
          label="Last updated"
          value={formatDate(program.updated_at)}
        />
      </dl>
    </section>
  )
}

function BackLink() {
  return (
    <Link
      to="/dashboard/superadmin/programs"
      className="inline-flex min-h-9 items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      Programs
    </Link>
  )
}

function DetailCard({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <article className="rounded-md border border-border p-5">
      <Icon aria-hidden="true" className="size-5 text-primary" />
      <p className="mt-4 text-sm font-bold text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-lg font-extrabold text-foreground">
        {value}
      </p>
    </article>
  )
}

function DetailTerm({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-bold text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-base font-extrabold capitalize text-foreground">
        {value}
      </dd>
    </div>
  )
}

function formatDateRange(startDate: string, endDate: string) {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(new Date(value))
}

function formatStatus(status: AdminProgramStatus) {
  return status.replaceAll('_', ' ')
}
