import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Church,
  Cloud,
  CreditCard,
  FileText,
  Heart,
  HeartHandshake,
  Leaf,
  LockKeyhole,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Users,
  UsersRound,
  WalletCards,
} from 'lucide-react'

type SolutionCard = {
  icon: LucideIcon
  title: string
  description: string
  accent: string
}

const audiences: Array<SolutionCard> = [
  {
    icon: UsersRound,
    title: 'For Church Administrators',
    description:
      'Manage members, staff, records, departments, and daily church operations in one place.',
    accent: 'bg-blue-100 text-blue-600',
  },
  {
    icon: UserCheck,
    title: 'For Pastors & Ministry Leaders',
    description:
      'View engagement, pastoral care activity, attendance trends, and communication insights.',
    accent: 'bg-violet-100 text-violet-600',
  },
  {
    icon: WalletCards,
    title: 'For Finance Teams',
    description:
      'Track donations, manage funds, generate receipts, and run finance reports with confidence.',
    accent: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: CalendarDays,
    title: 'For Event Coordinators',
    description:
      'Plan events, manage RSVPs, send reminders, and coordinate volunteers.',
    accent: 'bg-orange-100 text-orange-600',
  },
  {
    icon: HeartHandshake,
    title: 'For Volunteers & Ministry Teams',
    description:
      'Use simple tools for assignments, communication, and role-based access.',
    accent: 'bg-cyan-100 text-cyan-600',
  },
  {
    icon: Heart,
    title: 'For Members & Donors',
    description:
      'Stay connected with announcements, prayer requests, mobile giving, and upcoming events.',
    accent: 'bg-fuchsia-100 text-fuchsia-600',
  },
]

const organizationTypes = [
  {
    icon: Church,
    title: 'Local Churches',
    description: 'Run everyday ministry with simple, connected tools.',
    points: ['Member management', 'Giving and events', 'Ministry coordination'],
    accent: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Building2,
    title: 'Multi-Campus Ministries',
    description: 'Coordinate data, teams, and reporting across locations.',
    points: [
      'Shared visibility',
      'Flexible permissions',
      'Consolidated reporting',
    ],
    accent: 'bg-indigo-100 text-indigo-700',
  },
  {
    icon: HeartHandshake,
    title: 'Faith-Based Nonprofits',
    description: 'Manage donors, programs, and volunteers with clarity.',
    points: ['Donor engagement', 'Program tracking', 'Volunteer coordination'],
    accent: 'bg-rose-100 text-rose-700',
  },
  {
    icon: Leaf,
    title: 'Growing Church Plants',
    description: 'Start simple and scale as your church grows.',
    points: ['Easy setup', 'Member onboarding', 'Affordable scaling'],
    accent: 'bg-emerald-100 text-emerald-700',
  },
]

const roles = [
  {
    icon: UserCheck,
    label: 'Pastors',
    accent: 'bg-violet-100 text-violet-700',
  },
  {
    icon: UsersRound,
    label: 'Admin Teams',
    accent: 'bg-blue-100 text-blue-700',
  },
  {
    icon: WalletCards,
    label: 'Finance Officers',
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: CalendarDays,
    label: 'Volunteers',
    accent: 'bg-orange-100 text-orange-700',
  },
  {
    icon: Heart,
    label: 'Members',
    accent: 'bg-rose-100 text-rose-700',
  },
]

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: 'Secure multi-tenant architecture',
    description: 'Church data remains private and protected.',
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: LockKeyhole,
    title: 'Role-based access control',
    description: 'Permissions align with each person’s responsibilities.',
    accent: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Smartphone,
    title: 'Mobile-first member engagement',
    description: 'Members stay connected wherever ministry happens.',
    accent: 'bg-violet-100 text-violet-700',
  },
  {
    icon: Cloud,
    title: 'Cloud-based availability',
    description: 'Reliable access without maintaining local servers.',
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    icon: BarChart3,
    title: 'Real-time reporting and dashboards',
    description: 'Leaders make informed decisions from current data.',
    accent: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Sparkles,
    title: 'Seamless integrations',
    description: 'Connect the communication and giving tools you use.',
    accent: 'bg-fuchsia-100 text-fuchsia-700',
  },
]

const moduleCards = [
  {
    kicker: 'Church operations & administration',
    title: 'Keep people and ministry records organized',
    icon: Users,
    accent: 'bg-blue-50 text-blue-700',
    items: [
      'Member directory',
      'Households and groups',
      'Roles and permissions',
    ],
    preview: 'members',
  },
  {
    kicker: 'Giving, finance & transparency',
    title: 'Understand every gift and fund',
    icon: CreditCard,
    accent: 'bg-emerald-50 text-emerald-700',
    items: ['Online and recurring giving', 'Fund tracking', 'Donor statements'],
    preview: 'finance',
  },
  {
    kicker: 'Engagement, events & communication',
    title: 'Reach your community at the right time',
    icon: MessageCircle,
    accent: 'bg-violet-50 text-violet-700',
    items: [
      'Events and registrations',
      'Email and SMS',
      'Prayer and care follow-up',
    ],
    preview: 'engagement',
  },
]

export function SolutionPage() {
  return (
    <main className="page-wrap overflow-hidden px-4 pt-28 pb-20 sm:px-6">
      <SolutionHero />
      <AudienceSection />
      <OperationsSection />
      <OrganizationSection />
      <RoleSection />
      <ExperienceSection />
      <TrustSection />
      <SolutionCta />
    </main>
  )
}

function SolutionHero() {
  return (
    <section
      className="relative mx-auto grid w-full max-w-7xl items-center gap-12 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:py-20"
      aria-labelledby="solution-title"
    >
      <div
        className="absolute -top-20 -right-52 -z-10 size-[34rem] rounded-full bg-brand-blue/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="max-w-xl">
        <p className="island-kicker">One connected ministry platform</p>
        <h1
          id="solution-title"
          className="display-title mt-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl"
        >
          Solutions designed for every church and ministry team
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          FaithConnect helps churches, ministries, and faith-based organizations
          streamline administration, strengthen engagement, simplify giving, and
          coordinate events through one secure web and mobile platform.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryLink>Start Your Trial</PrimaryLink>
          <SecondaryLink>Request Demo</SecondaryLink>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-foreground">
          {['For pastors', 'For admin teams', 'For finance', 'For members'].map(
            (label) => (
              <span key={label} className="inline-flex items-center gap-2">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-4 text-brand-blue"
                />
                {label}
              </span>
            ),
          )}
        </div>
      </div>
      <ProductPreview />
    </section>
  )
}

function ProductPreview() {
  return (
    <div
      className="mx-auto grid w-full max-w-4xl items-end gap-4 md:grid-cols-[minmax(0,1fr)_12rem]"
      aria-label="FaithConnect dashboard and mobile app preview"
    >
      <div className="min-w-0 overflow-hidden rounded-xl border border-brand-blue/20 bg-white shadow-2xl shadow-brand-blue/15">
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-amber-400" />
          <span className="size-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[11px] font-bold text-slate-500">
            FaithConnect Dashboard
          </span>
        </div>
        <div className="grid min-h-80 grid-cols-[4.5rem_1fr] sm:grid-cols-[8rem_1fr]">
          <div className="bg-slate-950 p-3 text-white">
            <div className="mb-6 flex items-center gap-2 text-xs font-bold">
              <Church className="size-5 text-blue-400" aria-hidden="true" />
              <span className="hidden sm:inline">FaithConnect</span>
            </div>
            {['Overview', 'Members', 'Giving', 'Events', 'Reports'].map(
              (item, index) => (
                <div
                  key={item}
                  className={`mb-2 rounded px-2 py-2 text-[10px] ${
                    index === 0 ? 'bg-blue-600' : 'text-slate-400'
                  }`}
                >
                  <span className="hidden sm:inline">{item}</span>
                  <span
                    className="mx-auto block size-1.5 rounded-full bg-current sm:hidden"
                    aria-hidden="true"
                  />
                </div>
              ),
            )}
          </div>
          <div className="min-w-0 bg-slate-50 p-3 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500">Welcome back</p>
                <p className="text-sm font-extrabold text-slate-900">
                  Ministry overview
                </p>
              </div>
              <Bell className="size-4 text-amber-500" aria-hidden="true" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ['Members', '2,450'],
                ['Giving', '$18,900'],
                ['Events', '12'],
                ['New families', '28'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-white p-2 shadow-sm">
                  <p className="text-[9px] text-slate-500">{label}</p>
                  <p className="mt-1 text-xs font-extrabold tabular-nums text-slate-900">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_0.8fr]">
              <div className="rounded-md bg-white p-3 shadow-sm">
                <p className="text-[10px] font-bold text-slate-700">
                  Engagement growth
                </p>
                <div className="mt-5 flex h-24 items-end gap-2 border-b border-l border-slate-200 px-2">
                  {[34, 48, 41, 62, 55, 76, 68, 88].map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="flex-1 rounded-t-sm bg-blue-500/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-md bg-white p-3 shadow-sm">
                <p className="text-[10px] font-bold text-slate-700">
                  Ministry activity
                </p>
                <div className="mt-3 space-y-3">
                  {[
                    'New member joined',
                    'Donation received',
                    'Event updated',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-blue-500" />
                      <span className="truncate text-[9px] text-slate-500">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-48 overflow-hidden rounded-[2rem] border-[6px] border-slate-950 bg-slate-50 shadow-2xl">
        <div className="relative min-h-[22rem] p-3 pb-14">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-300" />

          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-[8px] text-slate-500">Good morning,</p>
              <p className="truncate text-xs font-extrabold text-slate-900">
                Jonathan
              </p>
            </div>
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-sm">
              <Bell className="size-3.5" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-4 rounded-xl bg-blue-600 p-3 text-white shadow-md">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4" aria-hidden="true" />
              <p className="text-[8px] font-bold text-blue-100">Next event</p>
            </div>
            <p className="mt-2 text-[11px] font-extrabold">Sunday Worship</p>
            <p className="mt-1 text-[8px] text-blue-100">June 14 at 9:00 AM</p>
            <span className="mt-3 inline-flex rounded-full bg-white/15 px-2 py-1 text-[8px] font-bold">
              View details
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white p-2 text-center shadow-sm">
              <span className="mx-auto inline-flex size-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CreditCard className="size-3.5" aria-hidden="true" />
              </span>
              <p className="mt-1 text-[8px] font-bold text-slate-800">Give</p>
            </div>
            <div className="rounded-lg bg-white p-2 text-center shadow-sm">
              <span className="mx-auto inline-flex size-7 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <HeartHandshake className="size-3.5" aria-hidden="true" />
              </span>
              <p className="mt-1 text-[8px] font-bold text-slate-800">Prayer</p>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-white p-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-extrabold text-slate-800">
                Latest update
              </p>
              <span className="text-[7px] font-bold text-blue-600">
                View all
              </span>
            </div>
            <p className="mt-2 text-[8px] font-bold text-slate-700">
              Community food drive
            </p>
            <p className="mt-1 line-clamp-2 text-[7px] leading-3 text-slate-500">
              Donations and volunteers are welcome this Saturday.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 left-0 grid grid-cols-4 border-t border-slate-200 bg-white px-2 py-2">
            {[
              [Church, 'Home', 'text-blue-600'],
              [CalendarDays, 'Events', 'text-violet-600'],
              [CreditCard, 'Give', 'text-emerald-600'],
              [Users, 'Connect', 'text-orange-600'],
            ].map(([Icon, label, iconColor], index) => {
              const NavIcon = Icon as LucideIcon
              return (
                <div
                  key={label as string}
                  className={`flex flex-col items-center gap-1 ${iconColor as string} ${
                    index === 0 ? '' : 'opacity-75'
                  }`}
                >
                  <NavIcon className="size-3.5" aria-hidden="true" />
                  <span className="text-[6px] font-bold">
                    {label as string}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function AudienceSection() {
  return (
    <PageSection
      kicker="Solutions for every calling"
      title="Find the right solution for your ministry"
      description="Purpose-built experiences give every team the tools they need without unnecessary complexity."
      id="audiences"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {audiences.map(({ icon: Icon, title, description, accent }) => (
          <article
            key={title}
            className="flex gap-4 rounded-xl border border-border bg-background p-5 shadow-sm"
          >
            <span
              className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full ${accent}`}
            >
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  )
}

function OperationsSection() {
  return (
    <PageSection
      kicker="One system, less busywork"
      title="Built for the way modern churches operate"
      id="operations"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {moduleCards.map((module) => (
          <article
            key={module.title}
            className="overflow-hidden rounded-xl border border-border bg-background shadow-sm"
          >
            <div className="p-5">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex size-10 items-center justify-center rounded-lg ${module.accent}`}
                >
                  <module.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {module.kicker}
                </p>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-foreground">
                {module.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {module.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="size-4 shrink-0 text-brand-blue"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ModulePreview variant={module.preview} />
          </article>
        ))}
      </div>
    </PageSection>
  )
}

function ModulePreview({ variant }: { variant: string }) {
  return (
    <div
      className="min-h-48 border-t border-border bg-slate-100 p-4"
      aria-hidden="true"
    >
      {variant === 'members' ? <MembersPreview /> : null}
      {variant === 'finance' ? <FinancePreview /> : null}
      {variant === 'engagement' ? <EngagementPreview /> : null}
    </div>
  )
}

function PreviewHeader({ title, action }: { title: string; action: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <p className="truncate text-[11px] font-extrabold text-slate-800">
        {title}
      </p>
      <span className="shrink-0 rounded bg-blue-100 px-2 py-1 text-[8px] font-bold text-blue-700">
        {action}
      </span>
    </div>
  )
}

function MembersPreview() {
  const members = [
    ['AM', 'Angela Morris', 'Pastoral care'],
    ['JD', 'James Davis', 'Worship team'],
    ['SK', 'Sarah Kim', 'New member'],
  ]

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <PreviewHeader title="Member directory" action="+ Add member" />
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          ['2,450', 'Members'],
          ['184', 'Families'],
          ['38', 'Groups'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-md bg-blue-50 p-2">
            <p className="text-xs font-extrabold tabular-nums text-slate-900">
              {value}
            </p>
            <p className="text-[8px] text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {members.map(([initials, name, role]) => (
          <div
            key={name}
            className="grid grid-cols-[1.75rem_1fr_auto] items-center gap-2 rounded-md border border-slate-100 px-2 py-1.5"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-[8px] font-extrabold text-white">
              {initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[9px] font-bold text-slate-800">
                {name}
              </span>
              <span className="block truncate text-[8px] text-slate-500">
                {role}
              </span>
            </span>
            <span className="size-2 rounded-full bg-emerald-500" />
          </div>
        ))}
      </div>
    </div>
  )
}

function FinancePreview() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <PreviewHeader title="Giving overview" action="View report" />
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[8px] text-slate-500">Giving this month</p>
          <p className="text-lg font-extrabold tabular-nums text-slate-900">
            $18,900
          </p>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[8px] font-bold text-emerald-700">
          +12.4%
        </span>
      </div>
      <div className="flex h-24 items-end gap-2 border-b border-slate-200">
        {[46, 72, 55, 88, 68, 94].map((height, index) => (
          <span
            key={`${height}-${index}`}
            className="flex-1 rounded-t bg-emerald-500/80"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function EngagementPreview() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <PreviewHeader title="Engagement center" action="+ New message" />
      <div className="grid grid-cols-[0.85fr_1.15fr] gap-3">
        <div className="rounded-md bg-violet-50 p-2">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-extrabold text-slate-800">June</p>
            <CalendarDays className="size-3 text-violet-600" />
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {Array.from({ length: 21 }, (_, index) => (
              <span
                key={index}
                className={`aspect-square rounded-sm text-center text-[6px] leading-[14px] ${
                  index === 10 || index === 16
                    ? 'bg-violet-600 font-bold text-white'
                    : 'bg-white text-slate-500'
                }`}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {[
            ['Sunday Service', '9:00 AM', 'bg-violet-500'],
            ['Youth Gathering', '6:30 PM', 'bg-blue-500'],
            ['Prayer Meeting', '7:00 PM', 'bg-emerald-500'],
          ].map(([title, time, color]) => (
            <div
              key={title}
              className="flex items-center gap-2 rounded-md border border-slate-100 p-2"
            >
              <span className={`h-8 w-1 shrink-0 rounded-full ${color}`} />
              <span className="min-w-0">
                <span className="block truncate text-[9px] font-bold text-slate-800">
                  {title}
                </span>
                <span className="block text-[8px] text-slate-500">{time}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OrganizationSection() {
  return (
    <PageSection
      kicker="Flexible by design"
      title="Solutions by organization type"
      id="organizations"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {organizationTypes.map(
          ({ icon: Icon, title, description, points, accent }) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <span
                className={`inline-flex size-12 items-center justify-center rounded-xl ${accent}`}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
              <ul className="mt-4 space-y-2">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-xs font-semibold text-foreground"
                  >
                    <Check
                      className="size-3 text-emerald-600"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ),
        )}
      </div>
    </PageSection>
  )
}

function RoleSection() {
  return (
    <PageSection
      kicker="The right access for every person"
      title="Role-based experiences for every user"
      id="roles"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {roles.map(({ icon: Icon, label, accent }) => (
          <article
            key={label}
            className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-border bg-background p-4 text-center shadow-sm"
          >
            <span
              className={`inline-flex size-10 items-center justify-center rounded-full ${accent}`}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-3 text-sm font-extrabold text-foreground">
              {label}
            </h3>
          </article>
        ))}
      </div>
    </PageSection>
  )
}

function ExperienceSection() {
  return (
    <PageSection
      kicker="Connected everywhere"
      title="One platform across web and mobile"
      description="Changes stay synchronized so leaders can manage ministry from the dashboard while members connect through the mobile experience."
      id="experience"
    >
      <div className="grid items-center gap-8 rounded-2xl bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                MonitorSmartphone,
                'Admin dashboard',
                'Operate church workflows',
                'text-blue-400',
              ],
              [
                Smartphone,
                'Member mobile app',
                'Give, connect, and participate',
                'text-violet-400',
              ],
              [
                RefreshCw,
                'Real-time sync',
                'Keep records current everywhere',
                'text-emerald-400',
              ],
              [
                Bell,
                'Smart notifications',
                'Reach the right people quickly',
                'text-amber-400',
              ],
            ].map(([Icon, title, description, iconColor]) => {
              const ExperienceIcon = Icon as LucideIcon
              return (
                <article
                  key={title as string}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <ExperienceIcon
                    className={`size-6 ${iconColor as string}`}
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-extrabold text-white">
                    {title as string}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    {description as string}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-4 text-slate-900 shadow-2xl">
          <p className="text-xs font-bold text-slate-500">Sunday overview</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums">1,248</p>
          <p className="text-xs text-slate-500">people connected this week</p>
          <div className="mt-5 space-y-3">
            {[
              ['Attendance', '82%'],
              ['Volunteer roles filled', '94%'],
              ['Messages opened', '76%'],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="flex justify-between text-xs font-semibold">
                  <span>{label}</span>
                  <span className="tabular-nums">{value}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-blue"
                    style={{ width: value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  )
}

function TrustSection() {
  return (
    <PageSection
      kicker="Designed for confidence"
      title="Why churches choose FaithConnect"
      id="trust"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trustFeatures.map(({ icon: Icon, title, description, accent }) => (
          <article
            key={title}
            className="flex gap-4 rounded-xl border border-border bg-background p-5 shadow-sm"
          >
            <span
              className={`inline-flex size-10 shrink-0 items-center justify-center rounded-lg ${accent}`}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-extrabold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-muted-foreground">
        <span className="mr-2">Connect with tools for</span>
        {[
          [Mail, 'Email', 'bg-blue-100 text-blue-700'],
          [MessageCircle, 'Messaging', 'bg-violet-100 text-violet-700'],
          [CreditCard, 'Payments', 'bg-emerald-100 text-emerald-700'],
          [FileText, 'Reporting', 'bg-orange-100 text-orange-700'],
        ].map(([Icon, label, accent]) => {
          const IntegrationIcon = Icon as LucideIcon
          return (
            <span
              key={label as string}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4"
            >
              <span
                className={`inline-flex size-7 items-center justify-center rounded-full ${accent as string}`}
              >
                <IntegrationIcon className="size-4" aria-hidden="true" />
              </span>
              {label as string}
            </span>
          )
        })}
      </div>
    </PageSection>
  )
}

function SolutionCta() {
  return (
    <section
      className="mx-auto w-full max-w-7xl py-12"
      aria-labelledby="solution-cta-title"
    >
      <div className="relative overflow-hidden rounded-2xl bg-brand-blue p-6 text-white shadow-xl sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div
          className="absolute -right-20 -bottom-32 size-72 rounded-full bg-violet-400/30 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-white/75">
            See how FaithConnect fits your ministry
          </p>
          <h2
            id="solution-cta-title"
            className="mt-3 text-3xl font-extrabold text-white"
          >
            Explore a secure, scalable solution for church administration,
            engagement, and giving.
          </h2>
        </div>
        <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
          <Link
            to="/contact"
            className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold !text-brand-blue no-underline transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            Get Started
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 touch-manipulation items-center justify-center rounded-md border border-white/70 px-5 py-3 text-sm font-semibold !text-white no-underline transition-colors hover:bg-white hover:!text-brand-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  )
}

function PageSection({
  kicker,
  title,
  description,
  id,
  children,
}: {
  kicker: string
  title: string
  description?: string
  id: string
  children: React.ReactNode
}) {
  return (
    <section
      className="mx-auto w-full max-w-7xl scroll-mt-28 py-12"
      aria-labelledby={`${id}-title`}
    >
      <div className="mb-7 max-w-3xl">
        <p className="island-kicker">{kicker}</p>
        <h2
          id={`${id}-title`}
          className="mt-3 text-2xl font-extrabold text-foreground sm:text-3xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function PrimaryLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      to="/contact"
      className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold !text-white no-underline transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  )
}

function SecondaryLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      to="/contact"
      className="inline-flex min-h-11 touch-manipulation items-center justify-center rounded-md border border-brand-blue px-5 py-3 text-sm font-semibold text-brand-blue no-underline transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
    >
      {children}
    </Link>
  )
}
