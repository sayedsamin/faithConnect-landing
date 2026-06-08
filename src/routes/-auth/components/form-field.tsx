import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormField({ label, error, id, ...props }: FormFieldProps) {
  const errorId = error && id ? `${id}-error` : undefined

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-bold text-foreground">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className="min-h-12 w-full rounded-md border border-input bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/40"
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm font-semibold text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
