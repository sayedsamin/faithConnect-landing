import { Link } from '@tanstack/react-router'
import { ArrowRight, Church } from 'lucide-react'

import { sectionIconShellClass, sectionIconSvgClass } from './about-styles'

export function AboutCta() {
  return (
    <section
      className="mx-auto w-full max-w-6xl py-16"
      aria-labelledby="about-cta-title"
    >
      <div className="rounded-lg border border-brand-blue/20 bg-brand-blue p-5 text-white shadow-lg sm:p-6 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="flex max-w-3xl items-start gap-4">
          <span className={`${sectionIconShellClass} bg-white/15 text-white`}>
            <Church aria-hidden="true" className={sectionIconSvgClass} />
          </span>
          <div className="min-w-0">
            <h2
              id="about-cta-title"
              className="text-2xl font-extrabold text-white"
            >
              Bring your church community closer together.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85">
              Simplify operations, strengthen relationships, and give your team
              the tools to serve members with confidence.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold !text-brand-blue no-underline transition-colors hover:bg-white/90 hover:!text-brand-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            Get Started
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/70 px-5 py-3 text-sm font-semibold !text-white no-underline transition-colors hover:bg-white hover:!text-brand-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  )
}
