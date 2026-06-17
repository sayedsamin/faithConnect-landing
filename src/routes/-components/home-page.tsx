import {
  Bell,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  Church,
  Cloud,
  Database,
  DollarSign,
  FileText,
  Heart,
  Home,
  Lock,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  Phone,
  QrCode,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import type { ComponentProps, ComponentType, ReactNode } from 'react'

import { CtaBanner } from '#/components/cta-banner'

const trustedChurches = [
  'Grace Church',
  'New Life Centre',
  'Hope Community',
  'Bethel Church',
  'Revive Church',
  'City Chapel',
]

const heroStats = [
  { icon: Users, value: '2,450', label: 'Members' },
  { icon: DollarSign, value: '$18,900', label: 'Monthly Giving' },
  { icon: CalendarDays, value: '24', label: 'Upcoming Events' },
  { icon: ChartNoAxesColumnIncreasing, value: '98%', label: 'Engagement' },
]

const adminTools = [
  {
    icon: Users,
    title: 'Manage Members',
    text: 'Maintain member profiles and directories.',
  },
  {
    icon: Heart,
    title: 'Process Donations',
    text: 'Track giving and financial summaries.',
  },
  {
    icon: CalendarDays,
    title: 'Coordinate Events',
    text: 'Manage registrations, schedules, and volunteers.',
  },
  {
    icon: MessageCircle,
    title: 'Communicate with Congregants',
    text: 'Send messages, updates, and newsletters.',
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: 'Access Reports',
    text: 'Generate insights on membership, donations, and engagement.',
  },
]

const mobileAudiences = [
  {
    icon: Users,
    title: 'For Church Members',
    text: 'View announcements, update profiles, join groups, register for events, and stay connected.',
  },
  {
    icon: Heart,
    title: 'For Donors',
    text: 'Give securely, view donation history, receive receipts, and support church campaigns.',
  },
  {
    icon: Users,
    title: 'For Volunteers',
    text: 'See upcoming opportunities, sign up for roles, receive reminders, and track responsibilities.',
  },
  {
    icon: UserIcon,
    title: 'For General Users and Guests',
    text: 'Explore church information, submit guest forms, register interest, and learn about programs.',
  },
]

const reportingTopics = [
  ['Membership growth', Users],
  ['New guests and follow-ups', UserIcon],
  ['Donation trends', Heart],
  ['Event participation', CalendarDays],
  ['Volunteer engagement', ShieldCheck],
  ['Communication reach', MessageCircle],
  ['Department and ministry activity', Church],
]

const securityFeatures = [
  ['Secure organizational accounts', Church],
  ['Role-based permissions', Users],
  ['Encrypted user access', Lock],
  ['Donation record protection', Heart],
  ['Admin activity tracking', FileText],
  ['Data separation between churches', Database],
]

function UserIcon(props: ComponentProps<typeof Users>) {
  return <Users {...props} />
}

function BrandWord({ children }: { children: ReactNode }) {
  return <span className="text-brand-blue">{children}</span>
}

function IconTile({
  icon: Icon,
  className = '',
}: {
  icon: ComponentType<{ className?: string }>
  className?: string
}) {
  return (
    <span
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue ${className}`}
    >
      <Icon className="size-6" aria-hidden="true" />
    </span>
  )
}

function MiniFeatureCard({
  icon,
  title,
  text,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  text: string
}) {
  return (
    <article className="feature-card rounded-lg border border-brand-blue/10 p-5">
      <div className="flex min-w-0 items-start gap-4">
        <IconTile icon={icon} />
        <div className="min-w-0">
          <h3 className="text-base font-extrabold text-brand-dark">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-brand-dark/68">{text}</p>
        </div>
      </div>
    </article>
  )
}

function ToolRow({
  icon,
  title,
  text,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  text: string
}) {
  return (
    <article className="group flex min-h-20 items-center gap-4 rounded-lg border border-brand-blue/10 bg-white/86 p-4 shadow-[0_14px_28px_rgb(0_14_53/0.06)]">
      <IconTile icon={icon} className="size-11 rounded-md" />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-extrabold text-brand-dark">{title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-brand-dark/64">
          {text}
        </p>
      </div>
      <ChevronRight
        className="size-5 shrink-0 text-brand-dark/50 transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </article>
  )
}

function HeroDashboard() {
  return (
    <div className="relative mx-auto min-h-[360px] w-full max-w-[760px] lg:min-h-[470px]">
      <div className="absolute right-0 top-2 hidden h-52 w-52 rounded-full bg-brand-blue/10 blur-3xl sm:block" />
      <div className="relative rounded-[1.35rem] border-[8px] border-brand-dark bg-brand-dark shadow-[0_30px_70px_rgb(0_14_53/0.24)]">
        <div className="overflow-hidden rounded-xl bg-white">
          <div className="grid min-h-[330px] grid-cols-[118px_1fr] sm:min-h-[410px]">
            <aside className="bg-brand-dark p-4 text-white">
              <div className="mb-7 flex items-center gap-2 text-xs font-extrabold">
                <Sparkles className="size-4 text-white" aria-hidden="true" />
                FaithConnect
              </div>
              {[
                'Dashboard',
                'Members',
                'Giving',
                'Events',
                'Attendance',
                'Reports',
              ].map((item, index) => (
                <div
                  key={item}
                  className={`mb-2 rounded-md px-3 py-2 text-[0.68rem] font-bold ${
                    index === 0 ? 'bg-brand-blue text-white' : 'text-white/62'
                  }`}
                >
                  {item}
                </div>
              ))}
            </aside>
            <main className="min-w-0 bg-white p-4 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-extrabold text-brand-dark">
                  Dashboard
                </h2>
                <div className="flex gap-2">
                  <span className="size-8 rounded-full bg-brand-blue/8" />
                  <span className="size-8 rounded-full bg-brand-blue/8" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  ['Members', '2,450', '+6.8% this month'],
                  ['Monthly Giving', '$18,900', '+12% this month'],
                  ['Attendance', '1,320', '+4.1% this month'],
                  ['Upcoming Events', '24', 'Next 30 days'],
                ].map(([label, value, delta]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-brand-blue/10 bg-white p-3 shadow-sm"
                  >
                    <p className="text-[0.62rem] font-bold text-brand-dark/52">
                      {label}
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-brand-blue">
                      {value}
                    </p>
                    <p className="text-[0.56rem] font-bold text-emerald-500">
                      {delta}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                <div className="rounded-lg border border-brand-blue/10 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-brand-dark">
                      Giving Overview
                    </h3>
                    <span className="text-[0.6rem] font-extrabold text-brand-blue">
                      View all
                    </span>
                  </div>
                  <div className="flex h-36 items-end gap-3 border-b border-l border-brand-blue/10 px-2 pb-2">
                    {[26, 46, 38, 62, 55, 78, 92].map((height, index) => (
                      <div key={index} className="flex flex-1 items-end gap-1">
                        <span
                          className="block flex-1 rounded-t-sm bg-brand-blue/35"
                          style={{ height: `${height}%` }}
                        />
                        <span
                          className="block flex-1 rounded-t-sm bg-brand-blue"
                          style={{ height: `${Math.min(height + 14, 100)}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 rounded-lg border border-brand-blue/10 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-brand-dark">
                      Upcoming Events
                    </h3>
                    <span className="text-[0.6rem] font-extrabold text-brand-blue">
                      View all
                    </span>
                  </div>
                  {['Youth Night', 'Worship Service', 'Community Outreach'].map(
                    (item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <span
                          className={`size-8 rounded-full ${
                            index === 0
                              ? 'bg-brand-blue'
                              : index === 1
                                ? 'bg-brand-dark'
                                : 'bg-sky-400'
                          }`}
                        />
                        <div>
                          <p className="text-[0.68rem] font-extrabold text-brand-dark">
                            {item}
                          </p>
                          <p className="text-[0.58rem] text-brand-dark/50">
                            May {19 + index}, 2026
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-brand-blue/10 p-4">
                <h3 className="text-xs font-extrabold text-brand-dark">
                  Recent Announcement
                </h3>
                <p className="mt-2 text-[0.68rem] leading-5 text-brand-dark/62">
                  Sunday service begins at 10:00 AM. Reminder sent to members.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
      <MobilePhoneMockup className="absolute -right-1 bottom-0 hidden w-[185px] lg:block" />
    </div>
  )
}

function MobilePhoneMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`${className} rounded-[2rem] border-[7px] border-brand-dark bg-brand-dark shadow-[0_24px_50px_rgb(0_14_53/0.28)]`}
    >
      <div className="overflow-hidden rounded-[1.45rem] bg-white">
        <div className="relative bg-brand-blue px-4 pb-5 pt-7 text-white">
          <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-brand-dark" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.58rem] text-white/72">Welcome back,</p>
              <h3 className="text-base font-extrabold">Jonathan!</h3>
            </div>
            <span className="size-8 rounded-full bg-white/30" />
          </div>
        </div>
        <div className="-mt-3 space-y-3 px-3 pb-4">
          <div className="rounded-lg bg-white p-3 shadow-lg">
            <p className="text-[0.68rem] font-extrabold text-brand-dark">
              Prayer Requests
            </p>
            {[
              'Pray for my family',
              'Healing for a friend',
              'Guidance in decisions',
            ].map((item) => (
              <p key={item} className="mt-2 text-[0.56rem] text-brand-dark/58">
                <span className="mr-1 text-emerald-500">•</span>
                {item}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ['Give', Heart],
              ['Events', CalendarDays],
              ['Message', Megaphone],
            ].map(([label, Icon]) => (
              <div
                key={label as string}
                className="rounded-lg bg-brand-blue/8 p-2"
              >
                <Icon
                  className="mx-auto size-4 text-brand-blue"
                  aria-hidden="true"
                />
                <p className="mt-1 text-[0.52rem] font-bold text-brand-dark">
                  {label as string}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="mb-2 flex justify-between text-[0.58rem] font-bold">
              <span>Recent Giving</span>
              <span className="text-brand-blue">View all</span>
            </div>
            <p className="text-[0.54rem] text-brand-dark/58">
              Apr 18, 2026 <span className="float-right">$100.00</span>
            </p>
            <p className="mt-2 text-[0.54rem] text-brand-dark/58">
              Apr 14, 2026 <span className="float-right">$75.00</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function WebAppMockup() {
  return (
    <div className="rounded-[1.35rem] border border-brand-blue/10 bg-white p-4 shadow-[0_24px_70px_rgb(0_14_53/0.12)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-blue/10 pb-5">
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-brand-blue" aria-hidden="true" />
          <span className="text-base font-extrabold text-brand-dark">
            FaithConnect
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-brand-blue/10 px-4 py-2 text-xs font-bold text-brand-dark/70">
            Hope Community Church
          </span>
          <Bell className="size-5 text-brand-dark/50" aria-hidden="true" />
          <span className="size-8 rounded-full bg-brand-blue/20" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2 rounded-lg border border-brand-blue/10 p-1 text-center text-xs font-extrabold text-brand-dark/68">
        {['Members', 'Donations', 'Events', 'Messages', 'Reports'].map(
          (item, index) => (
            <span
              key={item}
              className={`rounded-md px-2 py-3 ${
                index === 0 ? 'bg-brand-blue/8 text-brand-blue' : ''
              }`}
            >
              {item}
            </span>
          ),
        )}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <MetricPanel
          title="Member Overview"
          value="1,248"
          label="Total members"
        />
        <MetricPanel
          title="Giving Summary"
          value="$24,780"
          label="This month"
        />
        <div className="rounded-lg border border-brand-blue/10 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-brand-dark">
              Upcoming Events
            </h3>
            <span className="text-xs font-extrabold text-brand-blue">
              View all
            </span>
          </div>
          {['Sunday Worship', 'Youth Night'].map((item, index) => (
            <div key={item} className="mb-4 flex gap-3 last:mb-0">
              <span
                className={`size-16 rounded-lg ${
                  index === 0 ? 'bg-brand-blue/20' : 'bg-brand-dark/15'
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-brand-dark">{item}</p>
                <p className="mt-1 text-xs text-brand-dark/58">
                  May {19 + index}, 2026 • {index === 0 ? '9:00 AM' : '6:30 PM'}
                </p>
                <p className="text-xs text-brand-dark/58">
                  Hope Community Church
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-lg border border-brand-blue/10 p-5">
          <div className="flex items-start gap-4">
            <IconTile icon={Megaphone} />
            <div>
              <h3 className="text-sm font-extrabold text-brand-dark">
                Welcome New Members!
              </h3>
              <p className="mt-2 text-xs leading-5 text-brand-dark/62">
                Join us in welcoming our newest members to the FaithConnect
                family.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-brand-blue/10 p-5">
          <h3 className="text-sm font-extrabold text-brand-dark">
            Reports Overview
          </h3>
          <p className="mt-3 text-3xl font-extrabold text-brand-dark">892</p>
          <p className="text-xs font-bold text-emerald-500">
            +10% vs last month
          </p>
          <div className="mt-3 flex h-16 items-end gap-2">
            {[18, 30, 24, 48, 40, 62, 90].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-sm bg-brand-blue"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricPanel({
  title,
  value,
  label,
}: {
  title: string
  value: string
  label: string
}) {
  return (
    <div className="rounded-lg border border-brand-blue/10 p-5">
      <h3 className="text-sm font-extrabold text-brand-dark">{title}</h3>
      <p className="mt-5 text-4xl font-extrabold text-brand-dark">{value}</p>
      <p className="mt-1 text-sm text-brand-dark/58">{label}</p>
      <p className="mt-3 text-xs font-bold text-emerald-500">
        +12% vs last month
      </p>
      <div className="mt-7 grid grid-cols-2 gap-4 border-t border-brand-blue/10 pt-5">
        <div>
          <p className="text-xs text-brand-dark/50">New</p>
          <p className="text-lg font-extrabold text-brand-dark">24</p>
        </div>
        <div>
          <p className="text-xs text-brand-dark/50">Active</p>
          <p className="text-lg font-extrabold text-brand-dark">1,156</p>
        </div>
      </div>
      <button className="mt-5 min-h-11 w-full touch-manipulation rounded-md bg-brand-blue/8 text-sm font-extrabold text-brand-blue">
        Go to {title.split(' ')[0].toLowerCase()}
      </button>
    </div>
  )
}

function OrganizationMockup() {
  return (
    <div className="relative mx-auto max-w-[680px]">
      <div className="absolute left-10 top-0 hidden rounded-lg border border-brand-blue/10 bg-white p-4 shadow-xl lg:block">
        <div className="flex gap-3">
          <IconTile icon={ShieldCheck} className="size-10 rounded-md" />
          <div>
            <p className="text-xs font-extrabold text-brand-dark">
              Organization Status
            </p>
            <p className="text-xs font-bold text-emerald-500">
              All systems secure
            </p>
          </div>
        </div>
      </div>
      <div className="absolute -right-4 top-36 hidden rounded-lg border border-brand-blue/10 bg-white p-4 shadow-xl lg:block">
        <p className="mb-3 text-xs font-extrabold text-brand-dark">
          Active Users
        </p>
        <div className="flex -space-x-2">
          {[0, 1, 2, 3].map((item) => (
            <span
              key={item}
              className="size-8 rounded-full border-2 border-white bg-brand-blue/20"
            />
          ))}
          <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-brand-blue/10 text-[0.62rem] font-extrabold text-brand-blue">
            +24
          </span>
        </div>
      </div>
      <div className="rounded-[1.25rem] border border-brand-blue/10 bg-white/92 p-4 shadow-[0_24px_70px_rgb(0_14_53/0.12)] sm:p-5">
        <div className="grid overflow-hidden rounded-xl border border-brand-blue/10 sm:grid-cols-[150px_1fr]">
          <aside className="hidden bg-brand-blue/5 p-5 sm:block">
            <div className="mb-6 flex items-center gap-2 text-sm font-extrabold text-brand-dark">
              <Sparkles className="size-5 text-brand-blue" aria-hidden="true" />
              FaithConnect
            </div>
            {[
              'Overview',
              'Members',
              'Donations',
              'Events',
              'Volunteers',
              'Reports',
              'Settings',
            ].map((item, index) => (
              <p
                key={item}
                className={`mb-2 rounded-md px-3 py-2 text-xs font-bold ${
                  index === 0
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'text-brand-dark/58'
                }`}
              >
                {item}
              </p>
            ))}
          </aside>
          <main className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-brand-dark">
                  Organizations
                </h3>
                <p className="text-xs text-brand-dark/58">
                  Manage your church organizations
                </p>
              </div>
              <Bell className="size-5 text-brand-dark/50" aria-hidden="true" />
            </div>
            {[
              ['Hope Community Church', '1,248 members', Church],
              ['Grace Bible Fellowship', '856 members', Church],
              ['New Life Assembly', '612 members', Church],
            ].map(([name, members, Icon], index) => (
              <div
                key={name as string}
                className="mb-3 flex items-center gap-4 rounded-lg border border-brand-blue/10 bg-white p-4 shadow-sm"
              >
                <span
                  className={`grid size-12 place-items-center rounded-full text-white ${
                    index === 0
                      ? 'bg-brand-blue'
                      : index === 1
                        ? 'bg-sky-400'
                        : 'bg-brand-dark'
                  }`}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-brand-dark">
                    {name as string}
                  </p>
                  <p className="text-xs font-bold text-emerald-500">Active</p>
                </div>
                <p className="hidden text-xs text-brand-dark/50 sm:block">
                  {members as string}
                </p>
                <ChevronRight
                  className="size-5 text-brand-dark/40"
                  aria-hidden="true"
                />
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  )
}

function MobileAppShowcase() {
  const screens = [
    <AnnouncementsPhone key="announcements" />,
    <GivePhone key="give" />,
    <EventsPhone key="events" />,
  ]

  return (
    <div className="mx-auto grid w-full max-w-[680px] grid-cols-1 items-center justify-items-center gap-7 sm:grid-cols-3 sm:gap-x-3 lg:max-w-[660px] xl:gap-x-4">
      {screens.map((screen, index) => (
        <div
          key={index}
          className={`w-full ${index === 1 ? 'xl:translate-y-5' : 'xl:-translate-y-3'}`}
        >
          {screen}
        </div>
      ))}
    </div>
  )
}

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[245px] rounded-[1.8rem] border-[6px] border-brand-dark bg-brand-dark shadow-[0_24px_52px_rgb(0_14_53/0.2)] sm:max-w-[198px] lg:max-w-[205px] xl:max-w-[215px]">
      <div className="relative min-h-[470px] overflow-hidden rounded-[1.35rem] bg-white sm:min-h-[432px] lg:min-h-[448px] xl:min-h-[468px]">
        <span className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-brand-dark" />
        {children}
      </div>
    </div>
  )
}

function AnnouncementsPhone() {
  const announcements = [
    {
      title: 'New sermon series: Faith in Action',
      text: 'Join us this Sunday as we begin our new series.',
      date: 'May 12, 2025',
      color: 'bg-brand-blue',
      image: 'bg-[linear-gradient(135deg,#f7b267,#1f3f8f)]',
    },
    {
      title: 'Volunteer appreciation night',
      text: 'Thank you to all our amazing volunteers!',
      date: 'May 8, 2025',
      color: 'bg-brand-blue',
      image: 'bg-[linear-gradient(135deg,#fbd38d,#0f285f)]',
    },
    {
      title: 'Church picnic sign-ups are open',
      text: 'Bring your family and enjoy a day together.',
      date: 'May 5, 2025',
      color: 'bg-emerald-500',
      image: 'bg-[linear-gradient(135deg,#7dd3fc,#f59e0b)]',
    },
  ]

  const quickActions = [
    ['Give', Shield],
    ['Events', CalendarDays],
    ['Groups', Users],
    ['Invite', UserIcon],
  ] as const

  return (
    <PhoneShell>
      <div className="px-3.5 pt-8 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-brand-blue" aria-hidden="true" />
            <span className="text-sm font-extrabold text-brand-dark">
              FaithConnect
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-brand-dark/58" aria-hidden="true" />
            <span className="size-7 rounded-full bg-[linear-gradient(135deg,#f7b267,#7c2d12)]" />
          </div>
        </div>

        <p className="mt-3.5 text-[0.68rem] font-semibold text-brand-dark/68">
          Good morning,
        </p>
        <h3 className="text-lg leading-none font-extrabold text-brand-dark">
          Grace
        </h3>

        <div className="relative mt-3 overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--brand-blue),#6432d7)] p-3 text-white shadow-[0_16px_28px_rgb(0_64_205/0.2)]">
          <div className="absolute right-4 bottom-2 text-6xl leading-none font-extrabold text-white/12">
            +
          </div>
          <p className="text-xs font-extrabold">Today&apos;s Verse</p>
          <p className="mt-2 text-[0.7rem] leading-4 font-extrabold">
            “For where two or three gather in my name, there am I with them.”
          </p>
          <p className="mt-2 text-[0.58rem] font-bold text-white/72">
            Matthew 18:20
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-extrabold text-brand-dark">
            Announcements
          </p>
          <span className="text-[0.62rem] font-extrabold text-brand-blue">
            View all
          </span>
        </div>
        <div className="mt-2.5 space-y-2.5">
          {announcements.map((item) => (
            <article
              key={item.title}
              className="grid grid-cols-[38px_1fr] gap-2.5"
            >
              <span className={`h-10 w-10 rounded-md ${item.image}`} />
              <div className="min-w-0">
                <p className="flex items-start gap-1.5 text-[0.68rem] leading-4 font-extrabold text-brand-dark">
                  <span
                    className={`mt-1.5 size-1.5 shrink-0 rounded-full ${item.color}`}
                  />
                  <span className="line-clamp-1">{item.title}</span>
                </p>
                <p className="mt-0.5 line-clamp-2 text-[0.56rem] leading-[0.875rem] text-brand-dark/62">
                  {item.text}
                </p>
                <p className="mt-0.5 text-[0.52rem] font-bold text-brand-dark/46">
                  {item.date}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-3 text-xs font-extrabold text-brand-dark">
          Quick actions
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {quickActions.map(([label, Icon]) => (
            <div key={label} className="text-center">
              <span className="mx-auto grid size-8 place-items-center rounded-lg bg-brand-blue/8 text-brand-blue">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <p className="mt-1 text-[0.52rem] font-bold text-brand-dark/62">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-5 border-t border-brand-blue/8 bg-white/96 px-3 py-2 text-center text-[0.48rem] font-bold text-brand-dark/54">
          {[
            ['Home', Home],
            ['Give', Heart],
            ['Events', CalendarDays],
            ['Groups', Users],
            ['More', MoreHorizontal],
          ].map(([label, Icon], index) => (
            <div
              key={label as string}
              className={index === 0 ? 'text-brand-blue' : ''}
            >
              <Icon className="mx-auto size-4" aria-hidden="true" />
              <p className="mt-1">{label as string}</p>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  )
}

function GivePhone() {
  return (
    <PhoneShell>
      <div className="p-4 pt-8">
        <h3 className="text-lg font-extrabold text-brand-dark">Give</h3>
        <div className="mt-3 rounded-lg bg-brand-blue p-4 text-white">
          <p className="text-xs font-extrabold">
            Your generosity makes a difference
          </p>
          <p className="mt-1 text-[0.62rem] text-white/72">
            Thank you for supporting our mission.
          </p>
        </div>
        <div className="mt-4 text-xs font-extrabold text-brand-dark">
          Select a fund
          <div
            className="mt-2 flex min-h-11 w-full items-center justify-between rounded-md border border-brand-blue/10 bg-white px-3 text-sm text-brand-dark"
            aria-hidden="true"
          >
            <span>General Fund</span>
            <ChevronRight
              className="size-4 rotate-90 text-brand-dark/58"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {['$25', '$50', '$100', '$250'].map((amount) => (
            <button
              key={amount}
              className={`min-h-10 rounded-md text-xs font-extrabold ${
                amount === '$100'
                  ? 'bg-brand-blue text-white'
                  : 'bg-brand-blue/8 text-brand-dark'
              }`}
            >
              {amount}
            </button>
          ))}
        </div>
        <button className="mt-5 min-h-11 w-full rounded-md bg-brand-blue text-sm font-extrabold text-white">
          Give $100.00
        </button>
      </div>
    </PhoneShell>
  )
}

function EventsPhone() {
  return (
    <PhoneShell>
      <div className="p-4 pt-8">
        <h3 className="text-lg font-extrabold text-brand-dark">Events</h3>
        <div className="mt-4 grid grid-cols-2 rounded-lg bg-brand-blue/6 p-1 text-xs font-extrabold">
          <span className="rounded-md bg-white py-2 text-center text-brand-blue">
            Upcoming
          </span>
          <span className="py-2 text-center text-brand-dark/60">My Events</span>
        </div>
        <PhoneList
          title=""
          items={[
            'Sunday Worship',
            'Youth Night',
            'Baptism Sunday',
            'Community Outreach',
          ]}
        />
      </div>
    </PhoneShell>
  )
}

function PhoneList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      {title ? (
        <p className="mb-3 text-xs font-extrabold text-brand-dark">{title}</p>
      ) : null}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex gap-3 rounded-lg bg-brand-blue/5 p-2">
            <span
              className={`size-10 shrink-0 rounded-md ${
                index % 2 === 0 ? 'bg-brand-blue/20' : 'bg-brand-dark/12'
              }`}
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-extrabold text-brand-dark">
                {item}
              </p>
              <p className="mt-1 text-[0.58rem] text-brand-dark/56">
                May {12 + index}, 2026 • {index + 8}:00 AM
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkflowStep({
  number,
  title,
  text,
  children,
}: {
  number: string
  title: string
  text: string
  children: ReactNode
}) {
  return (
    <article className="relative rounded-lg border border-brand-blue/10 bg-white/88 p-6 text-center shadow-[0_18px_44px_rgb(0_14_53/0.08)]">
      <span className="absolute left-1/2 top-0 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-blue/15 bg-white text-lg font-extrabold text-brand-blue shadow-lg">
        {number}
      </span>
      <h3 className="mt-5 text-xl font-extrabold text-brand-dark">{title}</h3>
      <p className="mx-auto mt-3 min-h-16 max-w-[220px] text-sm leading-6 text-brand-dark/66">
        {text}
      </p>
      <div className="mt-6">{children}</div>
    </article>
  )
}

function ReportingMockup() {
  return (
    <div className="rounded-[1.25rem] border border-brand-blue/10 bg-white p-5 shadow-[0_24px_70px_rgb(0_14_53/0.12)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-brand-blue" aria-hidden="true" />
          <h3 className="text-lg font-extrabold text-brand-dark">Reports</h3>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-extrabold text-brand-blue">
          <button className="min-h-10 rounded-md border border-brand-blue/12 px-4">
            May 1 - May 31, 2026
          </button>
          <button className="min-h-10 rounded-md border border-brand-blue/12 px-4">
            Export PDF
          </button>
          <button className="min-h-10 rounded-md border border-brand-blue/12 px-4">
            Export CSV
          </button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {[
          ['Total Members', '1,248', Users],
          ['Total Donations', '$24,780', Heart],
          ['Events Held', '18', CalendarDays],
          ['Active Volunteers', '312', ShieldCheck],
        ].map(([label, value, Icon]) => (
          <div
            key={label as string}
            className="rounded-lg border border-brand-blue/10 p-4"
          >
            <div className="flex items-center gap-3">
              <IconTile
                icon={Icon as ComponentType<{ className?: string }>}
                className="size-11 rounded-md"
              />
              <div>
                <p className="text-xs text-brand-dark/56">{label as string}</p>
                <p className="text-xl font-extrabold text-brand-dark">
                  {value as string}
                </p>
                <p className="text-[0.62rem] font-bold text-emerald-500">
                  +12% vs Apr 1 - Apr 30
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Membership Growth" value="1,248" type="line" />
        <ChartCard title="Donation Trends" value="$24,780" type="bars" />
        <div className="rounded-lg border border-brand-blue/10 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-brand-dark">
              New Guests & Follow-ups
            </h4>
            <span className="text-xs font-extrabold text-brand-blue">
              View all
            </span>
          </div>
          {[
            ['New Guests', '86', '+15%'],
            ['Follow-up Completed', '48', '+9%'],
            ['Pending Follow-up', '38', '-8%'],
            ['Became Members', '12', '+20%'],
          ].map(([status, count, change]) => (
            <div
              key={status}
              className="grid grid-cols-[1fr_52px_52px] border-b border-brand-blue/8 py-2 text-xs last:border-0"
            >
              <span className="font-bold text-brand-dark/72">{status}</span>
              <span className="text-brand-dark">{count}</span>
              <span
                className={
                  change.startsWith('-')
                    ? 'font-bold text-red-500'
                    : 'font-bold text-emerald-500'
                }
              >
                {change}
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-brand-blue/10 p-5">
          <h4 className="text-sm font-extrabold text-brand-dark">
            Volunteer Engagement
          </h4>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <div className="grid size-32 place-items-center rounded-full bg-[conic-gradient(var(--brand-blue)_0_78%,rgb(0_64_205/0.16)_78%_100%)]">
              <div className="grid size-20 place-items-center rounded-full bg-white text-3xl font-extrabold text-brand-dark">
                78%
              </div>
            </div>
            <div className="min-w-44 flex-1 space-y-3 text-sm">
              {[
                'Active Volunteers 312',
                'Occasional Volunteers 68',
                'Inactive 20',
              ].map((item) => (
                <p key={item} className="font-bold text-brand-dark/68">
                  <span className="mr-2 inline-block size-2 rounded-full bg-brand-blue" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChartCard({
  title,
  value,
  type,
}: {
  title: string
  value: string
  type: 'line' | 'bars'
}) {
  return (
    <div className="rounded-lg border border-brand-blue/10 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-extrabold text-brand-dark">{title}</h4>
          <p className="mt-3 text-2xl font-extrabold text-brand-dark">
            {value}
          </p>
          <p className="text-xs text-brand-dark/56">
            Total {title.toLowerCase()}
          </p>
        </div>
        <span className="text-xs font-extrabold text-brand-blue">
          View details
        </span>
      </div>
      <div className="mt-5 flex h-40 items-end gap-3 border-b border-l border-brand-blue/10 px-3 pb-3">
        {[28, 36, 48, 58, 68, 82].map((height, index) =>
          type === 'bars' ? (
            <span
              key={index}
              className="flex-1 rounded-t-sm bg-brand-blue"
              style={{ height: `${height}%` }}
            />
          ) : (
            <span
              key={index}
              className="relative flex-1 border-t-2 border-brand-blue"
              style={{ height: `${height}%` }}
            >
              <span className="absolute -right-1 -top-1.5 size-3 rounded-full border-2 border-brand-blue bg-white" />
            </span>
          ),
        )}
      </div>
    </div>
  )
}

function SecurityMockup() {
  return (
    <div className="rounded-[1.25rem] border border-brand-blue/10 bg-white shadow-[0_24px_70px_rgb(0_14_53/0.12)]">
      <div className="grid overflow-hidden rounded-[1.25rem] lg:grid-cols-[170px_1fr]">
        <aside className="hidden border-r border-brand-blue/10 bg-brand-blue/5 p-5 lg:block">
          <div className="mb-7 flex items-center gap-2 text-sm font-extrabold text-brand-dark">
            <Sparkles className="size-5 text-brand-blue" aria-hidden="true" />
            FaithConnect
          </div>
          {[
            'Overview',
            'Users & Roles',
            'Security',
            'Audit Log',
            'Organizations',
            'Settings',
          ].map((item, index) => (
            <p
              key={item}
              className={`mb-2 rounded-md px-3 py-2 text-xs font-bold ${
                index === 2 ? 'bg-white text-brand-blue' : 'text-brand-dark/58'
              }`}
            >
              {item}
            </p>
          ))}
        </aside>
        <main className="p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-extrabold text-brand-dark">
              Security Overview
            </h3>
            <span className="rounded-md border border-brand-blue/10 px-4 py-2 text-xs font-bold text-brand-dark/60">
              Hope Community Church
            </span>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-5 rounded-lg border border-brand-blue/10 p-5">
            <span className="grid size-20 place-items-center rounded-2xl bg-brand-blue/12 text-brand-blue">
              <ShieldCheck className="size-11" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="text-lg font-extrabold text-brand-dark">
                All systems secure
              </h4>
              <p className="mt-1 text-sm text-brand-dark/62">
                Your data is protected and encrypted.
              </p>
            </div>
            <span className="rounded-md bg-emerald-500/10 px-4 py-2 text-xs font-extrabold text-emerald-600">
              Encrypted
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-brand-blue/10 p-5">
              <h4 className="mb-4 text-sm font-extrabold text-brand-dark">
                Access & Permissions
              </h4>
              {[
                'Pastors',
                'Administrators',
                'Finance Team',
                'Volunteers',
                'Members',
              ].map((item, index) => (
                <div key={item} className="mb-3 flex items-center gap-3">
                  <Users
                    className="size-4 text-brand-blue"
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-sm font-bold text-brand-dark/70">
                    {item}
                  </span>
                  <span className="rounded bg-brand-blue/8 px-2 py-1 text-[0.62rem] font-bold text-brand-blue">
                    {index < 2
                      ? 'Full access'
                      : index < 4
                        ? 'Limited'
                        : 'View only'}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-brand-blue/10 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-brand-dark">
                  Recent Admin Activity
                </h4>
                <span className="text-xs font-extrabold text-brand-blue">
                  View all
                </span>
              </div>
              {[
                'Exported donation report',
                'Updated member record',
                'Added new administrator',
                'Updated event details',
              ].map((item, index) => (
                <div key={item} className="mb-3 flex gap-3">
                  <IconTile
                    icon={index % 2 ? Users : FileText}
                    className="size-9 rounded-md"
                  />
                  <div>
                    <p className="text-xs font-extrabold text-brand-dark">
                      {
                        [
                          'David Anderson',
                          'Maria Lopez',
                          'James Wilson',
                          'Sarah Johnson',
                        ][index]
                      }
                    </p>
                    <p className="text-[0.62rem] text-brand-dark/56">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-brand-blue/10 p-5">
            <h4 className="text-sm font-extrabold text-brand-dark">
              Data separation & privacy
            </h4>
            <p className="mt-2 max-w-xl text-sm leading-6 text-brand-dark/62">
              Each church organization&apos;s data is isolated and never shared.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {[
                'Hope Community',
                'Grace Bible Fellowship',
                'New Life Assembly',
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue/8 px-4 py-2 text-xs font-extrabold text-brand-dark"
                >
                  <Church
                    className="size-4 text-brand-blue"
                    aria-hidden="true"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-brand-dark">
      <section className="relative overflow-hidden border-b border-brand-blue/10 px-4 pt-28 pb-10 sm:px-6 lg:px-8 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_4%,rgb(0_64_205/0.12),transparent_28%),radial-gradient(circle_at_8%_24%,rgb(0_64_205/0.09),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="min-w-0">
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-normal text-brand-dark sm:text-6xl lg:text-7xl">
              All-in-one church management for{' '}
              <BrandWord>modern ministries</BrandWord>
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-brand-dark/70">
              FaithConnect helps churches manage members, giving, events,
              communication, and engagement in one secure platform with a
              powerful web dashboard and mobile app.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-md bg-brand-blue px-7 text-sm font-extrabold !text-white no-underline shadow-[0_16px_28px_rgb(0_64_205/0.22)] transition-colors hover:bg-blue-700 hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
              >
                Start Free Trial
                <ChevronRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-md border border-brand-blue px-7 text-sm font-extrabold !text-brand-blue no-underline transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
              >
                Request Demo
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroStats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-lg border border-brand-blue/10 bg-white/90 p-4 shadow-[0_12px_26px_rgb(0_14_53/0.08)]"
                >
                  <Icon
                    className="mb-2 size-6 text-brand-blue"
                    aria-hidden="true"
                  />
                  <p className="text-xl font-extrabold text-brand-dark">
                    {value}
                  </p>
                  <p className="text-xs font-bold text-brand-dark/58">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <HeroDashboard />
        </div>
        <div className="relative mx-auto mt-14 max-w-7xl">
          <p className="text-center text-lg font-extrabold text-brand-dark">
            Trusted by churches of all sizes
          </p>
          <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="faithconnect-marquee flex w-max items-center gap-12 py-2">
              {[...trustedChurches, ...trustedChurches].map((name, index) => (
                <div
                  key={`${name}-${index}`}
                  className="flex min-w-44 items-center justify-center gap-3 text-brand-dark/72"
                >
                  <Church
                    className="size-8 text-brand-dark/44"
                    aria-hidden="true"
                  />
                  <span className="text-lg font-extrabold tracking-tight">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl">
              One platform. Every church account{' '}
              <BrandWord>fully organized.</BrandWord>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-brand-dark/66">
              FaithConnect allows multiple church organizations to subscribe,
              create their own secure organizational accounts, and manage their
              ministry operations independently.
            </p>
          </div>
          <OrganizationMockup />
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-3">
          <MiniFeatureCard
            icon={Church}
            title="Multi-Church SaaS Accounts"
            text="Each church gets its own secure workspace, users, data, roles, and subscription access."
          />
          <MiniFeatureCard
            icon={Users}
            title="Role-Based Access"
            text="Assign permissions for pastors, administrators, finance teams, coordinators, volunteers, and members."
          />
          <MiniFeatureCard
            icon={Cloud}
            title="Cloud-Based Access"
            text="Manage church operations from anywhere using the web platform and mobile app."
          />
        </div>
      </section>

      <section className="bg-brand-blue/[0.035] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl">
              Powerful tools for <BrandWord>church administrators.</BrandWord>
            </h2>
            <p className="mt-6 text-lg leading-8 text-brand-dark/66">
              The FaithConnect web app gives church leaders and administrators a
              clear operational view of the entire church community.
            </p>
            <div className="mt-8 space-y-4">
              {adminTools.map((item) => (
                <ToolRow key={item.title} {...item} />
              ))}
            </div>
          </div>
          <WebAppMockup />
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-brand-blue/[0.055] [clip-path:ellipse(70%_45%_at_50%_100%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 xl:grid-cols-2">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl">
              A connected church experience in{' '}
              <BrandWord>every member&apos;s pocket.</BrandWord>
            </h2>
            <p className="mt-6 text-lg leading-8 text-brand-dark/66">
              The FaithConnect mobile app gives users convenient access to
              church life, donations, events, communication, and volunteer
              opportunities.
            </p>
            <div className="mt-8 space-y-4">
              {mobileAudiences.map((item) => (
                <ToolRow key={item.title} {...item} />
              ))}
            </div>
          </div>
          <MobileAppShowcase />
        </div>
        <div className="relative mx-auto mt-22 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Shield, 'Secure & private', 'Your data is always protected.'],
            [
              Bell,
              'Stay connected',
              'Instant updates and real-time notifications.',
            ],
            [
              Users,
              'Built for everyone',
              'Designed for members, volunteers, donors, and guests.',
            ],
            [Phone, 'On the go', 'Access church life anytime, anywhere.'],
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="flex gap-4">
              <Icon
                className="size-7 shrink-0 text-brand-blue"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-sm font-extrabold text-brand-dark">
                  {title as string}
                </h3>
                <p className="mt-1 text-sm leading-6 text-brand-dark/62">
                  {text as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-blue/[0.035] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl">
            From first visit to <BrandWord>full engagement.</BrandWord>
          </h2>
          <p className="mt-4 text-lg text-brand-dark/66">
            FaithConnect supports the complete journey of church engagement.
          </p>
          <div className="relative mt-16 grid gap-8 lg:grid-cols-4">
            <div className="absolute left-[10%] right-[10%] top-0 hidden border-t border-brand-blue/18 lg:block" />
            <WorkflowStep
              number="01"
              title="Guest connects"
              text="Guests scan a QR code, complete a simple form, and indicate whether they want to become members."
            >
              <div className="rounded-lg border border-brand-blue/10 bg-white p-4 shadow-sm">
                <QrCode
                  className="mx-auto size-20 text-brand-dark"
                  aria-hidden="true"
                />
                <div className="mt-3 space-y-2">
                  <span className="block h-8 rounded-md bg-brand-blue/8" />
                  <span className="block h-8 rounded-md bg-brand-blue/8" />
                  <button className="min-h-10 w-full rounded-md bg-brand-blue text-xs font-extrabold text-white">
                    I&apos;m interested
                  </button>
                </div>
              </div>
            </WorkflowStep>
            <WorkflowStep
              number="02"
              title="Church follows up"
              text="Administrators receive guest information, assign follow-up actions, and send personalized messages."
            >
              <div className="rounded-lg border border-brand-blue/10 bg-white p-4 text-left shadow-sm">
                <div className="flex gap-3">
                  <span className="size-12 rounded-full bg-brand-blue/20" />
                  <div>
                    <p className="text-sm font-extrabold text-brand-dark">
                      John Anderson
                    </p>
                    <p className="text-xs text-brand-dark/56">New Guest</p>
                  </div>
                </div>
                <p className="mt-4 rounded-md bg-brand-blue/6 p-3 text-xs text-brand-dark/70">
                  Follow-up task: Contact John and welcome him to Hope
                  Community.
                </p>
                <p className="mt-3 rounded-md bg-brand-blue/6 p-3 text-xs text-brand-dark/70">
                  Message sent at 10:32 AM
                </p>
              </div>
            </WorkflowStep>
            <WorkflowStep
              number="03"
              title="Member joins"
              text="New members create profiles, join groups, register for events, and begin receiving communication."
            >
              <div className="rounded-lg border border-brand-blue/10 bg-white p-4 text-left shadow-sm">
                <IconTile icon={Users} className="mx-auto mb-4" />
                <p className="text-sm font-extrabold text-brand-dark">
                  Complete your profile
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-blue/10">
                  <span className="block h-full w-3/5 rounded-full bg-brand-blue" />
                </div>
                <p className="mt-4 rounded-md bg-brand-blue/6 p-3 text-xs">
                  Join a group
                </p>
                <p className="mt-2 rounded-md bg-brand-blue/6 p-3 text-xs">
                  Register for an event
                </p>
              </div>
            </WorkflowStep>
            <WorkflowStep
              number="04"
              title="Engagement grows"
              text="Members donate, volunteer, attend events, and remain connected through the mobile app."
            >
              <div className="rounded-lg border border-brand-blue/10 bg-white p-4 text-left shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <Sparkles
                    className="size-5 text-brand-blue"
                    aria-hidden="true"
                  />
                  <span className="size-7 rounded-full bg-brand-blue/20" />
                </div>
                <p className="text-xs text-brand-dark/56">Good morning,</p>
                <p className="text-sm font-extrabold text-brand-dark">Grace</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    [Heart, 'Give'],
                    [Users, 'Volunteer'],
                    [CalendarDays, 'Events'],
                  ].map(([Icon, label]) => (
                    <div
                      key={label as string}
                      className="rounded-md bg-brand-blue/8 p-2 text-center"
                    >
                      <Icon
                        className="mx-auto size-4 text-brand-blue"
                        aria-hidden="true"
                      />
                      <p className="mt-1 text-[0.58rem] font-bold">
                        {label as string}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-brand-blue/6 p-3 text-center text-xs font-extrabold">
                  <span>1,248</span>
                  <span>$24,680</span>
                  <span>32</span>
                </div>
              </div>
            </WorkflowStep>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl">
              Clear insights for better ministry{' '}
              <BrandWord>decisions.</BrandWord>
            </h2>
            <p className="mt-6 text-lg leading-8 text-brand-dark/66">
              FaithConnect converts church activity into simple, useful reports.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {reportingTopics.map(([label, Icon]) => (
                <div
                  key={label as string}
                  className="flex min-h-16 items-center gap-3 rounded-lg border border-brand-blue/10 bg-white p-4 shadow-sm"
                >
                  <IconTile
                    icon={Icon as ComponentType<{ className?: string }>}
                    className="size-10 rounded-md"
                  />
                  <span className="min-w-0 break-words text-sm font-extrabold leading-snug text-brand-dark">
                    {label as string}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ReportingMockup />
        </div>
      </section>

      <section className="bg-brand-blue/[0.035] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl">
              Secure, private, and organized by <BrandWord>design.</BrandWord>
            </h2>
            <p className="mt-6 text-lg leading-8 text-brand-dark/66">
              FaithConnect is designed to protect sensitive church, member,
              donor, and financial information.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {securityFeatures.map(([label, Icon]) => (
                <MiniFeatureCard
                  key={label as string}
                  icon={Icon as ComponentType<{ className?: string }>}
                  title={label as string}
                  text="Keep operations protected, auditable, and properly separated."
                />
              ))}
            </div>
          </div>
          <SecurityMockup />
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl gap-4 rounded-lg border border-brand-blue/10 bg-white p-5 shadow-[0_18px_44px_rgb(0_14_53/0.08)] md:grid-cols-[1fr_repeat(4,auto)] md:items-center">
          <div className="flex items-center gap-4">
            <IconTile icon={ShieldCheck} />
            <div>
              <h3 className="text-lg font-extrabold text-brand-dark">
                Built with enterprise-grade security
              </h3>
              <p className="mt-1 text-sm text-brand-dark/62">
                We follow industry best practices to keep your data safe,
                private, and accessible to the right people.
              </p>
            </div>
          </div>
          {[
            [Lock, '256-bit', 'Encryption'],
            [ShieldCheck, 'SOC 2', 'Compliant'],
            [Cloud, 'Regular', 'Backups'],
            [Shield, '99.9%', 'Uptime'],
          ].map(([Icon, stat, label]) => (
            <div key={label as string} className="flex items-center gap-3">
              <Icon className="size-7 text-brand-blue" aria-hidden="true" />
              <div>
                <p className="text-sm font-extrabold text-brand-dark">
                  {stat as string}
                </p>
                <p className="text-xs text-brand-dark/58">{label as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  )
}
