import { Link } from '@tanstack/react-router'
import { CalendarPlus } from 'lucide-react'

export function GuardianRegistrationCta() {
  return (
    <section className="mb-5 rounded-md border border-border bg-background/86 p-5 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="island-kicker">Summer Program</p>
          <h1 className="display-title mt-2 text-3xl font-bold text-foreground">
            Register for Summer Learning &amp; Leadership Camp
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Complete or continue registration for the 2026 summer program.
          </p>
        </div>
        <Link
          to="/summer-program/register"
          className="inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center gap-2 rounded-md bg-brand-navy px-5 py-3 text-sm font-extrabold !text-brand-white no-underline shadow-[0_12px_24px_rgba(0,0,0,0.16)] transition-[background-color,color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:bg-brand-gold hover:!text-brand-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <CalendarPlus aria-hidden="true" className="size-5" />
          Register
        </Link>
      </div>
    </section>
  )
}
