import type { RefObject } from 'react'
import { RefreshCcw, UserPlus } from 'lucide-react'

type StaffHeaderProps = {
  addButtonRef: RefObject<HTMLButtonElement | null>
  isRefreshing: boolean
  onRefresh: () => void
  onOpenAddModal: () => void
}

export function StaffHeader({
  addButtonRef,
  isRefreshing,
  onRefresh,
  onOpenAddModal,
}: StaffHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="island-kicker">Program Operations</p>
        <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
          Staff
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Promote existing accounts to supervisors or camp leaders and keep
          their program access current.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={isRefreshing}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-extrabold text-foreground touch-manipulation hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={onRefresh}
        >
          <RefreshCcw aria-hidden="true" className="size-4" />
          Refresh
        </button>
        <button
          ref={addButtonRef}
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          onClick={onOpenAddModal}
        >
          <UserPlus aria-hidden="true" className="size-4" />
          Add staff
        </button>
      </div>
    </div>
  )
}
