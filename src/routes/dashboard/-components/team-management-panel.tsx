import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Loader2,
  Pencil,
  RefreshCcw,
  Save,
  Trash2,
  UsersRound,
  X,
} from 'lucide-react'
import {
  useCreateCommonTeamMutation,
  useDeleteCommonTeamMutation,
  useUpdateCommonTeamMutation,
} from '#/portals/common/teams/mutations'
import { commonTeamsQueryOptions } from '#/portals/common/teams/queries'
import {
  createCommonTeamInputSchema,
  updateCommonTeamInputSchema,
} from '#/portals/common/teams/schemas'
import type {
  CommonAssignableCampLeader,
  CommonTeam,
  CreateCommonTeamInput,
} from '#/portals/common/teams/schemas'

type TeamFormState = {
  camp_leader_ids: string[]
  capacity: string
  description: string
  name: string
  program_id: string
}

const emptyForm: TeamFormState = {
  camp_leader_ids: [],
  capacity: '',
  description: '',
  name: '',
  program_id: '',
}

export function TeamManagementPanel() {
  const teamsQuery = useQuery(commonTeamsQueryOptions())
  const createTeamMutation = useCreateCommonTeamMutation()
  const updateTeamMutation = useUpdateCommonTeamMutation()
  const deleteTeamMutation = useDeleteCommonTeamMutation()
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
  const [deletingTeamId, setDeletingTeamId] = useState<string | null>(null)
  const [form, setForm] = useState<TeamFormState>(emptyForm)

  const data = teamsQuery.data ?? {
    camp_leaders: [],
    programs: [],
    teams: [],
  }

  useEffect(() => {
    if (!form.program_id && data.programs[0]?.id) {
      setForm((current) => ({
        ...current,
        program_id: data.programs[0].id,
      }))
    }
  }, [data.programs, form.program_id])

  const selectedProgram = data.programs.find(
    (program) => program.id === form.program_id,
  )

  const teamsByProgram = useMemo(
    () =>
      data.programs.map((program) => ({
        program,
        teams: data.teams.filter((team) => team.program_id === program.id),
      })),
    [data.programs, data.teams],
  )

  async function handleSubmitTeam() {
    setStatusMessage(null)

    try {
      const baseInput = toTeamInput(form)

      if (editingTeamId) {
        const input = updateCommonTeamInputSchema.parse({
          ...baseInput,
          teamId: editingTeamId,
        })
        const team = await updateTeamMutation.mutateAsync(input)
        setStatusMessage(`${team.name} was updated.`)
      } else {
        const input = createCommonTeamInputSchema.parse(baseInput)
        const team = await createTeamMutation.mutateAsync(input)
        setStatusMessage(`${team.name} was created.`)
      }

      resetForm(data.programs[0]?.id ?? '')
    } catch (error) {
      setStatusMessage(getErrorMessage(error, 'Unable to save that team.'))
    }
  }

  async function handleDeleteTeam(team: CommonTeam) {
    const confirmed = window.confirm(
      `Delete ${team.name}? This will remove camp leader assignments for this team.`,
    )

    if (!confirmed) {
      return
    }

    setStatusMessage(null)
    setDeletingTeamId(team.id)

    try {
      await deleteTeamMutation.mutateAsync({ teamId: team.id })
      setStatusMessage(`${team.name} was deleted.`)
    } catch (error) {
      setStatusMessage(getErrorMessage(error, 'Unable to delete that team.'))
    } finally {
      setDeletingTeamId(null)
    }
  }

  function startEditing(team: CommonTeam) {
    setEditingTeamId(team.id)
    setStatusMessage(null)
    setForm({
      camp_leader_ids: team.camp_leaders.map((leader) => leader.id),
      capacity: team.capacity?.toString() ?? '',
      description: team.description ?? '',
      name: team.name,
      program_id: team.program_id,
    })
  }

  function resetForm(programId = form.program_id) {
    setEditingTeamId(null)
    setForm({
      ...emptyForm,
      program_id: programId,
    })
  }

  if (teamsQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading teams…
      </p>
    )
  }

  if (teamsQuery.isError) {
    return (
      <section
        role="alert"
        className="rounded-md border border-destructive bg-background p-6 text-sm font-semibold text-destructive"
      >
        Unable to load teams.
      </section>
    )
  }

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">Program Operations</p>
          <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
            Teams
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            Create program teams, assign camp leaders, and review program
            supervisor context.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          onClick={() => void teamsQuery.refetch()}
        >
          <RefreshCcw aria-hidden="true" className="size-4" />
          Refresh
        </button>
      </div>

      <div className="mt-8 rounded-md border border-border bg-muted/30 p-4">
        <h2 className="text-lg font-extrabold text-foreground">
          {editingTeamId ? 'Edit team' : 'Create team'}
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-foreground">
            <span>Program</span>
            <select
              value={form.program_id}
              className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              onChange={(event) =>
                setForm({ ...form, program_id: event.target.value })
              }
            >
              {data.programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-foreground">
            <span>Team name</span>
            <input
              type="text"
              value={form.name}
              placeholder="Team A…"
              className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-foreground lg:col-span-2">
            <span>Description</span>
            <textarea
              value={form.description}
              placeholder="Optional team notes…"
              rows={3}
              className="min-h-24 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                  void handleSubmitTeam()
                }
              }}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-foreground">
            <span>Capacity</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={form.capacity}
              placeholder="Optional…"
              className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              onChange={(event) =>
                setForm({ ...form, capacity: event.target.value })
              }
            />
          </label>
          <div className="rounded-md border border-border bg-background p-4">
            <p className="text-sm font-extrabold text-foreground">
              Program supervisors
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {selectedProgram?.assigned_supervisors.length
                ? selectedProgram.assigned_supervisors.join(', ')
                : 'No supervisors assigned to this program yet.'}
            </p>
          </div>
        </div>

        <fieldset className="mt-4 rounded-md border border-border bg-background p-4">
          <legend className="px-1 text-sm font-extrabold text-foreground">
            Camp leaders
          </legend>
          {data.camp_leaders.length ? (
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {data.camp_leaders.map((leader) => (
                <CampLeaderCheckbox
                  key={leader.id}
                  leader={leader}
                  selectedIds={form.camp_leader_ids}
                  onChange={(selectedIds) =>
                    setForm({ ...form, camp_leader_ids: selectedIds })
                  }
                />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Add camp leaders in Staff before assigning them to teams.
            </p>
          )}
        </fieldset>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={
              createTeamMutation.isPending ||
              updateTeamMutation.isPending ||
              !data.programs.length
            }
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
            onClick={() => void handleSubmitTeam()}
          >
            {createTeamMutation.isPending || updateTeamMutation.isPending ? (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            ) : editingTeamId ? (
              <Save aria-hidden="true" className="size-4" />
            ) : (
              <UsersRound aria-hidden="true" className="size-4" />
            )}
            {editingTeamId ? 'Save team' : 'Create team'}
          </button>
          {editingTeamId ? (
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              onClick={() => resetForm(data.programs[0]?.id ?? '')}
            >
              <X aria-hidden="true" className="size-4" />
              Cancel
            </button>
          ) : null}
        </div>
      </div>

      {statusMessage ? (
        <p
          aria-live="polite"
          className="mt-4 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground"
        >
          {statusMessage}
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Programs" value={data.programs.length} />
        <SummaryCard label="Teams" value={data.teams.length} />
        <SummaryCard label="Camp leaders" value={data.camp_leaders.length} />
      </div>

      <div className="mt-8 grid gap-6">
        {teamsByProgram.length ? (
          teamsByProgram.map(({ program, teams }) => (
            <section
              key={program.id}
              className="rounded-md border border-border p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">
                    {program.name}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Supervisors:{' '}
                    {program.assigned_supervisors.length
                      ? program.assigned_supervisors.join(', ')
                      : 'None assigned'}
                  </p>
                </div>
                <span className="inline-flex min-h-7 w-fit items-center rounded-md border border-border bg-muted px-3 text-xs font-extrabold uppercase text-foreground">
                  {teams.length.toLocaleString()} teams
                </span>
              </div>

              {teams.length ? (
                <div className="mt-4 overflow-x-auto rounded-md border border-border">
                  <table className="min-w-[860px] border-collapse text-left text-sm">
                    <thead className="bg-muted text-xs uppercase text-muted-foreground">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-extrabold">
                          Team
                        </th>
                        <th scope="col" className="px-4 py-3 font-extrabold">
                          Camp leaders
                        </th>
                        <th scope="col" className="px-4 py-3 font-extrabold">
                          Capacity
                        </th>
                        <th scope="col" className="px-4 py-3 font-extrabold">
                          Participants
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-extrabold"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team) => (
                        <tr
                          key={team.id}
                          className="border-t border-border align-top"
                        >
                          <td className="max-w-80 px-4 py-4">
                            <span className="block wrap-break-word font-bold text-foreground">
                              {team.name}
                            </span>
                            {team.description ? (
                              <span className="mt-1 block wrap-break-word text-xs leading-5 text-muted-foreground">
                                {team.description}
                              </span>
                            ) : null}
                          </td>
                          <td className="max-w-80 px-4 py-4 font-semibold text-foreground">
                            {team.camp_leaders.length
                              ? team.camp_leaders
                                  .map(
                                    (leader) =>
                                      leader.full_name?.trim() || leader.email,
                                  )
                                  .join(', ')
                              : 'No camp leaders assigned'}
                          </td>
                          <td className="px-4 py-4 font-semibold text-foreground tabular-nums">
                            {team.capacity?.toLocaleString() ?? 'No limit'}
                          </td>
                          <td className="px-4 py-4 font-semibold text-foreground tabular-nums">
                            {team.participant_count.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                                onClick={() => startEditing(team)}
                              >
                                <Pencil aria-hidden="true" className="size-4" />
                                Edit
                              </button>
                              <button
                                type="button"
                                disabled={deletingTeamId === team.id}
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-3 py-2 text-sm font-extrabold text-destructive touch-manipulation hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
                                onClick={() => void handleDeleteTeam(team)}
                              >
                                {deletingTeamId === team.id ? (
                                  <Loader2
                                    aria-hidden="true"
                                    className="size-4 animate-spin"
                                  />
                                ) : (
                                  <Trash2
                                    aria-hidden="true"
                                    className="size-4"
                                  />
                                )}
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 rounded-md border border-border bg-muted/30 px-4 py-3 text-sm font-semibold text-muted-foreground">
                  No teams have been created for this program yet.
                </p>
              )}
            </section>
          ))
        ) : (
          <div className="rounded-md border border-border p-6">
            <h2 className="text-xl font-extrabold text-foreground">
              No programs available
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Teams can be created once you have access to at least one program.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function CampLeaderCheckbox({
  leader,
  onChange,
  selectedIds,
}: {
  leader: CommonAssignableCampLeader
  onChange: (selectedIds: string[]) => void
  selectedIds: string[]
}) {
  const isChecked = selectedIds.includes(leader.id)

  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm font-semibold text-foreground touch-manipulation">
      <input
        type="checkbox"
        checked={isChecked}
        className="size-4"
        onChange={(event) => {
          if (event.target.checked) {
            onChange([...selectedIds, leader.id])
            return
          }

          onChange(selectedIds.filter((selectedId) => selectedId !== leader.id))
        }}
      />
      <span className="min-w-0">
        <span className="block truncate">
          {leader.full_name?.trim() || 'Unnamed camp leader'}
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          {leader.email}
        </span>
      </span>
    </label>
  )
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-md border border-border p-5">
      <p className="text-sm font-bold text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-extrabold text-foreground tabular-nums">
        {value.toLocaleString()}
      </p>
    </article>
  )
}

function toTeamInput(form: TeamFormState): CreateCommonTeamInput {
  return {
    program_id: form.program_id,
    name: form.name,
    description: form.description,
    capacity: form.capacity.trim() ? Number(form.capacity) : null,
    camp_leader_ids: form.camp_leader_ids,
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback
}
