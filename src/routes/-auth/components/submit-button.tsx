interface SubmitButtonProps {
  isSubmitting: boolean
  isDisabled?: boolean
  idleLabel: string
  busyLabel: string
}

export function SubmitButton({
  isSubmitting,
  isDisabled = false,
  idleLabel,
  busyLabel,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-shadow-grey px-5 text-base font-extrabold text-brand-white shadow-[0_10px_18px_rgba(0,0,0,0.14)] hover:bg-shadow-grey focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-wait disabled:opacity-80"
    >
      {isSubmitting ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {isSubmitting ? busyLabel : idleLabel}
    </button>
  )
}
