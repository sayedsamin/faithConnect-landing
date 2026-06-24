import type { TermsSection as TermsSectionData } from './terms-data'

type TermsSectionProps = {
  number: number
  section: TermsSectionData
}

export function TermsSection({ number, section }: TermsSectionProps) {
  const paddedNumber = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 2,
  }).format(number)

  return (
    <article
      id={section.id}
      className="scroll-mt-28 rounded-xl border border-brand-blue/10 bg-white p-5 shadow-[0_16px_38px_rgb(0_14_53/0.06)] sm:p-7"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/8 text-sm font-extrabold text-brand-blue tabular-nums"
        >
          {paddedNumber}
        </span>
        <div className="min-w-0">
          <h2 className="text-xl leading-snug font-extrabold text-brand-dark sm:text-2xl">
            {section.title}
          </h2>
          <div className="mt-4 grid gap-4">
            {section.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-brand-dark/68"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
