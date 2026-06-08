import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function PasswordField({
  label,
  error,
  id,
  ...props
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const errorId = error && id ? `${id}-error` : undefined
  const Icon = isVisible ? EyeOff : Eye

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-bold text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className="min-h-12 w-full rounded-md border border-input bg-background px-4 pr-12 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/40"
          {...props}
        />
        <button
          type="button"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className="absolute top-1/2 right-2 inline-flex min-h-10 min-w-10 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          onClick={() => setIsVisible((current) => !current)}
        >
          <Icon aria-hidden="true" className="size-5" />
        </button>
      </div>
      {error ? (
        <p id={errorId} className="text-sm font-semibold text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
