import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Loader2, RefreshCcw, Trash2, UserPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  useAddSuperadminAdminMutation,
  useRemoveSuperadminAdminMutation,
} from '#/portals/superadmin/admins/mutations'
import { superadminAdminsQueryOptions } from '#/portals/superadmin/admins/queries'
import { addSuperadminAdminInputSchema } from '#/portals/superadmin/admins/schemas'
import type {
  AddSuperadminAdminInput,
  SuperadminAdminProfile,
} from '#/portals/superadmin/admins/schemas'

export function AdminRolesPanel() {
  const adminsQuery = useQuery(superadminAdminsQueryOptions())
  const addAdminMutation = useAddSuperadminAdminMutation()
  const removeAdminMutation = useRemoveSuperadminAdminMutation()
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [removingAdminId, setRemovingAdminId] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<AddSuperadminAdminInput>({
    resolver: zodResolver(addSuperadminAdminInputSchema),
    defaultValues: {
      email: '',
    },
    shouldFocusError: true,
  })

  async function handleAddAdmin(values: AddSuperadminAdminInput) {
    setStatusMessage(null)

    try {
      const admin = await addAdminMutation.mutateAsync(values)
      reset()
      setStatusMessage(`${admin.email} is now an admin.`)
    } catch (error) {
      setStatusMessage(getErrorMessage(error, 'Unable to add that admin.'))
    }
  }

  async function handleRemoveAdmin(admin: SuperadminAdminProfile) {
    const adminName = admin.full_name?.trim() || admin.email
    const confirmed = window.confirm(
      `Remove admin access for ${adminName}? This will move the account back to guardian access.`,
    )

    if (!confirmed) {
      return
    }

    setStatusMessage(null)
    setRemovingAdminId(admin.id)

    try {
      await removeAdminMutation.mutateAsync({ adminId: admin.id })
      setStatusMessage(`${admin.email} was moved back to guardian access.`)
    } catch (error) {
      setStatusMessage(getErrorMessage(error, 'Unable to remove that admin.'))
    } finally {
      setRemovingAdminId(null)
    }
  }

  if (adminsQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading admins…
      </p>
    )
  }

  if (adminsQuery.isError) {
    return (
      <section
        role="alert"
        className="rounded-md border border-destructive bg-background p-6 text-sm font-semibold text-destructive"
      >
        Unable to load admins.
      </section>
    )
  }

  const data = adminsQuery.data ?? { admins: [], total: 0 }
  const admins = data.admins
  const total = data.total

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">User Management</p>
          <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
            Roles
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            Review platform administrators and their account details.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          onClick={() => void adminsQuery.refetch()}
        >
          <RefreshCcw aria-hidden="true" className="size-4" />
          Refresh
        </button>
      </div>

      <form
        className="mt-8 grid gap-4 rounded-md border border-border bg-muted/30 p-4 md:grid-cols-[minmax(0,1fr)_auto]"
        onSubmit={(event) => void handleSubmit(handleAddAdmin)(event)}
      >
        <div className="min-w-0">
          <label
            htmlFor="admin-email"
            className="text-sm font-extrabold text-foreground"
          >
            Add existing account as admin
          </label>
          <input
            id="admin-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="admin@example.com…"
            className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            {...register('email')}
          />
          {errors.email ? (
            <p className="mt-2 text-sm font-semibold text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={addAdminMutation.isPending}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-end rounded-md border border-primary bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {addAdminMutation.isPending ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <UserPlus aria-hidden="true" className="size-4" />
          )}
          Add admin
        </button>
      </form>

      {statusMessage ? (
        <p
          aria-live="polite"
          className="mt-4 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground"
        >
          {statusMessage}
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-md border border-border p-5">
          <p className="text-sm font-bold text-muted-foreground">Admins</p>
          <p className="mt-3 text-3xl font-extrabold text-foreground tabular-nums">
            {total.toLocaleString()}
          </p>
        </article>
      </div>

      {admins.length ? (
        <div className="mt-8 overflow-x-auto rounded-md border border-border">
          <table className="min-w-215 border-collapse text-left text-sm">
            <thead className="bg-muted text-xs uppercase text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-extrabold">
                  Admin
                </th>
                <th scope="col" className="px-4 py-3 font-extrabold">
                  Phone
                </th>
                <th scope="col" className="px-4 py-3 font-extrabold">
                  Created
                </th>
                <th scope="col" className="px-4 py-3 font-extrabold">
                  Updated
                </th>
                <th scope="col" className="px-4 py-3 text-right font-extrabold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <AdminRow
                  admin={admin}
                  isRemoving={removingAdminId === admin.id}
                  key={admin.id}
                  onRemove={handleRemoveAdmin}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-border p-6">
          <h2 className="text-xl font-extrabold text-foreground">
            No admins yet
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Admin accounts will appear here once they are added to Questura.
          </p>
        </div>
      )}
    </section>
  )
}

function AdminRow({
  admin,
  isRemoving,
  onRemove,
}: {
  admin: SuperadminAdminProfile
  isRemoving: boolean
  onRemove: (admin: SuperadminAdminProfile) => void
}) {
  return (
    <tr className="border-t border-border align-top">
      <td className="max-w-80 px-4 py-4">
        <span className="block wrap-break-word font-bold text-foreground">
          {admin.full_name?.trim() || 'Unnamed admin'}
        </span>
        <span className="mt-1 block wrap-break-word text-xs text-muted-foreground">
          {admin.email}
        </span>
      </td>
      <td className="px-4 py-4 font-semibold text-foreground">
        {admin.phone?.trim() || (
          <span className="text-muted-foreground">No phone on file</span>
        )}
      </td>
      <td className="px-4 py-4 font-semibold text-foreground tabular-nums">
        {formatDate(admin.created_at)}
      </td>
      <td className="px-4 py-4 font-semibold text-foreground tabular-nums">
        {formatDate(admin.updated_at)}
      </td>
      <td className="px-4 py-4 text-right">
        <button
          type="button"
          disabled={isRemoving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-3 py-2 text-sm font-extrabold text-destructive touch-manipulation hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={() => onRemove(admin)}
        >
          {isRemoving ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Trash2 aria-hidden="true" className="size-4" />
          )}
          Remove
        </button>
      </td>
    </tr>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback
}
