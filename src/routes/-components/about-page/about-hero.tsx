import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export function AboutHero() {
  return (
    <header className="relative overflow-hidden border-b border-brand-blue/8 bg-brand-blue/[0.025] pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgb(0_64_205/0.10),transparent_30%),radial-gradient(circle_at_88%_26%,rgb(0_64_205/0.08),transparent_28%)]"
      />
      <div className="page-shell relative z-10 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)]">
        <div className="max-w-3xl">
          <h1 className="text-4xl leading-tight font-extrabold text-balance text-brand-dark sm:text-5xl">
            Helping churches organize, connect, and grow.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 font-medium text-brand-dark/68 sm:text-lg sm:leading-8">
            FaithConnect is a secure church management SaaS platform that helps
            churches and faith-based organizations manage members, giving
            events, communication, and engagement.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-md bg-brand-blue px-7 py-3 text-sm font-extrabold !text-white no-underline shadow-[0_14px_28px_rgb(0_64_205/0.20)] transition-colors hover:bg-blue-700 hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/25"
            >
              Start A Church Account
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-md border border-brand-blue px-7 py-3 text-sm font-extrabold text-brand-blue no-underline transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20"
            >
              Schedule A Demo
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:pt-2">
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-full bg-brand-blue/10 blur-3xl"
          />
          <img
            src="/images/about/faithconnect-about-hero.webp"
            alt="FaithConnect dashboard and mobile app interface preview"
            width={1536}
            height={1024}
            loading="eager"
            decoding="async"
            className="relative h-auto w-full rounded-xl border border-brand-blue/10 bg-white object-cover shadow-[0_28px_70px_rgb(0_14_53/0.13)]"
          />
        </div>
      </div>
    </header>
  )
}
