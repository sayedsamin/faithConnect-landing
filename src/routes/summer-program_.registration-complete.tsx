import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'

const guardianDashboardPath = '/dashboard/guardian'

export const Route = createFileRoute('/summer-program_/registration-complete')({
  component: SummerProgramRegistrationCompletePage,
  head: () => ({
    meta: [{ title: 'Registration Submitted | Questura Academy' }],
  }),
})

function SummerProgramRegistrationCompletePage() {
  return (
    <section className="page-wrap flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-28 sm:px-6">
      <div className="w-full max-w-lg rounded-md border border-border bg-background p-6 text-center shadow-[0_18px_34px_rgba(23,58,64,0.08)] sm:p-8">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-md bg-school-bus-yellow text-shadow-grey">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold text-foreground">
          Registration submitted
        </h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          Your form has been submitted and is awaiting confirmation.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={guardianDashboardPath}
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-shadow-grey px-5 text-sm font-extrabold text-brand-white no-underline shadow-[0_10px_18px_rgba(0,0,0,0.14)] transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-school-bus-yellow hover:text-brand-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Go to dashboard
          </Link>
          <Link
            to="/summer-program"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-extrabold text-foreground no-underline hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          >
            View program
          </Link>
        </div>
      </div>
    </section>
  )
}
