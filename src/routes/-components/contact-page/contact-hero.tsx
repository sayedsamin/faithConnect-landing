import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function ContactHero() {
  return (
    <header className="relative overflow-hidden border-b border-brand-blue/8 bg-brand-blue/[0.025] pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgb(0_64_205/0.10),transparent_28%),radial-gradient(circle_at_88%_26%,rgb(0_64_205/0.08),transparent_26%)]"
      />
      <div
        className="page-shell relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]"
        data-contact-reveal="split"
      >
        <div className="min-w-0">
          <h1 className="text-4xl leading-tight font-extrabold text-balance text-brand-dark sm:text-5xl">
            Let&apos;s help your church{' '}
            <span className="text-brand-blue">move forward.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-dark/66">
            Connect with the GraceNexa company team about product questions,
            sales, support, or partnership opportunities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:sales@gracenexa.com"
              className="inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-md bg-brand-blue px-7 text-sm font-extrabold !text-white no-underline shadow-[0_14px_28px_rgb(0_64_205/0.20)] transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/25"
            >
              Talk to sales
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="mailto:support@gracenexa.com"
              className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-md border border-brand-blue px-7 text-sm font-extrabold text-brand-blue no-underline transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20"
            >
              Get product support
            </a>
          </div>
          <ul className="mt-8 flex flex-col gap-3 text-sm font-bold text-brand-dark/62 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {['Company-level inquiries', 'Friendly product guidance'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    className="size-4 shrink-0 text-brand-blue"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="absolute inset-8 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-brand-blue/10 bg-white p-3 shadow-[0_28px_70px_rgb(0_14_53/0.13)] sm:p-4">
            <img
              src="/images/contact/contact-hero-support.webp"
              alt="GraceNexa dashboard shown on a laptop with support tools for church leaders"
              width={1536}
              height={1024}
              loading="eager"
              decoding="async"
              className="aspect-[3/2] w-full rounded-xl bg-brand-blue/[0.035] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
