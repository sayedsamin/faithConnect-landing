import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'
import { guardianSignUpSchema } from '#/routes/-auth/auth-schemas'
import type { GuardianSignUpFormValues } from '#/routes/-auth/auth-schemas'
import { AuthErrorMessage } from './auth-message'
import { FormField } from './form-field'
import { PasswordField } from './password-field'
import { SubmitButton } from './submit-button'

type SignUpFormProps = {
  redirect?: string
}

export function SignUpForm({ redirect }: SignUpFormProps) {
  const navigate = useNavigate()
  const [isHydrated, setIsHydrated] = useState(false)
  const [formError, setFormError] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuardianSignUpFormValues>({
    resolver: zodResolver(guardianSignUpSchema),
    defaultValues: {
      guardianName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  async function onSubmit(values: GuardianSignUpFormValues) {
    setFormError('')
    setSubmittedEmail('')

    try {
      const supabase = getSupabaseBrowserClient()
      const emailRedirectUrl = new URL('/signin', window.location.origin)

      if (redirect) {
        emailRedirectUrl.searchParams.set('redirect', redirect)
      }

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: emailRedirectUrl.toString(),
          data: {
            app_role_hint: 'guardian',
            guardian_name: values.guardianName,
          },
        },
      })

      if (error) {
        setFormError(error.message)
        return
      }

      if (data.session && redirect) {
        await navigate({ to: redirect })
        return
      }

      setSubmittedEmail(values.email)
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Unable to create the account right now. Please try again.',
      )
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-extrabold text-foreground">
          Create account
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Use an email address you can access. We will send a confirmation link.
        </p>
      </div>

      <FormField
        label="Parent or guardian name"
        id="guardian-name"
        type="text"
        autoComplete="name"
        placeholder="Alex Morgan…"
        error={errors.guardianName?.message}
        {...register('guardianName')}
      />

      <FormField
        label="Email"
        id="signup-email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com…"
        error={errors.email?.message}
        {...register('email')}
      />

      <PasswordField
        label="Password"
        id="signup-password"
        autoComplete="new-password"
        placeholder="Create a password…"
        error={errors.password?.message}
        {...register('password')}
      />

      <PasswordField
        label="Confirm password"
        id="confirm-password"
        autoComplete="new-password"
        placeholder="Repeat your password…"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        isDisabled={!isHydrated || isSubmitting}
        idleLabel="Create account"
        busyLabel="Creating account…"
      />

      {formError ? <AuthErrorMessage>{formError}</AuthErrorMessage> : null}

      {submittedEmail ? (
        <p
          role="status"
          className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
        >
          Check {submittedEmail} to confirm your account.
        </p>
      ) : null}
    </form>
  )
}
