import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  contactErrorResponseSchema,
  contactRequestSchema,
  contactResponseSchema,
} from '#/contracts/contact'
import type { InputHTMLAttributes } from 'react'
import type { ContactRequest } from '#/contracts/contact'

export const contactFormSchema = contactRequestSchema
type ContactFormValues = ContactRequest

const topicLabels: Record<ContactFormValues['topic'], string> = {
  general: 'General inquiry',
  programs: 'Programs',
  'summer-program': 'Summer Camp 2026',
  partnerships: 'Partnerships',
}

export function ContactForm() {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      topic: 'general',
      message: '',
    },
    shouldFocusError: true,
  })

  async function onSubmit(values: ContactFormValues) {
    setSubmitMessage(null)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const payload: unknown = await response.json()

      if (!response.ok) {
        const parsedError = contactErrorResponseSchema.safeParse(payload)
        setSubmitError(
          parsedError.success
            ? parsedError.data.error
            : 'Unable to send contact message',
        )
        return
      }

      const parsedResponse = contactResponseSchema.safeParse(payload)

      if (!parsedResponse.success) {
        setSubmitError('Unable to confirm contact message delivery')
        return
      }

      form.reset()
      setSubmitMessage('Your message has been sent.')
    } catch {
      setSubmitError('Unable to send contact message')
    }
  }

  const {
    formState: { errors, isSubmitting },
    register,
  } = form

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <ContactInput
          autoComplete="name"
          error={errors.name?.message}
          id="contact-name"
          label="Name"
          {...register('name')}
        />
        <ContactInput
          autoComplete="email"
          error={errors.email?.message}
          id="contact-email"
          inputMode="email"
          label="Email"
          spellCheck={false}
          type="email"
          {...register('email')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ContactInput
          autoComplete="tel"
          error={errors.phone?.message}
          id="contact-phone"
          inputMode="tel"
          label="Phone"
          type="tel"
          {...register('phone')}
        />

        <div className="space-y-2">
          <label
            className="text-sm font-bold text-foreground"
            htmlFor="contact-topic"
          >
            Topic
            <RequiredMarker />
          </label>
          <select
            id="contact-topic"
            className="min-h-12 w-full rounded-md border border-input bg-background px-4 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-ring/40"
            {...register('topic')}
          >
            {Object.entries(topicLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-bold text-foreground"
          htmlFor="contact-message"
        >
          Message
          <RequiredMarker />
        </label>
        <textarea
          id="contact-message"
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          aria-invalid={Boolean(errors.message)}
          className="min-h-40 w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/40"
          placeholder="Tell us what you would like help with…"
          {...register('message')}
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            className="text-sm font-semibold text-destructive"
          >
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-6" aria-live="polite">
          {submitMessage ? (
            <p className="text-sm font-semibold text-primary">
              {submitMessage}
            </p>
          ) : null}
          {submitError ? (
            <p className="text-sm font-semibold text-destructive">
              {submitError}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-shadow-grey px-5 text-sm font-extrabold text-brand-white shadow-[0_10px_18px_rgba(0,0,0,0.14)] transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-school-bus-yellow hover:text-shadow-grey focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-wait disabled:opacity-80 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {isSubmitting ? (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {isSubmitting ? 'Sending message' : 'Send message'}
        </button>
      </div>
    </form>
  )
}

type ContactInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  label: string
}

function ContactInput({ error, id, label, ...props }: ContactInputProps) {
  const errorId = error && id ? `${id}-error` : undefined

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-foreground" htmlFor={id}>
        {label}
        <RequiredMarker />
      </label>
      <input
        id={id}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
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

function RequiredMarker() {
  return (
    <span className="ml-1 text-destructive" aria-hidden="true">
      *
    </span>
  )
}
