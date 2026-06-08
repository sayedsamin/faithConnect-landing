import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout, AuthTextLink } from '#/routes/-auth/components/auth-layout'
import { ForgotPasswordForm } from '#/routes/-auth/components/forgot-password-form'

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
  head: () => ({
    meta: [{ title: 'Forgot Password | Questura' }],
  }),
})

function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Account Help"
      title="Reset your password."
      description="Enter your account email and we will send a link to help you get back in."
      footer={
        <>
          Remembered your password?{' '}
          <AuthTextLink to="/signin">Back to sign in</AuthTextLink>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
