import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react'

import { termsEffectiveDate, termsHighlights } from './terms-data'

const heroStats = [
  { label: 'For churches', value: 'Ministry operations' },
  { label: 'Data stance', value: 'No member data sales' },
  { label: 'Scope', value: 'Website and platform' },
]

export function TermsHero() {
  return (
    <header className="relative border-b border-brand-blue/10 bg-brand-blue/[0.025] pt-32 pb-14 sm:pt-36 sm:pb-18">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(0_64_205/0.12),transparent_36%)]"
      />
      <div className="page-shell relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white px-3 py-2 text-sm font-extrabold text-brand-blue shadow-[0_10px_26px_rgb(0_14_53/0.06)]">
            <FileText className="size-4" aria-hidden="true" />
            Effective {termsEffectiveDate}
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-extrabold text-balance text-brand-dark sm:text-5xl lg:text-6xl">
            Terms built for a church management platform.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 font-medium text-brand-dark/68 sm:text-lg sm:leading-8">
            These terms explain how FaithConnect works with churches,
            ministries, and authorized users across our website, demos,
            subscriptions, onboarding, support, and platform services.
          </p>
        </div>

        <aside
          aria-label="Terms highlights"
          className="rounded-xl border border-brand-blue/12 bg-white p-5 shadow-[0_18px_44px_rgb(0_14_53/0.08)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-blue/8 text-brand-blue">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-brand-dark">
                Plain-language summary
              </p>
              <p className="mt-1 text-sm leading-6 text-brand-dark/58">
                Key points before the details.
              </p>
            </div>
          </div>

          <ul className="mt-5 grid gap-3">
            {termsHighlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-6">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-brand-blue"
                  aria-hidden="true"
                />
                <span className="text-brand-dark/72">{highlight}</span>
              </li>
            ))}
          </ul>
        </aside>

        <dl className="grid gap-3 sm:grid-cols-3 lg:col-span-2">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-brand-blue/10 bg-white/82 p-4 shadow-[0_12px_30px_rgb(0_14_53/0.05)]"
            >
              <dt className="text-xs font-extrabold tracking-[0.08em] text-brand-blue uppercase">
                {stat.label}
              </dt>
              <dd className="mt-2 text-sm font-extrabold text-brand-dark">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}
