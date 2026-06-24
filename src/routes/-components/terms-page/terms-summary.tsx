import type { TermsSection } from './terms-data'

type TermsSummaryProps = {
  sections: TermsSection[]
}

export function TermsSummary({ sections }: TermsSummaryProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-xl border border-brand-blue/10 bg-brand-blue/[0.03] p-5 shadow-[0_14px_34px_rgb(0_14_53/0.05)]">
        <h2 className="text-sm font-extrabold tracking-[0.08em] text-brand-blue uppercase">
          On this page
        </h2>
        <nav aria-label="Terms sections" className="mt-4">
          <ol className="grid gap-1 text-xs">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 font-bold text-brand-dark/68 no-underline transition-colors hover:bg-white hover:text-brand-blue focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <span className="text-xs text-brand-blue tabular-nums">
                    {index + 1}
                  </span>
                  <span className="min-w-0 truncate">{section.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  )
}
