import { Link } from '@tanstack/react-router'
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react'

const footerLinks = [{ label: 'Contact', href: '/contact' }]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer relative overflow-hidden px-4 pt-16 pb-8 text-brand-white sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in oklab, var(--brand-gold) 72%, transparent), transparent)',
        }}
      />

      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-10 md:grid-cols-[1.25fr_0.75fr_0.9fr]">
        <div>
          <Link
            to="/"
            aria-label="Questura home"
            className="inline-flex items-center gap-3 text-2xl font-extrabold !text-brand-white no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-md bg-school-bus-yellow text-shadow-grey">
              <Sparkles className="size-5" aria-hidden />
            </span>
            Faith Connect
          </Link>
          <p className="mt-5 max-w-md leading-7 text-brand-white/72">
            Innovation-driven learning programs for children, youth, families,
            and community partners.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand-white/62">
            Explore
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="w-fit font-semibold !text-brand-white/78 no-underline transition-colors hover:!text-brand-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand-white/62">
            Connect
          </h2>
          <div className="mt-4 space-y-3 text-brand-white/76">
            <p className="flex items-start gap-3">
              <MapPin
                className="mt-1 size-4 shrink-0 text-school-bus-yellow"
                aria-hidden
              />
              <span>80 Barnes St, Winnipeg, MB R3T 5J2</span>
            </p>
            <a
              href="mailto:info@questura.ca"
              className="flex w-fit items-center gap-3 !text-brand-white/78 no-underline transition-colors hover:!text-brand-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35"
            >
              <Mail
                className="size-4 shrink-0 text-school-bus-yellow"
                aria-hidden
              />
              info@faithconnect.ca
            </a>
            <a
              href="tel:+14319969120"
              className="flex w-fit items-center gap-3 !text-brand-white/78 no-underline transition-colors hover:!text-brand-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35"
            >
              <Phone
                className="size-4 shrink-0 text-school-bus-yellow"
                aria-hidden
              />
              431-996-9120
            </a>
          </div>
        </div>
      </div>

      <div
        className="mx-auto mt-12 flex w-full max-w-[1120px] flex-col gap-3 border-t pt-6 text-sm text-brand-white/58 sm:flex-row sm:items-center sm:justify-between"
        style={{
          borderColor: 'color-mix(in oklab, var(--white) 14%, transparent)',
        }}
      >
        <p>&copy; {year}Faith Connect. All rights reserved.</p>
        <p>Built for curious learners and stronger communities.</p>
      </div>
    </footer>
  )
}
