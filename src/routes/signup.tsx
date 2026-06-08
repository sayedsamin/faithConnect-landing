import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout, AuthTextLink } from '#/routes/-auth/components/auth-layout'
import { SignUpForm } from '#/routes/-auth/components/sign-up-form'
import { authRedirectSearchSchema } from '#/routes/-auth/redirect-search'

export const Route = createFileRoute('/signup')({
  validateSearch: authRedirectSearchSchema,
  component: SignUpPage,
  head: () => ({
    meta: [{ title: 'Create Account | Questura' }],
  }),
})

function SignUpPage() {
  const { redirect } = Route.useSearch()

  return (
    <AuthLayout
      eyebrow="Create Account"
      title="Start your Questura account."
      description="Create an account to manage your family profile, registrations, and program updates in one secure place."
      footer={
        <>
          Already have an account?{' '}
          <AuthTextLink
            to="/signin"
            search={redirect ? { redirect } : undefined}
          >
            Sign in
          </AuthTextLink>
        </>
      }
    >
      <SignUpForm redirect={redirect} />
    </AuthLayout>
  )
}
