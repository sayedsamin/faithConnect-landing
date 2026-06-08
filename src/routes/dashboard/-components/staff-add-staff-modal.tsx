import { Loader2, UserPlus, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { BaseSyntheticEvent } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { AddCommonStaffInput } from '#/portals/common/staff/schemas'

type StaffAddStaffModalProps = {
  isOpen: boolean
  errors: FieldErrors<AddCommonStaffInput>
  handleSubmit: (event?: BaseSyntheticEvent) => Promise<void> | void
  isPending: boolean
  onClose: () => void
  register: UseFormRegister<AddCommonStaffInput>
}

export function StaffAddStaffModal({
  isOpen,
  errors,
  handleSubmit,
  isPending,
  onClose,
  register,
}: StaffAddStaffModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    dialogRef.current
      ?.querySelector<HTMLInputElement>('input[name="email"]')
      ?.focus()

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-shadow-grey/62 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center sm:items-center">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-staff-dialog-title"
          className="w-full max-w-xl rounded-md border border-border bg-background shadow-[0_20px_46px_rgba(0,0,0,0.32)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-b border-border bg-muted/60 p-5">
            <div className="flex items-center justify-between gap-4">
              <h2
                id="add-staff-dialog-title"
                className="text-xl font-extrabold"
              >
                Add staff member
              </h2>
              <button
                type="button"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                onClick={onClose}
                aria-label="Close add staff dialog"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
          <form
            className="grid gap-4 border-t border-border bg-background p-4 sm:p-5"
            onSubmit={(event) => void handleSubmit(event)}
          >
            <div className="min-w-0">
              <label
                htmlFor="staff-email"
                className="text-sm font-extrabold text-foreground"
              >
                Existing account email
              </label>
              <input
                id="staff-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="staff@example.com…"
                className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                {...register('email')}
              />
              {errors.email ? (
                <p className="mt-2 text-sm font-semibold text-destructive">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="staff-role"
                className="text-sm font-extrabold text-foreground"
              >
                Staff role
              </label>
              <select
                id="staff-role"
                className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                {...register('role')}
              >
                <option value="supervisor">Supervisor</option>
                <option value="camp_leader">Camp leader</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="order-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 sm:order-1"
                onClick={onClose}
              >
                <X aria-hidden="true" className="size-4" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="order-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70 sm:order-2"
              >
                {isPending ? (
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                ) : (
                  <UserPlus aria-hidden="true" className="size-4" />
                )}
                Add staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
