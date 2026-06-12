import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  Church,
  Cloud,
  CreditCard,
  Database,
  Eye,
  FileText,
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  MessageCircle,
  MonitorSmartphone,
  PanelTop,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  UsersRound,
  Wifi,
} from 'lucide-react'
import AboutOrigin from '#/components/AboutSection'

const metricChips = [
  {
    icon: Building2,
    label: 'Built for churches',
    value: 'Multi-site ready',
  },
  {
    icon: ShieldCheck,
    label: 'Secure platform',
    value: 'Cloud protected',
  },
  {
    icon: HeartHandshake,
    label: 'Faith-first tools',
    value: 'Engage members',
  },
  {
    icon: MonitorSmartphone,
    label: 'Mobile and web',
    value: 'Instant connectivity',
  },
]

const iconColorClasses = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-amber-100 text-amber-600',
  'bg-green-100 text-green-600',
  'bg-rose-100 text-rose-600',
  'bg-cyan-100 text-cyan-600',
] as const

const valueCards = [
  {
    icon: HeartHandshake,
    title: 'Our Mission',
    description:
      'To empower churches and faith-based organizations with modern, simple tools that strengthen connection, engagement, stewardship, and spiritual growth.',
    colorClass: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'A world where every ministry, regardless of size, has the tools to care for members, serve communities, and communicate with confidence.',
    colorClass: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Sparkles,
    title: 'Our Core Values',
    description:
      'We build with service, simplicity, trust, security, community, and thoughtful innovation at the center of every product decision.',
    colorClass: 'bg-amber-100 text-amber-600',
  },
]

const coreValues = [
  {
    icon: HeartHandshake,
    title: 'Serve churches',
    description: 'We put ministry needs and people first.',
  },
  {
    icon: CheckCircle2,
    title: 'Simplicity',
    description: 'We make powerful tools easy to use.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'We build trust through responsible decisions.',
  },
  {
    icon: LockKeyhole,
    title: 'Security',
    description: 'We protect sensitive church and member data.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We help people stay connected and cared for.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We improve ministry work with thoughtful technology.',
  },
]

const featureCards = [
  {
    icon: Users,
    title: 'Member Management',
    description:
      'Organize member profiles, households, groups, and ministry involvement.',
  },
  {
    icon: CreditCard,
    title: 'Giving & Donations',
    description:
      'Track donations, recurring gifts, funds, and contribution records.',
  },
  {
    icon: CalendarDays,
    title: 'Events & RSVP',
    description:
      'Create church events, manage registrations, and monitor attendance.',
  },
  {
    icon: MessageCircle,
    title: 'Announcements',
    description:
      'Share important updates across web, mobile, email, and SMS channels.',
  },
  {
    icon: HeartHandshake,
    title: 'Prayer Requests',
    description: 'Collect, organize, and follow up on prayer needs with care.',
  },
  {
    icon: BarChart3,
    title: 'Reports & Insights',
    description:
      'Understand engagement, giving, attendance, and ministry growth.',
  },
  {
    icon: UserCheck,
    title: 'Role-Based Access',
    description:
      'Give staff and volunteers the right access for their responsibilities.',
  },
  {
    icon: FileText,
    title: 'Member Records',
    description: 'Keep notes, documents, and ministry history easy to find.',
  },
  {
    icon: Settings,
    title: 'Church Settings',
    description:
      'Configure ministries, campuses, permissions, and communication preferences.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Keep members informed with timely reminders and follow-ups.',
  },
]

const benefitCards = [
  {
    icon: Church,
    title: 'Local Churches',
    description:
      'Support day-to-day operations by keeping members, communication, giving, and ministry activity organized in one place.',
  },
  {
    icon: BarChart3,
    title: 'Growing Ministries',
    description:
      'Understand engagement, coordinate teams, and scale outreach without adding unnecessary administrative work.',
  },
  {
    icon: Building2,
    title: 'Multi-Campus Churches',
    description:
      'Manage multiple locations with shared visibility, flexible permissions, and consistent member experiences.',
  },
  {
    icon: UsersRound,
    title: 'Faith-Based Nonprofits',
    description:
      'Coordinate volunteers, programs, communications, and community impact with tools built for service.',
  },
]

const experienceCards = [
  {
    icon: PanelTop,
    title: 'Web Admin Platform',
    description:
      'Manage staff, members, giving, events, reports, and communications from a focused church operations dashboard.',
  },
  {
    icon: Cloud,
    title: 'Cloud-Based Church Hub',
    description:
      'Keep ministry data connected, secure, and available to approved teams wherever church work happens.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Mobile Member Experience',
    description:
      'Give members easy access to updates, giving, events, prayer requests, and church communication on the go.',
  },
]

const trustCards = [
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description:
      'Protect church access with modern authentication patterns and clear permission boundaries.',
  },
  {
    icon: LockKeyhole,
    title: 'Role-Based Permissions',
    description:
      'Give admins, staff, volunteers, and members access only to the tools and records they need.',
  },
  {
    icon: Database,
    title: 'Data Protection',
    description:
      'Keep member, giving, attendance, and ministry records organized with security-first handling.',
  },
  {
    icon: Cloud,
    title: 'Cloud Reliability',
    description:
      'Support ministry work with a platform designed for consistent access across web and mobile.',
  },
  {
    icon: UserCheck,
    title: 'Privacy Controls',
    description:
      'Respect sensitive member information with thoughtful controls for visibility and stewardship.',
  },
  {
    icon: Wifi,
    title: 'Reliable Reporting',
    description:
      'Give leaders dependable insights for engagement, giving, events, and operational decisions.',
  },
]

const statCards = [
  {
    icon: Users,
    value: '1,850+',
    label: 'Churches Supported',
    description: 'Built to support growing ministries and faith communities.',
  },
  {
    icon: HeartHandshake,
    value: '425,000+',
    label: 'Members Connected',
    description: 'Helping churches care for people across web and mobile.',
  },
  {
    icon: CreditCard,
    value: '$85M+',
    label: 'Donations Processed',
    description: 'Supporting giving workflows with clarity and confidence.',
  },
  {
    icon: CalendarDays,
    value: '22,400+',
    label: 'Events Coordinated',
    description: 'Keeping registrations, attendance, and reminders organized.',
  },
  {
    icon: TrendingUp,
    value: '78%',
    label: 'Engagement Growth',
    description: 'Helping leaders understand participation and follow-up.',
  },
  {
    icon: ShieldCheck,
    value: '99.9%',
    label: 'Platform Uptime',
    description: 'Designed for dependable access when ministry work happens.',
  },
]

export function AboutPage() {
  return (
    <section className="page-wrap px-4 pt-32 pb-20 sm:px-6">
      <div className="max-w-3xl">
        <p className="island-kicker">About FaithConnect</p>
        <h1 className="display-title mt-4 text-4xl font-bold text-foreground sm:text-5xl">
          Helping Faith Communities Connect and Grow Together.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          FaithConnect is a secure church management SaaS platform that helps
          churches and faith-based organizations manage members, giving events,
          communication, and engagement across web and mobile-so you can focus
          on what matters most : your mission.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold !text-white no-underline transition-colors hover:bg-blue-700 hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
          >
            Get started
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-blue px-5 py-3 text-sm font-semibold text-brand-blue no-underline transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
          >
            Request Demo
          </Link>
        </div>

        <AboutMetricChips />
      </div>

      <AboutOrigin />

      <AboutValues />

      <AboutFeatures />

      <AboutBenefits />

      <AboutExperience />

      <AboutTrust />

      <AboutStats />

      <AboutCta />
    </section>
  )
}

function AboutMetricChips() {
  return (
    <div
      className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="FaithConnect platform highlights"
    >
      {metricChips.map(({ icon: Icon, label, value }, index) => (
        <div
          key={label}
          className="flex min-h-16 items-center gap-3 rounded-md border border-border bg-background px-4 py-3 shadow-sm"
        >
          <span
            className={`inline-flex size-9 shrink-0 items-center justify-center rounded-md ${iconColorClasses[index % iconColorClasses.length]}`}
          >
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold text-foreground">
              {value}
            </span>
            <span className="block truncate text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

function AboutValues() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-12"
      aria-labelledby="values-title"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {valueCards.map(({ icon: Icon, title, description, colorClass }) => (
          <article
            key={title}
            className="rounded-lg border border-border bg-background p-5 shadow-sm"
          >
            <span
              className={`inline-flex size-11 items-center justify-center rounded-full ${colorClass}`}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h2
              id={title === 'Our Mission' ? 'values-title' : undefined}
              className="mt-4 text-lg font-extrabold text-foreground"
            >
              {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {coreValues.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className="rounded-lg border border-border bg-background p-4 shadow-sm"
          >
            <span
              className={`inline-flex size-9 items-center justify-center rounded-md ${iconColorClasses[index % iconColorClasses.length]}`}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-extrabold text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutFeatures() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-12"
      aria-labelledby="features-title"
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">What FaithConnect delivers</p>
          <h2
            id="features-title"
            className="mt-3 text-2xl font-extrabold text-foreground"
          >
            Built for daily ministry workflows
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          A connected set of tools for people, giving, communication, events,
          reporting, and day-to-day church operations.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {featureCards.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className="flex min-h-36 flex-col rounded-lg border border-border bg-background p-4 shadow-sm"
          >
            <span
              className={`inline-flex size-9 items-center justify-center rounded-md ${iconColorClasses[index % iconColorClasses.length]}`}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-extrabold text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutBenefits() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-12"
      aria-labelledby="benefits-title"
    >
      <div className="mb-5">
        <p className="island-kicker">Built for churches of every size</p>
        <h2
          id="benefits-title"
          className="mt-3 text-2xl font-extrabold text-foreground"
        >
          Practical benefits for every ministry model
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {benefitCards.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className="flex min-h-52 flex-col rounded-lg border border-border bg-background p-5 shadow-sm"
          >
            <span
              className={`inline-flex size-11 items-center justify-center rounded-md ${iconColorClasses[index % iconColorClasses.length]}`}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-foreground">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutExperience() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-12"
      aria-labelledby="experience-title"
    >
      <div className="mb-5">
        <p className="island-kicker">
          One platform. Three connected experiences.
        </p>
        <h2
          id="experience-title"
          className="mt-3 text-2xl font-extrabold text-foreground"
        >
          Built around how churches actually work
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {experienceCards.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className="relative overflow-hidden rounded-lg border border-border bg-background p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span
                className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md ${iconColorClasses[index % iconColorClasses.length]}`}
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Experience {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutTrust() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-12"
      aria-labelledby="trust-title"
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker">
            Built on trust, security, and stability
          </p>
          <h2
            id="trust-title"
            className="mt-3 text-2xl font-extrabold text-foreground"
          >
            Confidence for sensitive ministry data
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          FaithConnect is designed to help churches manage people, giving, and
          communication with responsible access, dependable workflows, and
          privacy-aware defaults.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {trustCards.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className="flex min-h-36 items-start gap-4 rounded-lg border border-border bg-background p-4 shadow-sm"
          >
            <span
              className={`inline-flex size-10 shrink-0 items-center justify-center rounded-md ${iconColorClasses[index % iconColorClasses.length]}`}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutStats() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-12"
      aria-labelledby="stats-title"
    >
      <div className="mb-5">
        <p className="island-kicker">Real impact. Real ministries.</p>
        <h2
          id="stats-title"
          className="mt-3 text-2xl font-extrabold text-foreground"
        >
          Helping churches build stronger community
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map(({ icon: Icon, value, label, description }, index) => (
          <article
            key={label}
            className="rounded-lg border border-border bg-background p-4 shadow-sm"
          >
            <span
              className={`inline-flex size-10 items-center justify-center rounded-md ${iconColorClasses[index % iconColorClasses.length]}`}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-4 text-2xl font-extrabold tabular-nums text-foreground">
              {value}
            </p>
            <h3 className="mt-1 text-sm font-bold text-foreground">{label}</h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutCta() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-12"
      aria-labelledby="about-cta-title"
    >
      <div className="rounded-lg border border-brand-blue/20 bg-brand-blue p-6 text-white shadow-lg sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-white/80">
            Join the churches building stronger communities
          </p>
          <h2
            id="about-cta-title"
            className="mt-3 text-3xl font-extrabold text-white"
          >
            Connect your church with FaithConnect.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/85">
            Simplify operations, strengthen relationships, and give your team
            the tools to serve members with confidence.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
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
