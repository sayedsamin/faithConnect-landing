import { Loader2, Pencil, Save, Trash2, X } from 'lucide-react'
import type {
  CommonStaffProfile,
  CommonStaffRole,
} from '#/portals/common/staff/schemas'
import { formatDate, formatRole } from './staff-utils'

type StaffEditState = {
  full_name: string
  phone: string
  role: CommonStaffRole
  staffId: string
}

type StaffManagementTableProps = {
  staff: CommonStaffProfile[]
  editingStaff: StaffEditState | null
  removingStaffId: string | null
  isUpdating: boolean
  onStartEdit: (staff: CommonStaffProfile) => void
  onCancelEdit: () => void
  onEditingFieldChange: (
    field: keyof Pick<StaffEditState, 'full_name' | 'phone' | 'role'>,
    value: string,
  ) => void
  onSave: () => void
  onRemove: (staff: CommonStaffProfile) => void
}

export function StaffManagementTable({
  staff,
  editingStaff,
  removingStaffId,
  isUpdating,
  onStartEdit,
  onCancelEdit,
  onEditingFieldChange,
  onSave,
  onRemove,
}: StaffManagementTableProps) {
  if (!staff.length) {
    return (
      <div className="mt-8 rounded-md border border-border p-6">
        <h2 className="text-xl font-extrabold text-foreground">No staff yet</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Supervisors and camp leaders will appear here once existing accounts
          are promoted.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-md border border-border">
      <table className="min-w-[920px] border-collapse text-left text-sm">
        <thead className="bg-muted text-xs uppercase text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-3 font-extrabold">
              Staff
            </th>
            <th scope="col" className="px-4 py-3 font-extrabold">
              Role
            </th>
            <th scope="col" className="px-4 py-3 font-extrabold">
              Phone
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
          {staff.map((item) => {
            const isEditing = editingStaff?.staffId === item.id

            return (
              <tr key={item.id} className="border-t border-border align-top">
                <td className="max-w-80 px-4 py-4">
                  {isEditing ? (
                    <input
                      type="text"
                      name={`staff-name-${item.id}`}
                      value={editingStaff.full_name}
                      placeholder="Full name…"
                      className="min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                      onChange={(event) =>
                        onEditingFieldChange('full_name', event.target.value)
                      }
                    />
                  ) : (
                    <>
                      <span className="block wrap-break-word font-bold text-foreground">
                        {item.full_name?.trim() || 'Unnamed staff'}
                      </span>
                      <span className="mt-1 block wrap-break-word text-xs text-muted-foreground">
                        {item.email}
                      </span>
                    </>
                  )}
                </td>
                <td className="px-4 py-4 font-semibold text-foreground">
                  {isEditing ? (
                    <select
                      name={`staff-role-${item.id}`}
                      value={editingStaff.role}
                      className="min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                      onChange={(event) =>
                        onEditingFieldChange(
                          'role',
                          event.target.value as CommonStaffRole,
                        )
                      }
                    >
                      <option value="supervisor">Supervisor</option>
                      <option value="camp_leader">Camp leader</option>
                    </select>
                  ) : (
                    formatRole(item.role)
                  )}
                </td>
                <td className="px-4 py-4 font-semibold text-foreground">
                  {isEditing ? (
                    <input
                      type="tel"
                      name={`staff-phone-${item.id}`}
                      value={editingStaff.phone}
                      placeholder="+1 204 555 0100…"
                      className="min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                      onChange={(event) =>
                        onEditingFieldChange('phone', event.target.value)
                      }
                    />
                  ) : (
                    item.phone?.trim() || (
                      <span className="text-muted-foreground">
                        No phone on file
                      </span>
                    )
                  )}
                </td>
                <td className="px-4 py-4 font-semibold text-foreground tabular-nums">
                  {formatDate(item.updated_at)}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          disabled={isUpdating}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-3 py-2 text-sm font-extrabold text-primary-foreground touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
                          onClick={onSave}
                        >
                          {isUpdating ? (
                            <Loader2
                              aria-hidden="true"
                              className="size-4 animate-spin"
                            />
                          ) : (
                            <Save aria-hidden="true" className="size-4" />
                          )}
                          Save
                        </button>
                        <button
                          type="button"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                          onClick={onCancelEdit}
                        >
                          <X aria-hidden="true" className="size-4" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                          onClick={() => onStartEdit(item)}
                        >
                          <Pencil aria-hidden="true" className="size-4" />
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={removingStaffId === item.id}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-3 py-2 text-sm font-extrabold text-destructive touch-manipulation hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
                          onClick={() => onRemove(item)}
                        >
                          {removingStaffId === item.id ? (
                            <Loader2
                              aria-hidden="true"
                              className="size-4 animate-spin"
                            />
                          ) : (
                            <Trash2 aria-hidden="true" className="size-4" />
                          )}
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
