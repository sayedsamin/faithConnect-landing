import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, Plus, Send, Trash2, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSubmitGuardianSummerProgramRegistrationMutation } from '#/portals/guardian/summer-program/mutations'
import { guardianSummerProgramRegistrationSchema } from '#/portals/guardian/summer-program/schemas'
import type { ReactNode } from 'react'
import type {
  GuardianSummerProgramRegistrationFormValues,
  GuardianSummerProgramRegistrationInput,
} from '#/portals/guardian/summer-program/schemas'

type GuardianIdentity = {
  name: string
  email: string
}

type SummerProgramRegistrationFormProps = {
  guardianIdentity: GuardianIdentity
}

const defaultParticipant = {
  first_name: '',
  last_name: '',
  age: 11,
  grade_level: 1,
  gender: '',
} satisfies GuardianSummerProgramRegistrationFormValues['participants'][number]

export function SummerProgramRegistrationForm({
  guardianIdentity,
}: SummerProgramRegistrationFormProps) {
  const navigate = useNavigate()
  const submitRegistrationMutation =
    useSubmitGuardianSummerProgramRegistrationMutation()
  const [statusError, setStatusError] = useState<string | null>(null)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<
    GuardianSummerProgramRegistrationFormValues,
    unknown,
    GuardianSummerProgramRegistrationInput
  >({
    resolver: zodResolver(guardianSummerProgramRegistrationSchema),
    defaultValues: {
      guardian_name: guardianIdentity.name,
      guardian_email: guardianIdentity.email,
      guardian_phone: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      notes: '',
      participants: [defaultParticipant],
      accept_terms: false,
    },
    shouldFocusError: true,
  })
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'participants',
  })
  const hasAcceptedTerms = watch('accept_terms')

  async function onSubmit(values: GuardianSummerProgramRegistrationInput) {
    setStatusError(null)

    try {
      await submitRegistrationMutation.mutateAsync(values)
      await navigate({ to: '/summer-program/registration-complete' })
    } catch (error) {
      setStatusError(
        error instanceof Error
          ? error.message
          : 'Unable to submit registration right now.',
      )
    }
  }

  const isSubmitting = submitRegistrationMutation.isPending

  return (
    <form
      className="grid gap-6"
      noValidate
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <section className="rounded-md border border-border bg-background/70 p-5">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <UserPlus aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold text-foreground">
              Guardian details
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Use contact information we can reach during registration review.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            error={errors.guardian_name?.message}
            htmlFor="guardian-name"
            label="Parent or guardian name"
          >
            <input
              id="guardian-name"
              autoComplete="name"
              className={inputClassName}
              placeholder="Alex Morgan..."
              {...register('guardian_name')}
            />
          </Field>

          <Field
            error={errors.guardian_email?.message}
            htmlFor="guardian-email"
            label="Email"
          >
            <input
              id="guardian-email"
              autoComplete="email"
              className={inputClassName}
              inputMode="email"
              placeholder="you@example.com..."
              spellCheck={false}
              type="email"
              {...register('guardian_email')}
            />
          </Field>

          <Field
            error={errors.guardian_phone?.message}
            htmlFor="guardian-phone"
            label="Phone"
          >
            <input
              id="guardian-phone"
              autoComplete="tel"
              className={inputClassName}
              inputMode="tel"
              placeholder="204-555-0198..."
              type="tel"
              {...register('guardian_phone')}
            />
          </Field>

          <Field
            error={errors.emergency_contact_name?.message}
            htmlFor="emergency-contact-name"
            label="Emergency contact optional"
          >
            <input
              id="emergency-contact-name"
              autoComplete="name"
              className={inputClassName}
              placeholder="Jamie Morgan..."
              {...register('emergency_contact_name')}
            />
          </Field>

          <Field
            error={errors.emergency_contact_phone?.message}
            htmlFor="emergency-contact-phone"
            label="Emergency contact phone optional"
          >
            <input
              id="emergency-contact-phone"
              autoComplete="tel"
              className={inputClassName}
              inputMode="tel"
              placeholder="204-555-0142..."
              type="tel"
              {...register('emergency_contact_phone')}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-md border border-border bg-background/70 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">
              Participants
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Add each youth you want to register for the free camp.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            onClick={() => append(defaultParticipant)}
          >
            <Plus aria-hidden="true" className="size-4" />
            Add participant
          </button>
        </div>

        {errors.participants?.root?.message ? (
          <p className="mt-4 text-sm font-semibold text-destructive">
            {errors.participants.root.message}
          </p>
        ) : null}

        <div className="mt-5 grid gap-5">
          {fields.map((field, index) => {
            const participantErrors = errors.participants?.[index]
            const participantNumber = index + 1

            return (
              <article
                key={field.id}
                className="rounded-md border border-border bg-muted/46 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-extrabold text-foreground">
                    Participant {participantNumber}
                  </h3>
                  <button
                    type="button"
                    className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-background text-foreground hover:border-destructive hover:text-destructive focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`Remove participant ${participantNumber}`}
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                  </button>
                </div>

                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <Field
                    error={participantErrors?.first_name?.message}
                    htmlFor={`participant-${field.id}-first-name`}
                    label="First name"
                  >
                    <input
                      id={`participant-${field.id}-first-name`}
                      autoComplete="given-name"
                      className={inputClassName}
                      placeholder="Taylor..."
                      {...register(`participants.${index}.first_name`)}
                    />
                  </Field>

                  <Field
                    error={participantErrors?.last_name?.message}
                    htmlFor={`participant-${field.id}-last-name`}
                    label="Last name"
                  >
                    <input
                      id={`participant-${field.id}-last-name`}
                      autoComplete="family-name"
                      className={inputClassName}
                      placeholder="Morgan..."
                      {...register(`participants.${index}.last_name`)}
                    />
                  </Field>

                  <Field
                    error={participantErrors?.age?.message}
                    htmlFor={`participant-${field.id}-age`}
                    label="Age"
                  >
                    <input
                      id={`participant-${field.id}-age`}
                      className={inputClassName}
                      inputMode="numeric"
                      max={17}
                      min={11}
                      type="number"
                      {...register(`participants.${index}.age`, {
                        valueAsNumber: true,
                      })}
                    />
                  </Field>

                  <Field
                    error={participantErrors?.grade_level?.message}
                    htmlFor={`participant-${field.id}-grade`}
                    label="Grade"
                  >
                    <input
                      id={`participant-${field.id}-grade`}
                      className={inputClassName}
                      inputMode="numeric"
                      max={12}
                      min={1}
                      type="number"
                      {...register(`participants.${index}.grade_level`, {
                        valueAsNumber: true,
                      })}
                    />
                  </Field>

                  <Field
                    error={participantErrors?.gender?.message}
                    htmlFor={`participant-${field.id}-gender`}
                    label="Gender"
                  >
                    <select
                      id={`participant-${field.id}-gender`}
                      className={inputClassName}
                      {...register(`participants.${index}.gender`)}
                    >
                      <option value="">Select gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </Field>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-md border border-border bg-background/70 p-5">
        <Field
          error={errors.notes?.message}
          htmlFor="registration-notes"
          label="Notes"
        >
          <textarea
            id="registration-notes"
            className={`${inputClassName} min-h-32 resize-y leading-6`}
            placeholder="Anything else Questura should know..."
            {...register('notes')}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.currentTarget.form?.requestSubmit()
              }
            }}
          />
        </Field>

        <div className="mt-5 grid gap-3">
          <CheckboxField
            error={errors.accept_terms?.message}
            htmlFor="accept-terms"
          >
            <input
              id="accept-terms"
              className="size-5 shrink-0 accent-primary"
              type="checkbox"
              {...register('accept_terms')}
            />
            <span>
              I agree to the{' '}
              <Link
                to="/terms"
                className="font-extrabold text-primary underline underline-offset-4"
                target="_blank"
              >
                Terms and Conditions
              </Link>
              .
            </span>
          </CheckboxField>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-6" aria-live="polite">
          {statusError ? (
            <p className="text-sm font-semibold text-destructive">
              {statusError}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !hasAcceptedTerms}
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-shadow-grey px-5 text-sm font-extrabold text-brand-white shadow-[0_10px_18px_rgba(0,0,0,0.14)] transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-school-bus-yellow hover:text-shadow-grey focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-wait disabled:opacity-80 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {isSubmitting ? (
            <Loader2
              aria-hidden="true"
              className="size-4 animate-spin motion-reduce:animate-none"
            />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {isSubmitting ? 'Submitting registration...' : 'Submit registration'}
        </button>
      </div>
    </form>
  )
}

function CheckboxField({
  children,
  error,
  htmlFor,
}: {
  children: ReactNode
  error?: string
  htmlFor: string
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex min-h-11 cursor-pointer items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm font-semibold leading-6 text-foreground"
      >
        {children}
      </label>
      {error ? (
        <p className="mt-2 text-sm font-semibold text-destructive">{error}</p>
      ) : null}
    </div>
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
  'min-h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground touch-manipulation placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50'
