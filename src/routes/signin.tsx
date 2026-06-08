import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout, AuthTextLink } from '#/routes/-auth/components/auth-layout'
import { SignInForm } from '#/routes/-auth/components/sign-in-form'
import { authRedirectSearchSchema } from '#/routes/-auth/redirect-search'

const summerProgramRegistrationPath = '/summer-program/register'

export const Route = createFileRoute('/signin')({
  validateSearch: authRedirectSearchSchema,
  component: SignInPage,
  head: () => ({
    meta: [{ title: 'Sign In | Questura' }],
  }),
})

function SignInPage() {
  const { redirect } = Route.useSearch()
  const isSummerProgramRegistration = redirect === summerProgramRegistrationPath
  const authCopy = isSummerProgramRegistration
    ? {
        eyebrow: 'Parent Account Required',
        title: 'Create an account and sign in to register.',
        description: (
          <div className="space-y-4">
            <p>
              To register for Summer Learning &amp; Leadership Camp, use a
              verified parent or guardian account.
            </p>
            <ol className="grid gap-3 text-sm leading-6 sm:text-base">
              <li className="flex gap-3">
                <span className="font-extrabold text-foreground">1.</span>
                <span>
                  Sign up as a parent or guardian and verify your email address.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-extrabold text-foreground">2.</span>
                <span>Return to the registration page after signing in.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-extrabold text-foreground">3.</span>
                <span>
                  Add your child&apos;s information in the registration form.
                </span>
              </li>
            </ol>
          </div>
        ),
        createAccountLabel: 'Create a parent account',
      }
    : {
        eyebrow: 'Welcome Back',
        title: 'Sign in to continue your Questura journey.',
        description:
          'Access your account to view registrations, updates, and learning resources.',
        createAccountLabel: 'Create an account',
      }

  return (
    <AuthLayout
      eyebrow={authCopy.eyebrow}
      title={authCopy.title}
      description={authCopy.description}
      footer={
        <>
          New to Questura?{' '}
          <AuthTextLink
            to="/signup"
            search={redirect ? { redirect } : undefined}
          >
            {authCopy.createAccountLabel}
          </AuthTextLink>
        </>
      }
    >
      <SignInForm redirect={redirect} />
    </AuthLayout>
  )
}
