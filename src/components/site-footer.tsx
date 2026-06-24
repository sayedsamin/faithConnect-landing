import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, Mail } from 'lucide-react'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Terms', href: '/terms' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: Instagram },
  { label: 'Email', href: 'mailto:hello@faithconnect.com', Icon: Mail },
]

export function SiteFooter() {
  return (
    <footer className="site-footer px-4 py-[3.25rem] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col items-center justify-between gap-8 md:flex-row md:gap-6">
        <Link
          to="/"
          aria-label="FaithConnect home"
          className="inline-flex shrink-0 items-center gap-3 rounded-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4"
        >
          <img
            src="/images/home/FaithConnect%20Icon%20V3.webp"
            alt=""
            width={36}
            height={36}
            loading="lazy"
            decoding="async"
            className="size-9 object-contain"
            aria-hidden="true"
          />
          <span className="text-[1.35rem] leading-none font-extrabold text-brand-dark">
            FaithConnect
          </span>
        </Link>

        <nav
          aria-label="Footer navigation"
          className="flex min-w-0 flex-wrap items-center justify-center gap-y-3 text-center"
        >
          {footerLinks.map((link, index) => (
            <div key={link.href} className="flex items-center">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="mx-5 hidden h-4 w-px bg-brand-dark/34 sm:block"
                />
              ) : null}
              <a
                href={link.href}
                className="rounded-md px-1 py-2 text-[0.8rem] font-extrabold text-brand-dark no-underline transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4"
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex size-11 touch-manipulation items-center justify-center rounded-full bg-brand-blue/8 text-brand-dark/58 no-underline transition-colors hover:bg-brand-blue/14 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4"
            >
              <Icon className="size-5" strokeWidth={2.6} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
