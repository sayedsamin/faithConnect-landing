import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { CheckCircle2, Clock, RefreshCcw, XCircle } from 'lucide-react'
import { guardianSummerProgramRegistrationsQueryOptions } from '#/portals/guardian/summer-program/queries'
import type {
  GuardianSummerProgramRegistrationListItem,
  GuardianSummerProgramRegistrationStatus,
} from '#/portals/guardian/summer-program/schemas'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function GuardianRegistrationsPanel() {
  const registrationsQuery = useQuery(
    guardianSummerProgramRegistrationsQueryOptions(),
  )
  const registrations = registrationsQuery.data ?? []

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
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">Guardian Portal</p>
          <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
            Registrations
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Review active summer program registrations and approval status.
          </p>
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

      {registrations.length ? (
        <div className="mt-8 grid gap-4">
          {registrations.map((registration) => (
            <RegistrationCard
              key={registration.id}
              registration={registration}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-border p-6">
          <h2 className="text-xl font-extrabold text-foreground">
            No active registrations
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Submitted registrations that are awaiting approval or approved will
            appear here.
          </p>
          <Link
            to="/summer-program/register"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-extrabold touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            style={{ color: 'var(--white)' }}
          >
            Start registration
          </Link>
        </div>
      )}
    </section>
  )
}

function RegistrationCard({
  registration,
}: {
  registration: GuardianSummerProgramRegistrationListItem
}) {
  return (
    <article className="rounded-md border border-border bg-background p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-extrabold text-foreground">
              {formatProgramCode(registration.program_code)}
            </h2>
            <RegistrationStatusBadge status={registration.status} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Submitted {formatDateTime(registration.created_at)}
          </p>
        </div>
        <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:min-w-96">
          <Detail label="Guardian" value={registration.guardian_name} />
          <Detail label="Email" value={registration.guardian_email} />
          <Detail label="Phone" value={registration.guardian_phone} />
          <Detail
            label="Terms accepted"
            value={formatDateTime(registration.terms_accepted_at)}
          />
        </dl>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
        <section aria-labelledby={`${registration.id}-participants`}>
          <h3
            id={`${registration.id}-participants`}
            className="text-sm font-extrabold uppercase text-muted-foreground"
          >
            Participants
          </h3>
          <div className="mt-3 overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead className="bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  {['Name', 'Age', 'Grade', 'Gender'].map((heading) => (
                    <th key={heading} scope="col" className="px-4 py-3">
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
                    <td className="px-4 py-3 font-extrabold text-foreground">
                      {participant.first_name} {participant.last_name}
                    </td>
                    <td className="px-4 py-3 text-foreground tabular-nums">
                      {participant.age.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-foreground tabular-nums">
                      {participant.grade_level.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {participant.gender}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <dl className="grid content-start gap-3 text-sm">
          <Detail label="Registration ID" value={registration.id} />
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
            label="Last updated"
            value={formatDateTime(registration.updated_at)}
          />
        </dl>
      </div>
    </article>
  )
}

function RegistrationStatusBadge({
  status,
}: {
  status: GuardianSummerProgramRegistrationStatus
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
    <div className="min-w-0 rounded-md border border-border bg-muted/45 px-3 py-2">
      <dt className="text-xs font-extrabold uppercase text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words font-semibold text-foreground">
        {value}
      </dd>
    </div>
  )
}

function getStatusDetails(status: GuardianSummerProgramRegistrationStatus) {
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
      label: 'Cancelled',
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

function formatDateTime(value: string) {
  return dateFormatter.format(new Date(value))
}

function formatProgramCode(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase() + part.slice(1))
    .join(' ')
}
