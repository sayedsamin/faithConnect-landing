import { ChartNoAxesCombined, ShieldCheck, UsersRound } from 'lucide-react'

export function SuperadminDashboardOverview() {
  return (
    <section className="rounded-md border border-border bg-background/86 p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)]">
      <p className="island-kicker">System Command</p>
      <h1 className="display-title mt-3 text-4xl font-bold text-foreground">
        Superadmin dashboard
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
        Monitor platform health, security posture, tenant setup, and
        organization-wide controls from one operational view.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['Security review', 'Due', 'Privileged access check'],
          ['System status', 'Live', 'Core services online'],
          ['Queue health', 'Ready', 'Background jobs available'],
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
          [ShieldCheck, 'Review access controls'],
          [ChartNoAxesCombined, 'Inspect platform activity'],
          [UsersRound, 'Manage organizations'],
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
