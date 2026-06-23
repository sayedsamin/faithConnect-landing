import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export function AboutHero() {
  return (
    <header className="relative overflow-hidden pt-32 pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-brand-blue/5 to-background"
      />
      <div className="page-shell relative z-10 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)]">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Helping churches organize, connect, and grow.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            FaithConnect is a secure church management SaaS platform that helps
            churches and faith-based organizations manage members, giving
            events, communication, and engagement.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold !text-white no-underline transition-colors hover:bg-blue-700 hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
            >
              Start A Church Account
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-blue px-5 py-3 text-sm font-semibold text-brand-blue no-underline transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
            >
              Schedule A Demo
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:pt-2">
          <img
            src="/images/about/faithconnect-about-hero.webp"
            alt="FaithConnect dashboard and mobile app interface preview"
            width={1536}
            height={1024}
            loading="eager"
            decoding="async"
            className="h-auto w-full rounded-lg border border-border object-cover shadow-2xl"
          />
        </div>
      </div>
    </header>
  )
}
