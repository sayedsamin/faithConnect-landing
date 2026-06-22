import { Building2, Clock3, Mail, Phone } from 'lucide-react'

const companyDetails = [
  {
    icon: Mail,
    label: 'General inquiries',
    value: 'hello@faithconnect.com',
    href: 'mailto:hello@faithconnect.com',
  },
  {
    icon: Phone,
    label: 'Company phone',
    value: '+1 (555) 014-2048',
    href: 'tel:+15550142048',
  },
  {
    icon: Clock3,
    label: 'Business hours',
    value: 'Monday–Friday, 9:00 AM–5:00 PM CT',
  },
  {
    icon: Building2,
    label: 'Company presence',
    value: 'Remote-first across North America',
  },
] as const

export function ContactDetails() {
  return (
    <section className="bg-brand-blue/[0.035] py-16 sm:py-20">
      <div
        className="page-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        data-contact-reveal="split"
      >
        <div className="relative overflow-hidden rounded-[1.4rem] border border-brand-blue/10 bg-white p-6 shadow-[0_24px_60px_rgb(0_14_53/0.10)] sm:p-8">
          <div className="absolute -right-12 -bottom-12 size-48 rounded-full bg-brand-blue/8 blur-2xl" />
          <img
            src="/images/about/platform.png"
            alt="FaithConnect available across web, tablet, and mobile"
            width={512}
            height={512}
            loading="lazy"
            decoding="async"
            className="relative mx-auto aspect-square w-full max-w-sm object-contain"
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-3xl leading-tight font-extrabold text-brand-dark sm:text-4xl">
            Reach the FaithConnect company team
          </h2>
          <p className="mt-4 text-base leading-7 text-brand-dark/62">
            These details are temporary placeholders for the company&apos;s
            final contact information and operating schedule.
          </p>
          <dl className="mt-7 grid gap-4">
            {companyDetails.map(({ icon: Icon, label, value, ...detail }) => (
              <div
                key={label}
                className="flex min-w-0 items-start gap-4 rounded-lg border border-brand-blue/10 bg-white p-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-blue/8 text-brand-blue">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-extrabold text-brand-dark/52">
                    {label}
                  </dt>
                  <dd className="mt-1 break-words text-sm font-extrabold text-brand-dark">
                    {'href' in detail ? (
                      <a
                        href={detail.href}
                        className="text-brand-dark no-underline hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/25"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
