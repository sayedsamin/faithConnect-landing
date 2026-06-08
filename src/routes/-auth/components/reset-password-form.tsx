import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'
import { resetPasswordSchema } from '#/routes/-auth/auth-schemas'
import type { ResetPasswordFormValues } from '#/routes/-auth/auth-schemas'
import { AuthErrorMessage } from './auth-message'
import { PasswordField } from './password-field'
import { SubmitButton } from './submit-button'

export function ResetPasswordForm() {
  const navigate = useNavigate()
  const [isHydrated, setIsHydrated] = useState(false)
  const [isPreparingSession, setIsPreparingSession] = useState(true)
  const [formError, setFormError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    let isMounted = true
    let timeoutId: number | undefined
    let unsubscribe: (() => void) | undefined

    async function prepareRecoverySession() {
      setIsHydrated(true)

      try {
        const supabase = getSupabaseBrowserClient()
        const hashParams = new URLSearchParams(window.location.hash.slice(1))
        const errorDescription = hashParams.get('error_description')

        if (errorDescription) {
          throw new Error(errorDescription.replaceAll('+', ' '))
        }

        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (data.session) {
          if (isMounted) {
            setFormError('')
            setIsPreparingSession(false)
          }
          return
        }

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(
          (event: AuthChangeEvent, session: Session | null) => {
            if (!isMounted || event !== 'PASSWORD_RECOVERY' || !session) {
              return
            }

            if (timeoutId) {
              window.clearTimeout(timeoutId)
            }

            unsubscribe?.()
            setFormError('')
            setIsPreparingSession(false)
          },
        )

        unsubscribe = () => {
          subscription.unsubscribe()
        }

        timeoutId = window.setTimeout(() => {
          unsubscribe?.()

          if (isMounted) {
            setFormError(
              'Use the latest password reset email before choosing a new password.',
            )
            setIsPreparingSession(false)
          }
        }, 1500)
      } catch (error) {
        if (isMounted) {
          setFormError(
            error instanceof Error
              ? error.message
              : 'This password reset link is no longer valid.',
          )
          setIsPreparingSession(false)
        }
      }
    }

    void prepareRecoverySession()

    return () => {
      isMounted = false
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      unsubscribe?.()
    }
  }, [])

  async function onSubmit(values: ResetPasswordFormValues) {
    setFormError('')

    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      })

      if (error) {
        setFormError(error.message)
        return
      }

      await supabase.auth.signOut()
      await navigate({ to: '/signin', replace: true })
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Unable to update your password right now. Please try again.',
      )
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-extrabold text-foreground">
          Set new password
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pick something strong and different from your previous password.
        </p>
      </div>

      <PasswordField
        label="New password"
        id="reset-password"
        autoComplete="new-password"
        placeholder="Create a new password…"
        error={errors.password?.message}
        {...register('password')}
      />

      <PasswordField
        label="Confirm new password"
        id="reset-confirm-password"
        autoComplete="new-password"
        placeholder="Repeat your new password…"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <SubmitButton
        isSubmitting={isSubmitting || isPreparingSession}
        isDisabled={!isHydrated || isPreparingSession || isSubmitting}
        idleLabel="Update password"
        busyLabel={
          isPreparingSession ? 'Preparing reset…' : 'Updating password…'
        }
      />

      {formError ? <AuthErrorMessage>{formError}</AuthErrorMessage> : null}
    </form>
  )
}
