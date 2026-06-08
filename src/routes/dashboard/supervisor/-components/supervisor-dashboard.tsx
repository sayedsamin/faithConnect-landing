import { BookOpenCheck, CalendarCheck, HeartHandshake } from 'lucide-react'

export function SupervisorDashboard() {
  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <p className="island-kicker">Team Guidance</p>
      <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
        Supervisor dashboard
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
        Track assigned students, follow up on progress signals, and support
        guardian communication.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['Assigned students', '28', 'In current caseload'],
          ['Follow-ups', '6', 'Scheduled this week'],
          ['Progress notes', '14', 'Ready for review'],
        ].map(([label, value, detail]) => (
          <article key={label} className="rounded-md border border-border p-5">
            <p className="text-sm font-bold text-muted-foreground">{label}</p>
            <p className="mt-3 text-3xl font-extrabold text-foreground tabular-nums">
              {value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          [BookOpenCheck, 'Check student progress'],
          [CalendarCheck, 'Plan follow-ups'],
          [HeartHandshake, 'Share updates'],
        ].map(([Icon, label]) => (
          <button
            key={label as string}
            type="button"
            className="flex min-h-28 items-center gap-4 rounded-md border border-border p-5 text-left font-extrabold hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          >
            <Icon aria-hidden="true" className="size-5 text-primary" />
            {label as string}
          </button>
        ))}
      </div>
    </section>
  )
}
