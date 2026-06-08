import { useMemo, useState } from 'react'
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
  Search,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { commonSummerProgramRegistrationsQueryOptions } from '#/portals/common/summer-program-registrations/queries'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})
type SortColumn = 'age' | 'grade' | 'submitted_at'
type NonSortableColumn =
  | 'participant'
  | 'guardian'
  | 'program'
  | 'gender'
  | 'registration'
type ParticipantTableColumn = SortColumn | NonSortableColumn
type SortDirection = 'asc' | 'desc'

type ParticipantRow = {
  age: number
  createdAt: string
  gradeLevel: number
  gender: string
  guardianEmail: string
  guardianName: string
  guardianPhone: string
  participantId: string
  participantName: string
  programCode: string
  registrationId: string
}

const sortOptions = [
  { label: 'Age', value: 'age' },
  { label: 'Grade', value: 'grade' },
  { label: 'Submitted', value: 'submitted_at' },
] as const

function isNonSortableColumn(
  column: ParticipantTableColumn,
): column is NonSortableColumn {
  return (
    column === 'participant' ||
    column === 'guardian' ||
    column === 'program' ||
    column === 'gender' ||
    column === 'registration'
  )
}

const participantTableColumns: {
  column: ParticipantTableColumn
  label: string
}[] = [
  { column: 'participant', label: 'participant' },
  { column: 'guardian', label: 'guardian' },
  { column: 'program', label: 'program' },
  { column: 'age', label: 'age' },
  { column: 'grade', label: 'grade' },
  { column: 'gender', label: 'gender' },
  { column: 'submitted_at', label: 'submitted' },
  { column: 'registration', label: 'registration' },
]

export function AdminApprovedParticipantsPanel() {
  const registrationsQuery = useQuery(
    commonSummerProgramRegistrationsQueryOptions(),
  )
  const registrations = registrationsQuery.data ?? []
  const [query, setQuery] = useState('')
  const [sortColumn, setSortColumn] = useState<SortColumn>('submitted_at')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const approvedParticipants = useMemo(
    () =>
      registrations
        .filter((registration) => registration.status === 'confirmed')
        .flatMap((registration) =>
          registration.participants.map((participant, index) => ({
            age: participant.age,
            createdAt: registration.created_at,
            gender: participant.gender,
            gradeLevel: participant.grade_level,
            guardianEmail: registration.guardian_email,
            guardianName: registration.guardian_name,
            guardianPhone: registration.guardian_phone,
            participantId: `${registration.id}-${index}`,
            participantName: `${participant.first_name} ${participant.last_name}`,
            programCode: registration.program_code,
            registrationId: registration.id,
          })),
        ),
    [registrations],
  )

  const uniqueProgramsCount = useMemo(
    () =>
      new Set(
        registrations
          .filter((registration) => registration.status === 'confirmed')
          .map((registration) => registration.program_code),
      ).size,
    [registrations],
  )

  const filteredParticipants = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return approvedParticipants.filter((participant) => {
      if (!normalizedQuery) {
        return true
      }

      return (
        participant.participantName
          .toLocaleLowerCase()
          .includes(normalizedQuery) ||
        participant.guardianName
          .toLocaleLowerCase()
          .includes(normalizedQuery) ||
        participant.guardianEmail
          .toLocaleLowerCase()
          .includes(normalizedQuery) ||
        participant.guardianPhone.includes(normalizedQuery) ||
        participant.programCode.toLocaleLowerCase().includes(normalizedQuery) ||
        participant.registrationId
          .toLocaleLowerCase()
          .includes(normalizedQuery) ||
        participant.gender.toLocaleLowerCase().includes(normalizedQuery) ||
        participant.age.toLocaleString() === normalizedQuery ||
        participant.gradeLevel.toLocaleString() === normalizedQuery
      )
    })
  }, [approvedParticipants, query])

  const sortedParticipants = useMemo(
    () =>
      [...filteredParticipants].sort((first, second) => {
        const direction = sortDirection === 'asc' ? 1 : -1
        let result = 0

        if (sortColumn === 'age') {
          result = first.age - second.age
        } else if (sortColumn === 'grade') {
          result = first.gradeLevel - second.gradeLevel
        } else {
          result =
            new Date(first.createdAt).getTime() -
            new Date(second.createdAt).getTime()
        }

        if (result === 0) {
          result =
            new Date(first.createdAt).getTime() -
            new Date(second.createdAt).getTime()
        }

        return result * direction
      }),
    [filteredParticipants, sortColumn, sortDirection],
  )

  function handleSort(nextColumn: SortColumn) {
    if (sortColumn === nextColumn) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    changeSortColumn(nextColumn)
  }

  function toggleSortDirection() {
    setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
  }

  function changeSortColumn(nextColumn: SortColumn) {
    if (sortColumn === nextColumn) {
      return
    }

    setSortColumn(nextColumn)
    setSortDirection(nextColumn === 'submitted_at' ? 'desc' : 'asc')
  }

  if (registrationsQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading approved participants…
      </p>
    )
  }

  if (registrationsQuery.isError) {
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
      >
        Unable to load participants.
      </p>
    )
  }

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">Program Operations</p>
          <h1 className="display-title mt-2 text-3xl font-bold text-foreground">
            Approved participants
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Reviewable table of every participant from confirmed registrations.
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

      <div className="mt-6 rounded-md border border-border bg-muted/20 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_minmax(14rem,16rem)_auto] lg:items-end">
          <label className="grid gap-2 text-sm font-bold text-foreground">
            <span>Search</span>
            <span className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                name="participant-search"
                value={query}
                placeholder="Participant, guardian, email, phone, id..."
                className="min-h-11 w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-bold text-foreground">
            <span>Sort by</span>
            <select
              name="participant-sort"
              value={sortColumn}
              className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              onChange={(event) =>
                changeSortColumn(event.target.value as SortColumn)
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
            aria-label={`Toggle sort direction, currently ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
            title={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
          >
            {sortDirection === 'asc' ? (
              <ChevronUp aria-hidden="true" className="size-4" />
            ) : (
              <ChevronDown aria-hidden="true" className="size-4" />
            )}
            <span className="sr-only">
              {`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <SummaryCard
          label="Approved registrations"
          value={approvedParticipants.length}
        />
        <SummaryCard
          label="Matching participants"
          value={filteredParticipants.length}
        />
        <SummaryCard label="Unique programs" value={uniqueProgramsCount} />
      </div>

      <div className="mt-6">
        {sortedParticipants.length ? (
          <div className="w-full overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead className="bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  {participantTableColumns.map(({ column, label }) => (
                    <SortableHeader
                      key={column}
                      column={column}
                      label={label}
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedParticipants.map((participant) => (
                  <ParticipantRow
                    key={participant.participantId}
                    row={participant}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8 rounded-md border border-border p-6">
            <h2 className="text-xl font-extrabold text-foreground">
              No approved participants
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Try clearing filters to show the full approved participants list.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-md border border-border bg-muted/30 px-4 py-3">
      <p className="text-xs font-extrabold uppercase text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-extrabold text-foreground tabular-nums">
        {value.toLocaleString()}
      </p>
    </article>
  )
}

function SortableHeader({
  column,
  label,
  sortColumn,
  sortDirection,
  onSort,
}: {
  column: ParticipantTableColumn
  label: string
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSort: (column: SortColumn) => void
}) {
  if (isNonSortableColumn(column)) {
    return (
      <th scope="col" className="px-4 py-3 font-extrabold">
        <span className="text-xs text-muted-foreground uppercase">{label}</span>
      </th>
    )
  }

  return (
    <th scope="col" className="px-4 py-3 font-extrabold">
      <SortHeaderButton
        align="left"
        column={column}
        label={label}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      />
    </th>
  )
}

function SortHeaderButton({
  align = 'left',
  column,
  label,
  sortColumn,
  sortDirection,
  onSort,
}: {
  align?: 'left' | 'right'
  column: SortColumn
  label: string
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSort: (column: SortColumn) => void
}) {
  const isActive = column === sortColumn
  const Icon = isActive
    ? sortDirection === 'asc'
      ? ChevronUp
      : ChevronDown
    : ArrowUpDown

  return (
    <button
      type="button"
      className={`inline-flex min-h-8 w-full items-center gap-2 rounded-sm text-xs font-extrabold uppercase text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 ${
        align === 'right' ? 'justify-end' : 'justify-start'
      }`}
      onClick={() => onSort(column)}
    >
      {label}
      <Icon aria-hidden="true" className="size-3.5" />
    </button>
  )
}

function ParticipantRow({ row }: { row: ParticipantRow }) {
  return (
    <tr className="border-t border-border align-top">
      <td className="max-w-80 px-4 py-3 font-extrabold text-foreground">
        {row.participantName}
      </td>
      <td className="max-w-72 px-4 py-3">
        <p className="font-bold text-foreground">{row.guardianName}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {row.guardianEmail}
        </p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {row.guardianPhone}
        </p>
      </td>
      <td className="px-4 py-3">{row.programCode}</td>
      <td className="px-4 py-3 tabular-nums">{row.age.toLocaleString()}</td>
      <td className="px-4 py-3 tabular-nums">
        {row.gradeLevel.toLocaleString()}
      </td>
      <td className="px-4 py-3">{row.gender}</td>
      <td className="px-4 py-3">
        {dateFormatter.format(new Date(row.createdAt))}
      </td>
      <td className="px-4 py-3">
        <code className="rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground">
          {row.registrationId}
        </code>
      </td>
    </tr>
  )
}
