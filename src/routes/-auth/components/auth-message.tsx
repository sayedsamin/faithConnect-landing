import type { ReactNode } from 'react'

export function AuthErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      data-tone="destructive"
      className="rounded-md border px-4 py-3 text-sm font-semibold"
      style={{
        background: 'color-mix(in oklab, var(--destructive) 12%, var(--white))',
        borderColor: 'color-mix(in oklab, var(--destructive) 48%, var(--line))',
        color: 'color-mix(in oklab, var(--destructive) 78%, black)',
      }}
    >
      {children}
    </p>
  )
}
