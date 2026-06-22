import { Link } from '@tanstack/react-router'
import { Check, ChevronDown } from 'lucide-react'
import { CtaBanner } from '#/components/cta-banner'

const pricingPlans = [
  {
    name: 'Starter',
    image: '/images/pricing/church.png',
    tone: 'text-emerald-600 bg-emerald-50',
    description: 'For small churches beginning digital management.',
    price: '$29',
    cadence: '/month',
    cta: 'Start free trial',
    featured: false,
    features: [
      'Member management',
      'Basic communication',
      'Event coordination',
      'Attendance tracking',
      'Standard reports',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    image: '/images/pricing/church 2.png',
    tone: 'text-brand-blue bg-brand-blue/10',
    description:
      'For churches needing donations, events, and member engagement tools.',
    price: '$79',
    cadence: '/month',
    cta: 'Start free trial',
    featured: true,
    features: [
      'Everything in Starter',
      'Donations and pledges',
      'Volunteer management',
      'Advanced communication',
      'Event registration',
      'Advanced reports',
    ],
  },
  {
    name: 'Multi-Branch',
    image: '/images/pricing/churches.png',
    tone: 'text-brand-blue bg-brand-blue/10',
    description:
      'For larger ministries requiring multiple locations and priority support.',
    price: 'Custom pricing',
    cadence: '',
    cta: 'Contact sales',
    featured: false,
    features: [
      'Everything in Growth',
      'Multi-location management',
      'Advanced role permissions',
      'Consolidated reporting',
      'Priority support',
      'Dedicated onboarding',
    ],
  },
]

const trustItems = [
  {
    image: '/images/pricing/encrypted.png',
    title: 'Secure and private by design',
    description: 'Your data is protected.',
  },
  {
    image: '/images/pricing/contract.png',
    title: 'No long-term contracts',
    description: 'Cancel or change anytime.',
  },
  {
    image: '/images/pricing/group.png',
    title: 'Role-based access',
    description: 'Control who sees what.',
  },
  {
    image: '/images/pricing/growth.png',
    title: 'Built for growing churches',
    description: 'Scale with confidence.',
  },
]

const comparisonRows = [
  {
    feature: 'Members',
    starter: 'Up to 250',
    growth: 'Up to 2,500',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Donations',
    starter: false,
    growth: true,
    enterprise: true,
  },
  {
    feature: 'Events',
    starter: 'Basic',
    growth: 'Advanced',
    enterprise: 'Advanced',
  },
  {
    feature: 'Communication',
    starter: 'Basic',
    growth: 'Advanced',
    enterprise: 'Advanced',
  },
  {
    feature: 'Reports',
    starter: 'Standard',
    growth: 'Advanced',
    enterprise: 'Consolidated',
  },
  {
    feature: 'Volunteers',
    starter: false,
    growth: true,
    enterprise: true,
  },
  {
    feature: 'Multi-campus',
    starter: false,
    growth: false,
    enterprise: true,
  },
  {
    feature: 'Priority support',
    starter: false,
    growth: 'Standard',
    enterprise: 'Priority',
  },
]

const faqItems = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes. You can move between plans as your church grows or as your ministry needs change.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Yes. Annual billing saves 15% compared with monthly billing for eligible plans.',
  },
  {
    question: 'Is there a plan for multi-campus churches?',
    answer:
      'Yes. Enterprise / Multi-Branch supports multiple locations, advanced roles, consolidated reporting, and priority support.',
  },
  {
    question: 'Can I request a demo before subscribing?',
    answer:
      'Yes. You can schedule a demo with our team to see how FaithConnect fits your church workflows.',
  },
]

export function PricingPage() {
  return (
    <div className="bg-brand-white text-brand-dark">
      <section className="page-shell pt-20 pb-6 sm:pt-22 sm:pb-8 lg:pt-24 lg:pb-8">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-8 hidden h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl lg:block" />
          <div className="grid gap-8 lg:min-h-[23.5rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(34rem,1.18fr)] lg:items-stretch xl:min-h-[25rem]">
            <div className="relative z-10 flex max-w-2xl flex-col self-stretch lg:justify-between lg:py-5">
              <div>
                <h1 className="text-3xl font-extrabold leading-tight tracking-normal text-brand-dark sm:text-4xl lg:text-5xl">
                  Simple pricing for every{' '}
                  <span className="text-brand-blue">church structure.</span>
                </h1>
                <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-brand-dark/65">
                  Whether your church is small, growing, or multi-branch,
                  FaithConnect provides flexible subscription access for each
                  organization.
                </p>
              </div>
              <BillingToggle />
            </div>

            <PricingHeroImage />
          </div>
        </div>
      </section>

      <main className="page-shell pb-2">
        <PricingPlans />
        <TrustStrip />
        <ComparisonTable />
        <PricingFaq />
      </main>
      <CtaBanner />
    </div>
  )
}
function BillingToggle() {
  return (
    <div
      className="mt-7 grid min-h-11 w-full max-w-md grid-cols-3 items-center gap-1 rounded-full border border-brand-blue/20 bg-white p-1 text-sm font-extrabold shadow-sm"
      aria-label="Billing cycle"
    >
      <button
        type="button"
        className="min-h-9 rounded-full px-3 py-2 text-center text-brand-dark transition-colors hover:bg-brand-blue/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20"
      >
        Monthly
      </button>
      <button
        type="button"
        className="min-h-9 rounded-full bg-brand-blue px-3 py-2 text-center text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20"
      >
        Yearly
      </button>
      <span className="flex min-h-9 items-center justify-center rounded-full bg-emerald-50 px-2 py-2 text-center text-[0.68rem] font-extrabold leading-tight text-emerald-700">
        Save 15% yearly
      </span>
    </div>
  )
}

function PricingHeroImage() {
  return (
    <div className="relative z-10 flex self-stretch lg:h-full lg:items-stretch">
      <img
        src="/images/pricing/pricing-hero.png"
        alt="FaithConnect dashboard preview with church management metrics"
        width={860}
        height={560}
        loading="eager"
        decoding="async"
        className="h-auto w-full object-contain object-top lg:h-full lg:object-left"
      />
    </div>
  )
}

function PricingPlans() {
  return (
    <section className="pt-12 sm:pt-14 lg:pt-16" aria-labelledby="plans-title">
      <h2 id="plans-title" className="sr-only">
        FaithConnect pricing plans
      </h2>
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <article
            key={plan.name}
            style={{ animationDelay: `${index * 110}ms` }}
            className={
              plan.featured
                ? 'rise-in relative rounded-lg border-2 border-brand-blue bg-white p-8 shadow-[0_24px_60px_rgba(0,64,205,0.14)]'
                : 'rise-in relative rounded-lg border border-brand-blue/15 bg-white p-8 shadow-sm'
            }
          >
            {plan.featured ? (
              <span className="absolute left-1/2 top-0 inline-flex min-h-7 -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-brand-blue px-5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white">
                Most popular
              </span>
            ) : null}

            <div className="flex items-start gap-4">
              <span
                className={`inline-flex size-16 shrink-0 items-center justify-center rounded-full ${plan.tone}`}
              >
                <img
                  src={plan.image}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="size-10 object-contain"
                />
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-extrabold text-brand-dark">
                  {plan.name}
                </h3>
                <p className="mt-2 text-xs font-bold leading-5 text-brand-dark/60">
                  {plan.description}
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-3 border-b border-brand-blue/10 pb-7">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                    <Check aria-hidden="true" className="size-3" />
                  </span>
                  <span className="font-bold leading-5 text-brand-dark/75">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 text-center">
              <p className="text-3xl font-extrabold tabular-nums text-brand-blue">
                {plan.price}
                {plan.cadence ? (
                  <span className="ml-1 text-sm font-extrabold text-brand-dark">
                    {plan.cadence}
                  </span>
                ) : null}
              </p>
              <Link
                to="/contact"
                className={
                  plan.featured
                    ? 'mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-brand-blue px-5 py-3 text-sm font-extrabold !text-white no-underline shadow-sm transition-colors hover:bg-blue-700 hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/25'
                    : 'mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-brand-blue px-5 py-3 text-sm font-extrabold text-brand-blue no-underline transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/25'
                }
              >
                {plan.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
function TrustStrip() {
  return (
    <section
      className="pt-20 pb-12 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16"
      aria-label="Plan guarantees"
    >
      <h2 className="mb-10 text-center text-2xl font-extrabold text-brand-dark sm:text-3xl">
        What we offer
      </h2>
      <div className="pricing-trust-strip grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {trustItems.map(({ image, title, description }) => (
          <article
            key={title}
            className="pricing-trust-item group flex flex-col items-center text-center"
          >
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-brand-blue/5 transition-[background-color,transform] duration-300 group-hover:-translate-y-1 group-hover:bg-brand-blue/10">
              <img
                src={image}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="size-11 object-contain"
              />
            </span>
            <h3 className="mt-5 max-w-52 text-xl font-extrabold leading-7 text-brand-dark">
              {title}
            </h3>
            <p className="mt-3 max-w-48 text-sm font-semibold leading-6 text-brand-dark/55">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ComparisonTable() {
  return (
    <section
      className="py-12 sm:py-14 lg:py-16"
      aria-labelledby="compare-title"
    >
      <div className="rounded-lg bg-brand-blue/[0.04] px-4 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:px-6 lg:px-8">
        <h2
          id="compare-title"
          className="text-center text-2xl font-extrabold text-brand-dark"
        >
          Compare plans
        </h2>

        <div className="mt-5 overflow-x-auto rounded-lg border border-brand-blue/10 bg-white shadow-sm">
          <table className="w-full min-w-[46rem] table-fixed text-center text-sm">
            <thead>
              <tr className="border-b border-brand-blue/10 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-brand-dark/55">
                <th
                  scope="col"
                  className="w-1/4 border-r border-brand-blue/10 px-5 py-4 text-left"
                >
                  Features
                </th>
                <th
                  scope="col"
                  className="w-1/4 border-r border-brand-blue/10 px-5 py-4"
                >
                  Starter
                </th>
                <th
                  scope="col"
                  className="w-1/4 border-r border-brand-blue/10 bg-brand-blue/[0.04] px-5 py-4"
                >
                  Growth
                  <span className="ml-2 rounded-full bg-brand-blue px-2 py-1 text-[0.6rem] text-white">
                    Most popular
                  </span>
                </th>
                <th scope="col" className="w-1/4 px-5 py-4">
                  Enterprise / Multi-Branch
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-brand-blue/10 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="border-r border-brand-blue/10 px-5 py-3 text-left text-xs font-extrabold text-brand-dark"
                  >
                    {row.feature}
                  </th>
                  <ComparisonCell value={row.starter} bordered />
                  <ComparisonCell value={row.growth} featured bordered />
                  <ComparisonCell value={row.enterprise} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function ComparisonCell({
  value,
  featured = false,
  bordered = false,
}: {
  value: string | boolean
  featured?: boolean
  bordered?: boolean
}) {
  return (
    <td
      className={
        featured
          ? `${bordered ? 'border-r border-brand-blue/10 ' : ''}bg-brand-blue/[0.04] px-5 py-3 text-xs font-bold text-brand-dark/75`
          : `${bordered ? 'border-r border-brand-blue/10 ' : ''}px-5 py-3 text-xs font-bold text-brand-dark/75`
      }
    >
      {typeof value === 'boolean' ? (
        value ? (
          <Check
            aria-label="Included"
            className="mx-auto size-4 text-brand-blue"
          />
        ) : (
          <span aria-label="Not included" className="text-brand-dark/35">
            -
          </span>
        )
      ) : (
        value
      )}
    </td>
  )
}

function PricingFaq() {
  return (
    <section
      className="pt-2 pb-12 sm:pt-3 sm:pb-14 lg:pt-4 lg:pb-16"
      aria-labelledby="faq-title"
    >
      <h2
        id="faq-title"
        className="mb-10 text-center text-2xl font-extrabold text-brand-dark sm:text-3xl"
      >
        FAQ
      </h2>
      <div className="grid gap-3">
        {faqItems.map(({ question, answer }) => (
          <details
            key={question}
            className="group rounded-lg border border-brand-blue/10 bg-white px-6 py-4 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold text-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20">
              <span>{question}</span>
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-sm font-semibold leading-6 text-brand-dark/60">
              {answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
