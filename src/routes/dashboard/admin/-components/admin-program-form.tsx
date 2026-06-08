import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarPlus, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCreateAdminProgramMutation } from '#/portals/admin/programs/mutations'
import { createAdminProgramInputSchema } from '#/portals/admin/programs/schemas'
import type { ReactNode } from 'react'
import type {
  CreateAdminProgramFormValues,
  CreateAdminProgramInput,
} from '#/portals/admin/programs/schemas'

const defaultValues = {
  name: '',
  description: '',
  minimum_age: 0,
  maximum_age: 17,
  start_date: '',
  end_date: '',
  location: '',
  capacity: 1,
  registration_status: 'closed',
  program_status: 'draft',
} satisfies CreateAdminProgramInput

export function AdminProgramForm() {
  const createProgramMutation = useCreateAdminProgramMutation()
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setFocus,
  } = useForm<CreateAdminProgramFormValues, unknown, CreateAdminProgramInput>({
    resolver: zodResolver(createAdminProgramInputSchema),
    defaultValues,
    shouldFocusError: true,
  })

  async function handleCreateProgram(values: CreateAdminProgramInput) {
    setStatusMessage(null)

    try {
      const program = await createProgramMutation.mutateAsync(values)
      reset(defaultValues)
      setFocus('name')
      setStatusMessage(`${program.name} was created successfully.`)
    } catch (error) {
      setStatusMessage(getErrorMessage(error, 'Unable to create that program.'))
    }
  }

  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div>
        <p className="island-kicker">Programs</p>
        <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
          New program
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Create a structured program offering for children and guardians.
        </p>
      </div>

      <form
        className="mt-8 grid gap-5"
        noValidate
        onSubmit={(event) => void handleSubmit(handleCreateProgram)(event)}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            error={errors.name?.message}
            htmlFor="program-name"
            label="Program name"
          >
            <input
              id="program-name"
              type="text"
              autoComplete="off"
              placeholder="Summer leadership camp…"
              className={inputClassName}
              aria-invalid={errors.name ? 'true' : 'false'}
              {...register('name')}
            />
          </Field>

          <Field
            error={errors.location?.message}
            htmlFor="program-location"
            label="Location"
          >
            <input
              id="program-location"
              type="text"
              autoComplete="street-address"
              placeholder="Questura Academy…"
              className={inputClassName}
              aria-invalid={errors.location ? 'true' : 'false'}
              {...register('location')}
            />
          </Field>
        </div>

        <Field
          error={errors.description?.message}
          htmlFor="program-description"
          label="Description"
        >
          <textarea
            id="program-description"
            rows={5}
            placeholder="Describe the program experience…"
            className={`${inputClassName} resize-y leading-6`}
            aria-invalid={errors.description ? 'true' : 'false'}
            {...register('description')}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.currentTarget.form?.requestSubmit()
              }
            }}
          />
        </Field>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Field
            error={errors.minimum_age?.message}
            htmlFor="minimum-age"
            label="Minimum age"
          >
            <input
              id="minimum-age"
              type="number"
              inputMode="numeric"
              min={0}
              className={inputClassName}
              aria-invalid={errors.minimum_age ? 'true' : 'false'}
              {...register('minimum_age', { valueAsNumber: true })}
            />
          </Field>

          <Field
            error={errors.maximum_age?.message}
            htmlFor="maximum-age"
            label="Maximum age"
          >
            <input
              id="maximum-age"
              type="number"
              inputMode="numeric"
              min={0}
              className={inputClassName}
              aria-invalid={errors.maximum_age ? 'true' : 'false'}
              {...register('maximum_age', { valueAsNumber: true })}
            />
          </Field>

          <Field
            error={errors.start_date?.message}
            htmlFor="start-date"
            label="Start date"
          >
            <input
              id="start-date"
              type="date"
              className={inputClassName}
              aria-invalid={errors.start_date ? 'true' : 'false'}
              {...register('start_date')}
            />
          </Field>

          <Field
            error={errors.end_date?.message}
            htmlFor="end-date"
            label="End date"
          >
            <input
              id="end-date"
              type="date"
              className={inputClassName}
              aria-invalid={errors.end_date ? 'true' : 'false'}
              {...register('end_date')}
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Field
            error={errors.capacity?.message}
            htmlFor="program-capacity"
            label="Capacity"
          >
            <input
              id="program-capacity"
              type="number"
              inputMode="numeric"
              min={1}
              className={inputClassName}
              aria-invalid={errors.capacity ? 'true' : 'false'}
              {...register('capacity', { valueAsNumber: true })}
            />
          </Field>

          <Field
            error={errors.registration_status?.message}
            htmlFor="registration-status"
            label="Registration status"
          >
            <select
              id="registration-status"
              className={inputClassName}
              aria-invalid={errors.registration_status ? 'true' : 'false'}
              {...register('registration_status')}
            >
              <option value="closed">Closed</option>
              <option value="open">Open</option>
              <option value="waitlist">Waitlist</option>
            </select>
          </Field>

          <Field
            error={errors.program_status?.message}
            htmlFor="program-status"
            label="Program status"
          >
            <select
              id="program-status"
              className={inputClassName}
              aria-invalid={errors.program_status ? 'true' : 'false'}
              {...register('program_status')}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
        </div>

        {statusMessage ? (
          <p
            aria-live="polite"
            className="rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground"
          >
            {statusMessage}
          </p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={createProgramMutation.isPending}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground touch-manipulation hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {createProgramMutation.isPending ? (
              <Loader2
                aria-hidden="true"
                className="size-4 animate-spin motion-reduce:animate-none"
              />
            ) : (
              <CalendarPlus aria-hidden="true" className="size-4" />
            )}
            Create program
          </button>
        </div>
      </form>
    </section>
  )
}

function Field({
  children,
  error,
  htmlFor,
  label,
}: {
  children: ReactNode
  error?: string
  htmlFor: string
  label: string
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="text-sm font-extrabold text-foreground"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-2 text-sm font-semibold text-destructive">{error}</p>
      ) : null}
    </div>
  )
}

const inputClassName =
  'min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50'

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback
}
