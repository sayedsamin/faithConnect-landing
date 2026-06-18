import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Church } from 'lucide-react'

const iconColorClasses = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-amber-100 text-amber-600',
  'bg-green-100 text-green-600',
  'bg-rose-100 text-rose-600',
  'bg-cyan-100 text-cyan-600',
] as const

const sectionIconShellClass =
  'inline-flex size-16 shrink-0 items-center justify-center rounded-md'
const sectionIconImageClass = 'size-10 object-contain'
const sectionIconSvgClass = 'size-10'

function useFeatureReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visibleStep, setVisibleStep] = useState(0)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    let hasStarted = false

    const reveal = () => {
      if (hasStarted) {
        return undefined
      }

      hasStarted = true

      const timers = [1, 2, 3, 4, 5].map((step, index) =>
        window.setTimeout(() => {
          setVisibleStep((currentStep) => Math.max(currentStep, step))
        }, index * 180),
      )

      return () => {
        timers.forEach((timer) => window.clearTimeout(timer))
      }
    }

    const rect = node.getBoundingClientRect()
    const isAlreadyInView =
      rect.top < window.innerHeight * 0.78 &&
      rect.bottom > window.innerHeight * 0.18

    if (isAlreadyInView || !('IntersectionObserver' in window)) {
      return reveal()
    }

    let cleanupReveal: (() => void) | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cleanupReveal = reveal()
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -22% 0px',
        threshold: 0.12,
      },
    )

    const handleScrollFallback = () => {
      const nextRect = node.getBoundingClientRect()
      const shouldReveal =
        nextRect.top < window.innerHeight * 0.78 &&
        nextRect.bottom > window.innerHeight * 0.18

      if (shouldReveal) {
        cleanupReveal = reveal()
        observer.disconnect()
        window.removeEventListener('scroll', handleScrollFallback)
        window.removeEventListener('resize', handleScrollFallback)
      }
    }

    observer.observe(node)
    window.addEventListener('scroll', handleScrollFallback, { passive: true })
    window.addEventListener('resize', handleScrollFallback)

    return () => {
      cleanupReveal?.()
      observer.disconnect()
      window.removeEventListener('scroll', handleScrollFallback)
      window.removeEventListener('resize', handleScrollFallback)
    }
  }, [])

  return { ref, visibleStep }
}

function getFeatureRevealClass(step: number, visibleStep: number) {
  return visibleStep >= step
    ? 'feature-reveal-item is-visible'
    : 'feature-reveal-item'
}

function getBenefitRevealClass(step: number, visibleStep: number) {
  return visibleStep >= step
    ? 'benefit-reveal-item is-visible'
    : 'benefit-reveal-item'
}

const missionHighlights = [
  {
    iconSrc: '/images/about/platform.png',
    title: '1 platform',
    description: 'Everything your church needs in one place.',
  },
  {
    iconSrc: '/images/about/churches.png',
    title: 'Multiple church organizations',
    description: 'Manage campuses, sites, and ministries with ease.',
  },
  {
    iconSrc: '/images/about/Web-mobile%20icon.png',
    title: 'Web + mobile experience',
    description: 'Stay connected anywhere, anytime.',
  },
]

const benefitCards = [
  {
    iconSrc: '/images/about/community.png',
    title: 'Community connection',
    description:
      'Tools to help churches build stronger relationships with members, volunteers, and teams across web and mobile.',
  },
  {
    iconSrc: '/images/about/encrypted.png',
    title: 'Security and trust',
    description:
      'Enterprise-grade security, privacy controls, and reliable access to protect your ministry data and relationships.',
  },
  {
    iconSrc: '/images/about/church%202.png',
    title: 'Multi-Campus Churches',
    description:
      'Manage multiple locations with shared visibility, flexible permissions, and consistent member experiences.',
  },
  {
    iconSrc: '/images/about/team.png',
    title: 'Faith-Based Nonprofits',
    description:
      'Coordinate volunteers, programs, communications, and community impact with tools built for service.',
  },
]

const experienceCards = [
  {
    title: 'Manage Members',
    description: 'Keep members up to date and organized',
  },
  {
    title: 'Process Donations',
    description: 'Access and track donations securely',
  },
  {
    title: 'Coordinate Events',
    description: 'Plan,promote and mange church events',
  },
  {
    title: 'Access Reports',
    description: 'Gain insights and track ministry impacts',
  },
]

const trustCards = [
  {
    iconSrc: '/images/about/woman1.png',
    title: 'Secure Authentication',
    description:
      'Protect church access with modern authentication patterns and clear permission boundaries.',
  },
  {
    iconSrc: '/images/about/man.png',
    title: 'Role-Based Permissions',
    description:
      'Give admins, staff, volunteers, and members access only to the tools and records they need.',
  },
  {
    iconSrc: '/images/about/woman2.png',
    title: 'Data Protection',
    description:
      'Keep member, giving, attendance, and ministry records organized with security-first handling.',
  },
]

export function AboutPage() {
  return (
    <section className="pb-20">
      <header className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-brand-blue/5 to-background"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)]">
          <div className="max-w-3xl">
            <p className="island-kicker">About FaithConnect</p>
            <h1 className="display-title mt-4 text-4xl font-bold text-foreground sm:text-5xl">
              Helping Chruches organize, connect, and grow.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              FaithConnect is a secure church management SaaS platform that
              helps churches and faith-based organizations manage members,
              giving events, communication, and engagement.
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
              src="/images/about/faithconnect-about-hero.png"
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

      <div className="px-4 sm:px-6">
        <AboutValues />

        <AboutFeatures />

        <AboutBenefits />

        <AboutExperience />

        <AboutTrust />

        <AboutCta />
      </div>
    </section>
  )
}

function AboutValues() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-16 text-center"
      aria-labelledby="values-title"
    >
      <h2 id="values-title" className="text-2xl font-extrabold text-foreground">
        Our mission
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        We empower churches with simple, secure digital tools that strengthen
        administration, communication, generosity, and community engagement.
      </p>

      <div className="mx-auto mt-6 grid max-w-4xl gap-4 md:grid-cols-3">
        {missionHighlights.map((highlight, index) => (
          <div
            key={highlight.title}
            className="value-card-pop flex min-h-28 items-center gap-4 rounded-lg p-5 text-left"
          >
            <span
              className={`${sectionIconShellClass} ${iconColorClasses[index % iconColorClasses.length]}`}
            >
              <img
                src={highlight.iconSrc}
                alt=""
                aria-hidden="true"
                className={sectionIconImageClass}
              />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold text-foreground">
                {highlight.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                {highlight.description}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function AboutFeatures() {
  const { ref, visibleStep } = useFeatureReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="relative left-1/2 w-screen -translate-x-1/2 border-y border-border bg-background py-16"
      aria-labelledby="features-title"
    >
      <div className="about-features-reveal relative mx-auto w-full max-w-7xl overflow-hidden px-4 pr-6 sm:px-6 sm:pr-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-8 lg:pr-10 xl:pr-12">
        <div
          aria-hidden="true"
          className="absolute right-8 top-10 hidden h-36 w-36 rounded-full border border-brand-blue/15 lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute left-[42%] top-16 hidden h-24 w-24 bg-[radial-gradient(circle,var(--brand-blue)_1px,transparent_1px)] bg-[length:10px_10px] opacity-20 lg:block"
        />
        <div className="about-features-copy relative z-10 lg:pl-8 xl:pl-12">
          <span
            className={`${getFeatureRevealClass(1, visibleStep)} ${sectionIconShellClass} rounded-full bg-purple-100 text-purple-600`}
          >
            <img
              src="/images/about/church.png"
              alt=""
              aria-hidden="true"
              className={sectionIconImageClass}
            />
          </span>
          <h2
            id="features-title"
            className={`${getFeatureRevealClass(2, visibleStep)} mt-4 text-2xl font-extrabold text-foreground`}
          >
            Built for modern ministry
          </h2>
          <p
            className={`${getFeatureRevealClass(3, visibleStep)} mt-4 max-w-lg text-sm leading-6 text-muted-foreground`}
          >
            Churches need better tools to manage ministry operations without the
            complexity. FaithConnect was created to simplify administration,
            unify communication, and help leaders focus on what matters
            most-people.
          </p>
          <p
            className={`${getFeatureRevealClass(4, visibleStep)} mt-3 max-w-lg text-sm leading-6 text-muted-foreground`}
          >
            From the first connection to lifelong engagement, we make it easy to
            serve, support, and grow your community.
          </p>
        </div>

        <div
          className={`${getFeatureRevealClass(5, visibleStep)} about-features-media relative z-10 mt-8 lg:mt-0`}
        >
          <img
            src="/images/about/member-overview.png"
            alt="FaithConnect member overview and recent activity dashboard preview"
            width={1920}
            height={802}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-lg border border-border object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

function AboutBenefits() {
  const { ref, visibleStep } = useFeatureReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="benefits-section relative left-1/2 w-screen -translate-x-1/2 py-16"
      aria-labelledby="benefits-title"
    >
      <div className="mx-auto mb-8 w-full max-w-7xl px-4 text-center sm:px-6">
        <h2
          id="benefits-title"
          className="text-2xl font-extrabold text-foreground"
        >
          What we value
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Practical benefits for churches, ministries, campuses, and faith-based
          nonprofits.
        </p>
      </div>

      <div className="benefits-grid mx-auto grid w-full max-w-7xl gap-3 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
        {benefitCards.map((benefit, index) => (
          <article
            key={benefit.title}
            className={`${getBenefitRevealClass(index + 1, visibleStep)} benefit-card-pop group relative flex min-h-48 items-start gap-4 overflow-hidden rounded-lg p-5 sm:p-6`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span
              className={`${sectionIconShellClass} transition-transform duration-200 group-hover:-translate-y-1 ${iconColorClasses[index % iconColorClasses.length]}`}
            >
              <img
                src={benefit.iconSrc}
                alt=""
                aria-hidden="true"
                className={sectionIconImageClass}
              />
            </span>
            <div className="min-w-0 pt-1">
              <h3 className="text-base font-extrabold leading-6 text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutExperience() {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 py-16"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto mb-6 w-full max-w-7xl px-4 text-center sm:px-6">
        <h2
          id="experience-title"
          className="text-xl font-extrabold text-foreground"
        >
          What FaithConnect helps churches do
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Built around how churches actually work across admin, cloud, and
          member-facing tools.
        </p>
      </div>

      <div className="experience-strip">
        <div className="mx-auto grid w-full max-w-7xl gap-y-8 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
          {experienceCards.map(({ title, description }, index) => (
            <article
              key={title}
              className="experience-strip-item group relative min-h-56 px-4 py-8 text-center transition-colors duration-200 hover:bg-brand-blue/[0.025]"
            >
              <div className="mx-auto flex max-w-64 flex-col items-center">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                  Experience 0{index + 1}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutTrust() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-16"
      aria-labelledby="trust-title"
    >
      <div className="mb-6 text-center">
        <h2
          id="trust-title"
          className="text-2xl font-extrabold text-foreground"
        >
          Built on trust, security, and stability
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          FaithConnect is designed to help churches manage people, giving, and
          communication with responsible access, dependable workflows, and
          privacy-aware defaults.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trustCards.map(({ iconSrc, title, description }) => (
          <article
            key={title}
            className="group relative flex min-h-32 items-center gap-4 overflow-hidden rounded-lg border border-border/80 bg-background/80 p-4 shadow-sm backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-md"
          >
            <span
              className={`${sectionIconShellClass} overflow-hidden rounded-full bg-transparent ring-1 ring-border/80`}
            >
              <img
                src={iconSrc}
                alt=""
                aria-hidden="true"
                className="size-full object-cover"
              />
            </span>

            <div className="min-w-0 pr-9">
              <h3 className="text-sm font-extrabold leading-5 text-foreground">
                {title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {description}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="absolute right-4 top-4 inline-flex size-6 items-center justify-center rounded-full border border-brand-blue/20 bg-brand-blue/5 text-[10px] font-extrabold text-brand-blue transition-colors duration-200 group-hover:bg-brand-blue group-hover:text-white"
            >
              FC
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutCta() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-16"
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
