import { useRef, useState } from 'react'
import type { BaseSyntheticEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
  useAddCommonStaffMutation,
  useRemoveCommonStaffMutation,
  useUpdateCommonStaffMutation,
} from '#/portals/common/staff/mutations'
import { commonStaffQueryOptions } from '#/portals/common/staff/queries'
import {
  addCommonStaffInputSchema,
  updateCommonStaffInputSchema,
} from '#/portals/common/staff/schemas'
import type {
  AddCommonStaffInput,
  CommonStaffProfile,
  CommonStaffRole,
} from '#/portals/common/staff/schemas'
import { StaffAddStaffModal } from './staff-add-staff-modal'
import { StaffHeader } from './staff-management-header'
import { StaffManagementTable } from './staff-management-table'
import { StaffSummaryCards } from './staff-summary-cards'
import { formatRole, getErrorMessage } from './staff-utils'

type StaffEditState = {
  full_name: string
  phone: string
  role: CommonStaffRole
  staffId: string
}

export function StaffManagementPanel() {
  const staffQuery = useQuery(commonStaffQueryOptions())
  const addStaffMutation = useAddCommonStaffMutation()
  const updateStaffMutation = useUpdateCommonStaffMutation()
  const removeStaffMutation = useRemoveCommonStaffMutation()

  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [editingStaff, setEditingStaff] = useState<StaffEditState | null>(null)
  const [removingStaffId, setRemovingStaffId] = useState<string | null>(null)
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false)
  const addStaffTriggerRef = useRef<HTMLButtonElement | null>(null)

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<AddCommonStaffInput>({
    resolver: zodResolver(addCommonStaffInputSchema),
    defaultValues: {
      email: '',
      role: 'supervisor',
    },
    shouldFocusError: true,
  })

  const data = staffQuery.data ?? { staff: [], total: 0 }

  async function handleAddStaff(values: AddCommonStaffInput) {
    setStatusMessage(null)
    try {
      const staff = await addStaffMutation.mutateAsync(values)
      reset()
      setIsAddStaffModalOpen(false)
      setStatusMessage(`${staff.email} is now a ${formatRole(staff.role)}.`)
    } catch (error) {
      setStatusMessage(getErrorMessage(error, 'Unable to add that staff user.'))
    }
  }

  function handleOpenAddStaffModal() {
    reset()
    setStatusMessage(null)
    setIsAddStaffModalOpen(true)
  }

  function handleCloseAddStaffModal() {
    setIsAddStaffModalOpen(false)
    addStaffTriggerRef.current?.focus()
  }

  async function handleUpdateStaff() {
    if (!editingStaff) {
      return
    }

    setStatusMessage(null)
    try {
      const input = updateCommonStaffInputSchema.parse({
        staffId: editingStaff.staffId,
        full_name: editingStaff.full_name,
        phone: editingStaff.phone,
        role: editingStaff.role,
      })
      const staff = await updateStaffMutation.mutateAsync(input)
      setEditingStaff(null)
      setStatusMessage(`${staff.email} was updated.`)
    } catch (error) {
      setStatusMessage(
        getErrorMessage(error, 'Unable to update that staff user.'),
      )
    }
  }

  async function handleRemoveStaff(staff: CommonStaffProfile) {
    const staffName = staff.full_name?.trim() || staff.email
    const confirmed = window.confirm(
      `Remove program staff access for ${staffName}? This will move the account back to guardian access.`,
    )

    if (!confirmed) {
      return
    }

    setStatusMessage(null)
    setRemovingStaffId(staff.id)

    try {
      await removeStaffMutation.mutateAsync({ staffId: staff.id })
      setStatusMessage(`${staff.email} was moved back to guardian access.`)
    } catch (error) {
      setStatusMessage(
        getErrorMessage(error, 'Unable to remove that staff user.'),
      )
    } finally {
      setRemovingStaffId(null)
    }
  }

  function handleStartEdit(staff: CommonStaffProfile) {
    setEditingStaff({
      staffId: staff.id,
      full_name: staff.full_name ?? '',
      phone: staff.phone ?? '',
      role: staff.role,
    })
  }

  function handleEditingFieldChange(
    field: keyof Pick<StaffEditState, 'full_name' | 'phone' | 'role'>,
    value: string,
  ) {
    setEditingStaff((prev) =>
      prev === null
        ? prev
        : {
            ...prev,
            [field]: value,
          },
    )
  }

  if (staffQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading staff…
      </p>
    )
  }

  if (staffQuery.isError) {
    return (
      <section
        role="alert"
        className="rounded-md border border-destructive bg-background p-6 text-sm font-semibold text-destructive"
      >
        Unable to load program staff.
      </section>
    )
  }

  const totalSupervisors = data.staff.filter(
    (staff) => staff.role === 'supervisor',
  ).length
  const totalCampLeaders = data.staff.filter(
    (staff) => staff.role === 'camp_leader',
  ).length

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <StaffHeader
        addButtonRef={addStaffTriggerRef}
        isRefreshing={staffQuery.isRefetching}
        onRefresh={() => void staffQuery.refetch()}
        onOpenAddModal={handleOpenAddStaffModal}
      />

      <StaffAddStaffModal
        isOpen={isAddStaffModalOpen}
        errors={errors}
        handleSubmit={(event?: BaseSyntheticEvent) =>
          void handleSubmit(handleAddStaff)(event)
        }
        isPending={addStaffMutation.isPending}
        onClose={handleCloseAddStaffModal}
        register={register}
      />

      {statusMessage ? (
        <p
          aria-live="polite"
          className="mt-4 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground"
        >
          {statusMessage}
        </p>
      ) : null}

      <StaffSummaryCards
        total={data.total}
        supervisors={totalSupervisors}
        campLeaders={totalCampLeaders}
      />

      <StaffManagementTable
        staff={data.staff}
        editingStaff={editingStaff}
        removingStaffId={removingStaffId}
        isUpdating={updateStaffMutation.isPending}
        onStartEdit={handleStartEdit}
        onCancelEdit={() => setEditingStaff(null)}
        onEditingFieldChange={handleEditingFieldChange}
        onSave={() => void handleUpdateStaff()}
        onRemove={handleRemoveStaff}
      />
    </section>
  )
}
