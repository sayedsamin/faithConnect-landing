import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'
import { forgotPasswordSchema } from '#/routes/-auth/auth-schemas'
import type { ForgotPasswordFormValues } from '#/routes/-auth/auth-schemas'
import { AuthErrorMessage } from './auth-message'
import { FormField } from './form-field'
import { SubmitButton } from './submit-button'

export function ForgotPasswordForm() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [formError, setFormError] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  async function onSubmit(values: ForgotPasswordFormValues) {
    setFormError('')
    setSubmittedEmail('')

    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      )

      if (error) {
        setFormError(error.message)
        return
      }

      setSubmittedEmail(values.email)
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Unable to send reset instructions right now. Please try again.',
      )
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-extrabold text-foreground">
          Reset password
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter your account email and we will send reset instructions.
        </p>
      </div>

      <FormField
        label="Email"
        id="forgot-email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com…"
        error={errors.email?.message}
        {...register('email')}
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        isDisabled={!isHydrated || isSubmitting}
        idleLabel="Send reset instructions"
        busyLabel="Sending instructions…"
      />

      {formError ? <AuthErrorMessage>{formError}</AuthErrorMessage> : null}

      {submittedEmail ? (
        <p
          role="status"
          className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
        >
          Reset instructions were sent to {submittedEmail}.
        </p>
      ) : null}
    </form>
  )
}
