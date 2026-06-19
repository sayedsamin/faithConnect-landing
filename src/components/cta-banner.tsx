import { CalendarDays, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useId } from 'react'

type CtaFeature = {
  label: string
}

type CtaBannerProps = {
  title?: string
  description?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  features?: CtaFeature[]
}

const defaultFeatures = [
  { label: 'Easy to use' },
  { label: 'Secure & Scalable' },
  { label: 'Built for ministry' },
]

export function CtaBanner({
  title = 'Bring your church operations and member engagement together',
  description = 'Join thousands of churches using FaithConnect to save time, increase engagement, and advance their mission.',
  primaryAction = { label: 'Get Started', href: '/contact' },
  secondaryAction = { label: 'Schedule a Demo', href: '/contact' },
  features = defaultFeatures,
}: CtaBannerProps) {
  const titleId = useId()

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby={titleId}>
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-[linear-gradient(112deg,var(--brand-blue)_0%,#0b45bd_45%,#3373e6_100%)] shadow-[0_22px_48px_rgb(0_14_53/0.16)]">
        <div className="relative grid min-h-[230px] items-center gap-8 px-8 py-9 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_35%,rgb(255_255_255/0.13),transparent_27%),radial-gradient(circle_at_92%_42%,rgb(255_255_255/0.18),transparent_30%)]" />
          <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_88%_36%,rgb(255_255_255/0.18),transparent_31%),linear-gradient(110deg,transparent_45%,rgb(255_255_255/0.04)_72%,rgb(255_255_255/0.12)_100%)] lg:block" />

          <div className="relative z-10 max-w-[560px] text-white">
            <h2
              id={titleId}
              className="max-w-[520px] text-[2rem] leading-[1.08] font-extrabold tracking-normal text-balance sm:text-[2.45rem]"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-[560px] text-sm leading-6 font-semibold text-white/86 sm:text-base">
              {description}
            </p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <a
                href={primaryAction.href}
                className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-md bg-white px-10 text-sm font-extrabold !text-brand-blue no-underline shadow-[0_12px_24px_rgb(0_14_53/0.16)] transition-colors hover:bg-white/92 hover:!text-brand-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
              >
                {primaryAction.label}
              </a>
              <a
                href={secondaryAction.href}
                className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-md border border-white/72 px-10 text-sm font-extrabold !text-white no-underline transition-colors hover:bg-white/12 hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
              >
                {secondaryAction.label}
              </a>
            </div>
          </div>

          <ul className="relative z-10 grid gap-6 text-sm font-extrabold text-white sm:justify-self-start lg:justify-self-center">
            {features.map((feature, index) => (
              <li key={feature.label} className="flex items-center gap-4">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-white/52 bg-white/8">
                  {index === 0 ? (
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                  ) : index === 1 ? (
                    <ShieldCheck className="size-4" aria-hidden="true" />
                  ) : (
                    <CalendarDays className="size-4" aria-hidden="true" />
                  )}
                </span>
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
