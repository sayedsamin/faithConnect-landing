import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'
import { getDevImpersonationCredentials } from '#/lib/auth/dev-impersonator'
import type { ImpersonationRole } from '#/lib/auth/dev-impersonator'
import { getCurrentUserProfileRpc } from '#/lib/auth/profile-api'
import { getDashboardPathForRole } from '#/lib/auth/rbac'
import { getPostAuthRedirect } from '#/routes/-auth/redirect-search'
import { signInSchema } from '#/routes/-auth/auth-schemas'
import type { SignInFormValues } from '#/routes/-auth/auth-schemas'
import { AuthTextLink } from './auth-layout'
import { AuthErrorMessage } from './auth-message'
import { FormField } from './form-field'
import { PasswordField } from './password-field'
import { SubmitButton } from './submit-button'

type SignInFormProps = {
  redirect?: string
}

export function SignInForm({ redirect }: SignInFormProps) {
  const navigate = useNavigate()
  const [isHydrated, setIsHydrated] = useState(false)
  const [formError, setFormError] = useState('')
  const [isImpersonating, setIsImpersonating] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  async function onSubmit(values: SignInFormValues) {
    setFormError('')

    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        setFormError(error.message)
        return
      }

      const userId = data.user?.id

      if (!userId) {
        setFormError('Unable to find your account dashboard. Please try again.')
        return
      }

      const profile = await getCurrentUserProfileRpc()
      const role = profile?.role

      if (!role) {
        setFormError(
          'Unable to find your account dashboard. Please contact support.',
        )
        return
      }

      await navigate({
        to: getPostAuthRedirect(redirect, getDashboardPathForRole(role)),
      })
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Unable to sign in right now. Please try again.',
      )
    }
  }

  const devImpersonationRoles: Array<{
    value: ImpersonationRole
    label: string
  }> = import.meta.env.DEV
    ? [
        {
          value: 'superadmin',
          label: 'Superadmin',
        },
        {
          value: 'admin',
          label: 'Admin',
        },
        {
          value: 'supervisor',
          label: 'Supervisor',
        },
        {
          value: 'team_lead',
          label: 'Team Lead',
        },
        {
          value: 'guardian',
          label: 'Guardian',
        },
      ]
    : []

  async function handleImpersonate(role: ImpersonationRole) {
    if (!import.meta.env.DEV) {
      return
    }

    setFormError('')
    setIsImpersonating(true)

    try {
      const supabase = getSupabaseBrowserClient()
      const [credentialsResult] = await Promise.all([
        getDevImpersonationCredentials({ data: { role } }),
        supabase.auth.signOut(),
      ])

      const { email, password } = credentialsResult
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setFormError(error.message)
        return
      }

      if (!data.user?.id) {
        setFormError('Unable to find your account dashboard. Please try again.')
        return
      }

      const profile = await getCurrentUserProfileRpc()
      const roleFromProfile = profile?.role

      if (!roleFromProfile) {
        setFormError(
          'Unable to find your account dashboard. Please contact support.',
        )
        return
      }

      const dashboard = getDashboardPathForRole(roleFromProfile)

      await navigate({
        to: getPostAuthRedirect(redirect, dashboard),
      })
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Unable to sign in right now. Please try again.',
      )
    } finally {
      setIsImpersonating(false)
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-extrabold text-foreground">Sign in</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Use your Questura account email and password.
        </p>
      </div>

      <FormField
        label="Email"
        id="signin-email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com…"
        error={errors.email?.message}
        {...register('email')}
      />

      <PasswordField
        label="Password"
        id="signin-password"
        autoComplete="current-password"
        placeholder="Enter your password…"
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex justify-end">
        <AuthTextLink to="/forgot-password">Forgot password?</AuthTextLink>
      </div>

      <SubmitButton
        isSubmitting={isSubmitting}
        isDisabled={!isHydrated || isSubmitting}
        idleLabel="Sign in"
        busyLabel="Signing in…"
      />

      {devImpersonationRoles.length ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Dev impersonation</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {devImpersonationRoles.map((role) => (
              <button
                type="button"
                key={role.value}
                className="rounded-md border border-line bg-card px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50"
                onClick={() => void handleImpersonate(role.value)}
                disabled={isImpersonating}
              >
                Sign in as {role.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {formError ? <AuthErrorMessage>{formError}</AuthErrorMessage> : null}
    </form>
  )
}
