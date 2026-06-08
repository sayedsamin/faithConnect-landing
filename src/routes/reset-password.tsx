import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout, AuthTextLink } from '#/routes/-auth/components/auth-layout'
import { ResetPasswordForm } from '#/routes/-auth/components/reset-password-form'

export const Route = createFileRoute('/reset-password')({
  component: ResetPasswordPage,
  head: () => ({
    meta: [{ title: 'Reset Password | Questura' }],
  }),
})

function ResetPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Password Reset"
      title="Choose a new password."
      description="Create a password you have not used before. You will be able to sign in again once it is updated."
      footer={
        <>
          Remembered your password?{' '}
          <AuthTextLink to="/signin">Back to sign in</AuthTextLink>
        </>
      }
    >
      <ResetPasswordForm />
    </AuthLayout>
  )
}
