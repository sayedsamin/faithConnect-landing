import {
  Bell,
  CalendarDays,
  ChevronRight,
  Church,
  FileText,
  Heart,
  Home,
  Megaphone,
  MoreHorizontal,
  QrCode,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react'
import type { ComponentProps, ComponentType, ReactNode } from 'react'

import { CtaBanner } from '#/components/cta-banner'
import './home-page/home-page.css'
import { useHomeMotion } from './home-page/home-motion'

const flatIconSrcs = {
  arrowRight: '/images/home/arrow-right.png',
  bell: '/images/home/bell.png',
  calendar: '/images/home/calendar.png',
  church: '/images/home/church.png',
  cloud: '/images/home/cloud.png',
  database: '/images/home/database.png',
  file: '/images/home/file.png',
  giving: '/images/home/giving.png',
  guest: '/images/home/guest.png',
  lock: '/images/home/lock.png',
  members: '/images/home/members.png',
  message: '/images/home/message.png',
  phone: '/images/home/phone.png',
  reports: '/images/home/reports.png',
  shield: '/images/home/shield.png',
} as const

type FlatIconName = keyof typeof flatIconSrcs

const trustedChurches = [
  'Grace Church',
  'New Life Centre',
  'Hope Community',
  'Bethel Church',
  'Revive Church',
  'City Chapel',
]

const adminTools = [
  {
    icon: 'members',
    title: 'Manage Members',
    text: 'Maintain member profiles and directories.',
  },
  {
    icon: 'giving',
    title: 'Process Donations',
    text: 'Track giving and financial summaries.',
  },
  {
    icon: 'calendar',
    title: 'Coordinate Events',
    text: 'Manage registrations, schedules, and volunteers.',
  },
  {
    icon: 'message',
    title: 'Communicate with Congregants',
    text: 'Send messages, updates, and newsletters.',
  },
  {
    icon: 'reports',
    title: 'Access Reports',
    text: 'Generate insights on membership, donations, and engagement.',
  },
] as const

const mobileAudiences = [
  {
    icon: 'members',
    title: 'For Church Members',
    text: 'View announcements, update profiles, join groups, register for events, and stay connected.',
  },
  {
    icon: 'giving',
    title: 'For Donors',
    text: 'Give securely, view donation history, receive receipts, and support church campaigns.',
  },
  {
    icon: 'members',
    title: 'For Volunteers',
    text: 'See upcoming opportunities, sign up for roles, receive reminders, and track responsibilities.',
  },
  {
    icon: 'guest',
    title: 'For General Users and Guests',
    text: 'Explore church information, submit guest forms, register interest, and learn about programs.',
  },
] as const

const reportingTopics = [
  ['Membership growth', 'members'],
  ['New guests and follow-ups', 'guest'],
  ['Donation trends', 'giving'],
  ['Event participation', 'calendar'],
  ['Volunteer engagement', 'shield'],
  ['Communication reach', 'message'],
  ['Department and ministry activity', 'church'],
] as const

const securityFeatures = [
  ['Secure accounts', 'church'],
  ['Role-based', 'members'],
  ['Encrypted access', 'lock'],
  ['Record protection', 'giving'],
  ['Activity tracking', 'file'],
  ['Data separation', 'database'],
] as const

function UserIcon(props: ComponentProps<typeof Users>) {
  return <Users {...props} />
}

function BrandWord({ children }: { children: ReactNode }) {
  return <span className="text-brand-blue">{children}</span>
}

function FlatIconImage({
  icon,
  className = '',
}: {
  icon: FlatIconName
  className?: string
}) {
  return (
    <img
      src={flatIconSrcs[icon]}
      alt=""
      className={`block object-contain ${className}`}
      aria-hidden="true"
      draggable={false}
    />
  )
}

function FlatIconTile({
  icon,
  className = '',
}: {
  icon: FlatIconName
  className?: string
}) {
  return (
    <span
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 ${className}`}
    >
      <FlatIconImage icon={icon} className="size-6" />
    </span>
  )
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
  icon: FlatIconName
  title: string
  text: string
}) {
  return (
    <article className="home-motion-item feature-card rounded-lg border border-brand-blue/10 p-5">
      <div className="flex min-w-0 items-center gap-4">
        <FlatIconTile icon={icon} />
        <h3 className="min-w-0 text-base leading-6 font-extrabold break-words text-brand-dark">
          {title}
        </h3>
      </div>
      <p className="mt-4 text-sm leading-6 text-brand-dark/68">{text}</p>
    </article>
  )
}

function ToolRow({
  icon,
  title,
  text,
}: {
  icon: FlatIconName
  title: string
  text: string
}) {
  return (
    <article className="flex min-h-20 items-center gap-4 rounded-lg border border-brand-blue/10 bg-white/86 p-4 shadow-[0_14px_28px_rgb(0_14_53/0.06)]">
      <FlatIconTile icon={icon} className="size-11 rounded-md" />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-extrabold text-brand-dark">{title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-brand-dark/64">
          {text}
        </p>
      </div>
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
              <div className="mb-7 text-xs font-extrabold">FaithConnect</div>
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
                  <div className="relative h-36 overflow-hidden border-b border-l border-brand-blue/10 px-2 pb-5">
                    <div className="absolute inset-x-2 top-2 bottom-5 grid grid-rows-3">
                      {[0, 1, 2].map((line) => (
                        <span
                          key={line}
                          className="border-t border-brand-blue/8"
                        />
                      ))}
                    </div>
                    <svg
                      className="absolute inset-x-3 top-4 bottom-8 h-[88px] w-[calc(100%-1.5rem)] overflow-visible"
                      viewBox="0 0 280 88"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="hero-giving-area"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            stopColor="var(--brand-blue)"
                            stopOpacity="0.18"
                          />
                          <stop stopColor="var(--brand-blue)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 70 C28 58 34 45 70 48 C108 51 111 24 145 31 C178 38 180 19 215 22 C244 25 253 12 280 8 L280 88 L0 88 Z"
                        fill="url(#hero-giving-area)"
                      />
                      <path
                        d="M0 70 C28 58 34 45 70 48 C108 51 111 24 145 31 C178 38 180 19 215 22 C244 25 253 12 280 8"
                        fill="none"
                        stroke="var(--brand-blue)"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                    </svg>
                    <div className="relative z-10 flex h-full items-end gap-2">
                      {[32, 48, 40, 64, 56, 78, 88].map((height, index) => (
                        <div
                          key={index}
                          className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
                        >
                          <div className="flex h-[88px] w-full items-end justify-center gap-1">
                            <span
                              className="block w-full max-w-3 rounded-t-sm bg-brand-blue/22"
                              style={{
                                height: `${Math.max(height - 18, 18)}%`,
                              }}
                            />
                            <span
                              className="block w-full max-w-3 rounded-t-sm bg-brand-blue"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="text-[0.5rem] font-bold text-brand-dark/42">
                            {
                              ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][
                                index
                              ]
                            }
                          </span>
                        </div>
                      ))}
                    </div>
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
                <p className="mt-1 text-[0.46rem] font-bold text-brand-dark">
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
        <div>
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
              Department Status
            </p>
            <p className="text-xs font-bold text-emerald-500">
              12 Currently Active
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
            <div className="mb-6 text-sm font-extrabold text-brand-dark">
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
      <div className="relative h-[470px] overflow-hidden rounded-[1.35rem] bg-white sm:h-[432px] lg:h-[448px] xl:h-[468px]">
        <span className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-brand-dark" />
        {children}
      </div>
    </div>
  )
}

function PhoneTabs({ active }: { active: 'Home' | 'Give' | 'Events' }) {
  const tabs = [
    ['Home', Home],
    ['Give', Heart],
    ['Events', CalendarDays],
    ['Groups', Users],
    ['More', MoreHorizontal],
  ] as const

  return (
    <div className="absolute inset-x-0 bottom-0 grid grid-cols-5 border-t border-brand-blue/8 bg-white/96 px-3 py-2 text-center text-[0.48rem] font-bold text-brand-dark/54">
      {tabs.map(([label, Icon]) => (
        <div key={label} className={label === active ? 'text-brand-blue' : ''}>
          <Icon className="mx-auto size-4" aria-hidden="true" />
          <p className="mt-1">{label}</p>
        </div>
      ))}
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
          <div>
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

        <PhoneTabs active="Home" />
      </div>
    </PhoneShell>
  )
}

function GivePhone() {
  const givingHistory = [
    ['General Fund', '$100.00', 'May 12'],
    ['Youth Ministry', '$50.00', 'May 5'],
    ['Missions', '$75.00', 'Apr 28'],
  ] as const

  return (
    <PhoneShell>
      <div className="px-3.5 pt-8 pb-16">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.62rem] font-bold text-brand-dark/52">
              FaithConnect
            </p>
            <h3 className="text-lg leading-tight font-extrabold text-brand-dark">
              Give
            </h3>
          </div>
          <span className="grid size-8 place-items-center rounded-full bg-brand-blue/8 text-brand-blue">
            <Heart className="size-4" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-3 rounded-lg bg-[linear-gradient(135deg,var(--brand-blue),#5f3dd0)] p-3 text-white shadow-[0_16px_28px_rgb(0_64_205/0.18)]">
          <p className="text-[0.62rem] font-bold text-white/74">
            Giving this month
          </p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl leading-none font-extrabold">$425</p>
              <p className="mt-1 text-[0.58rem] font-semibold text-white/72">
                Across 4 gifts
              </p>
            </div>
            <span className="rounded-full bg-white/16 px-2 py-1 text-[0.52rem] font-extrabold">
              +12%
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            ['General', '$100'],
            ['Missions', '$75'],
            ['Youth', '$50'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-brand-blue/6 p-2">
              <p className="text-[0.52rem] font-bold text-brand-dark/52">
                {label}
              </p>
              <p className="mt-1 text-xs font-extrabold text-brand-dark">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 text-xs font-extrabold text-brand-dark">
          Select a fund
          <div
            className="mt-2 flex min-h-10 w-full items-center justify-between rounded-md border border-brand-blue/10 bg-white px-3 text-xs text-brand-dark shadow-sm"
            aria-hidden="true"
          >
            <span>General Fund</span>
            <ChevronRight
              className="size-4 rotate-90 text-brand-dark/58"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {['$25', '$50', '$100', '$250'].map((amount) => (
            <button
              key={amount}
              className={`min-h-9 rounded-md text-[0.68rem] font-extrabold ${
                amount === '$100'
                  ? 'bg-brand-blue text-white'
                  : 'bg-brand-blue/8 text-brand-dark'
              }`}
            >
              {amount}
            </button>
          ))}
        </div>

        <button className="mt-3 min-h-10 w-full rounded-md bg-brand-blue text-xs font-extrabold text-white shadow-[0_12px_22px_rgb(0_64_205/0.18)]">
          Give $100.00
        </button>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-extrabold text-brand-dark">Recent gifts</p>
          <span className="text-[0.58rem] font-extrabold text-brand-blue">
            Receipts
          </span>
        </div>
        <div className="mt-2 space-y-2">
          {givingHistory.map(([fund, amount, date]) => (
            <div
              key={`${fund}-${date}`}
              className="flex items-center justify-between gap-3 rounded-lg bg-brand-blue/5 p-2"
            >
              <div className="min-w-0">
                <p className="truncate text-[0.66rem] font-extrabold text-brand-dark">
                  {fund}
                </p>
                <p className="mt-0.5 text-[0.52rem] font-bold text-brand-dark/46">
                  {date}, 2025
                </p>
              </div>
              <p className="text-[0.66rem] font-extrabold text-brand-blue">
                {amount}
              </p>
            </div>
          ))}
        </div>

        <PhoneTabs active="Give" />
      </div>
    </PhoneShell>
  )
}

function EventsPhone() {
  const events = [
    ['Sunday Worship', 'May 12', '9:00 AM', 'Registered'],
    ['Youth Night', 'May 14', '6:30 PM', 'Open'],
    ['Baptism Sunday', 'May 18', '10:30 AM', 'Reminder set'],
  ] as const

  return (
    <PhoneShell>
      <div className="px-3.5 pt-8 pb-16">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.62rem] font-bold text-brand-dark/52">
              FaithConnect
            </p>
            <h3 className="text-lg leading-tight font-extrabold text-brand-dark">
              Events
            </h3>
          </div>
          <span className="grid size-8 place-items-center rounded-full bg-brand-blue/8 text-brand-blue">
            <CalendarDays className="size-4" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-3 overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--brand-blue),#5f3dd0)] p-3 text-white">
          <p className="text-[0.62rem] font-bold text-white/72">Next event</p>
          <p className="mt-2 text-base leading-tight font-extrabold">
            Sunday Worship
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[0.58rem] font-bold text-white/78">
            <span className="rounded-md bg-white/14 px-2 py-1.5">May 12</span>
            <span className="rounded-md bg-white/14 px-2 py-1.5">9:00 AM</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 rounded-lg bg-brand-blue/6 p-1 text-xs font-extrabold">
          <span className="rounded-md bg-white py-2 text-center text-brand-blue">
            Upcoming
          </span>
          <span className="py-2 text-center text-brand-dark/60">My Events</span>
        </div>

        <div className="mt-3 space-y-2.5">
          {events.map(([title, date, time, status], index) => (
            <article
              key={title}
              className="grid grid-cols-[42px_1fr] gap-2.5 rounded-lg bg-brand-blue/5 p-2"
            >
              <span
                className={`grid size-10 place-items-center rounded-md text-[0.58rem] font-extrabold ${
                  index === 0
                    ? 'bg-brand-blue text-white'
                    : 'bg-brand-blue/12 text-brand-blue'
                }`}
              >
                {date.split(' ')[1]}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.68rem] font-extrabold text-brand-dark">
                  {title}
                </p>
                <p className="mt-0.5 text-[0.56rem] font-bold text-brand-dark/52">
                  {date} • {time}
                </p>
                <p className="mt-1 w-fit rounded-full bg-white px-2 py-0.5 text-[0.5rem] font-extrabold text-brand-blue">
                  {status}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-brand-blue/10 p-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[0.68rem] font-extrabold text-brand-dark">
              Serving this week
            </p>
            <span className="text-[0.56rem] font-extrabold text-emerald-500">
              2 roles
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[0.56rem] font-bold text-brand-dark/60">
            <span className="rounded-md bg-brand-blue/6 px-2 py-1.5">
              Welcome team
            </span>
            <span className="rounded-md bg-brand-blue/6 px-2 py-1.5">
              Kids check-in
            </span>
          </div>
        </div>

        <PhoneTabs active="Events" />
      </div>
    </PhoneShell>
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
    <article className="home-motion-item relative rounded-lg border border-brand-blue/10 bg-white/88 p-5 text-center shadow-[0_18px_44px_rgb(0_14_53/0.08)]">
      <span className="absolute left-1/2 top-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-blue/15 bg-white text-base font-extrabold text-brand-blue shadow-lg">
        {number}
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-brand-dark">{title}</h3>
      <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-brand-dark/66">
        {text}
      </p>
      <div className="mt-4">{children}</div>
    </article>
  )
}

function ReportingMockup() {
  return (
    <div className="rounded-[1.25rem] border border-brand-blue/10 bg-white p-5 shadow-[0_24px_70px_rgb(0_14_53/0.12)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
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
          <div className="mb-7 text-sm font-extrabold text-brand-dark">
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
            <div className="rounded-lg border border-brand-blue/10 p-4 sm:p-5">
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
                <div
                  key={item}
                  className="mb-2 grid min-h-9 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 last:mb-0"
                >
                  <span className="min-w-0 text-sm leading-5 font-bold break-words text-brand-dark/70">
                    {item}
                  </span>
                  <span className="inline-flex min-h-7 min-w-[4.25rem] items-center justify-center rounded-md bg-brand-blue/8 px-2.5 py-1.5 text-center text-[0.62rem] leading-tight font-extrabold whitespace-nowrap text-brand-blue">
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
  const motionRef = useHomeMotion<HTMLElement>()

  return (
    <main ref={motionRef} className="overflow-hidden bg-white text-brand-dark">
      <section className="relative overflow-hidden border-b border-brand-blue/10 pt-28 pb-10 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_4%,rgb(0_64_205/0.12),transparent_28%),radial-gradient(circle_at_8%_24%,rgb(0_64_205/0.09),transparent_26%)]" />
        <div
          className="page-shell relative grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]"
          data-home-reveal="split"
        >
          <div className="min-w-0">
            <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.02] tracking-normal text-brand-dark sm:text-4xl lg:text-5xl">
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
                <FlatIconImage
                  icon="arrowRight"
                  className="size-4 brightness-0 invert"
                />
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-md border border-brand-blue px-7 text-sm font-extrabold !text-brand-blue no-underline transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/30"
              >
                Request Demo
              </a>
            </div>
          </div>
          <HeroDashboard />
        </div>
        <div className="page-shell relative mt-32" data-home-reveal="up">
          <p className="text-center text-xl font-extrabold text-brand-dark">
            Trusted by churches of all sizes
          </p>
          <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="faithconnect-marquee flex w-max items-center gap-12 py-2">
              {[...trustedChurches, ...trustedChurches].map((name, index) => (
                <div
                  key={`${name}-${index}`}
                  className="flex min-w-44 items-center justify-center gap-3 text-brand-dark/72"
                >
                  <FlatIconImage icon="church" className="size-8" />
                  <span className="text-lg font-extrabold tracking-tight">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div
          className="page-shell grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]"
          data-home-reveal="split"
        >
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
        <div
          className="page-shell mt-14 grid gap-6 lg:grid-cols-3"
          data-home-reveal="stagger"
        >
          <MiniFeatureCard
            icon="church"
            title="Multi-Church SaaS Accounts"
            text="Each church gets its own secure workspace, users, data, roles, and subscription access."
          />
          <MiniFeatureCard
            icon="members"
            title="Role-Based Access"
            text="Assign permissions for pastors, administrators, finance teams, coordinators, volunteers, and members."
          />
          <MiniFeatureCard
            icon="cloud"
            title="Cloud-Based Access"
            text="Manage church operations from anywhere using the web platform and mobile app."
          />
        </div>
      </section>

      <section className="bg-brand-blue/[0.035] py-20">
        <div
          className="page-shell grid items-center gap-12 lg:grid-cols-[0.55fr_1.45fr]"
          data-home-reveal="split"
        >
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

      <section className="relative py-20">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-brand-blue/[0.055] [clip-path:ellipse(70%_45%_at_50%_100%)]" />
        <div
          className="page-shell relative grid items-center gap-12 xl:grid-cols-2"
          data-home-reveal="split"
        >
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
        <div
          className="page-shell relative mt-22 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
          data-home-reveal="up"
        >
          {(
            [
              ['shield', 'Secure & private', 'Your data is always protected.'],
              [
                'bell',
                'Stay connected',
                'Instant updates and real-time notifications.',
              ],
              [
                'members',
                'Built for everyone',
                'Designed for members, volunteers, donors, and guests.',
              ],
              ['phone', 'On the go', 'Access church life anytime, anywhere.'],
            ] as const
          ).map(([icon, title, text]) => (
            <div key={title} className="flex gap-4">
              <FlatIconImage icon={icon} className="size-7 shrink-0" />
              <div>
                <h3 className="text-sm font-extrabold text-brand-dark">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-brand-dark/62">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-blue/[0.035] py-16">
        <div className="page-shell text-center" data-home-reveal="up">
          <h2 className="text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl">
            From first visit to <BrandWord>full engagement.</BrandWord>
          </h2>
          <p className="mt-4 text-lg text-brand-dark/66">
            FaithConnect supports the complete journey of church engagement.
          </p>
          <div
            className="relative mt-14 grid gap-6 lg:grid-cols-4"
            data-home-reveal="stagger"
          >
            <div className="absolute -top-4 left-[12%] right-[12%] hidden border-t-2 border-brand-blue/35 lg:block" />
            <WorkflowStep
              number="01"
              title="Guest connects"
              text="Guests connect through a simple QR form."
            >
              <div className="rounded-lg border border-brand-blue/10 bg-white p-3 shadow-sm">
                <QrCode
                  className="mx-auto size-14 text-brand-dark"
                  aria-hidden="true"
                />
                <p className="mt-2 text-xs font-extrabold text-brand-blue">
                  Scan to connect
                </p>
              </div>
            </WorkflowStep>
            <WorkflowStep
              number="02"
              title="Church follows up"
              text="Teams receive details and assign a follow-up."
            >
              <div className="rounded-lg border border-brand-blue/10 bg-white p-3 text-left shadow-sm">
                <div className="flex gap-3">
                  <span className="size-10 rounded-full bg-brand-blue/20" />
                  <div>
                    <p className="text-sm font-extrabold text-brand-dark">
                      John Anderson
                    </p>
                    <p className="text-xs text-brand-dark/56">New Guest</p>
                  </div>
                </div>
                <p className="mt-3 rounded-md bg-brand-blue/6 p-2.5 text-xs text-brand-dark/70">
                  Welcome message assigned
                </p>
              </div>
            </WorkflowStep>
            <WorkflowStep
              number="03"
              title="Member joins"
              text="Members complete profiles and join church life."
            >
              <div className="rounded-lg border border-brand-blue/10 bg-white p-3 text-left shadow-sm">
                <p className="text-sm font-extrabold text-brand-dark">
                  Complete your profile
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-blue/10">
                  <span className="block h-full w-3/5 rounded-full bg-brand-blue" />
                </div>
                <p className="mt-3 rounded-md bg-brand-blue/6 p-2.5 text-xs">
                  Join a group
                </p>
              </div>
            </WorkflowStep>
            <WorkflowStep
              number="04"
              title="Engagement grows"
              text="Giving, serving, and participation grow."
            >
              <div className="rounded-lg border border-brand-blue/10 bg-white p-3 shadow-sm">
                <div className="grid grid-cols-3 gap-2">
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
              </div>
            </WorkflowStep>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div
          className="page-shell grid items-center gap-12 lg:grid-cols-[0.55fr_1.45fr]"
          data-home-reveal="split"
        >
          <div>
            <h2 className="text-2xl font-extrabold leading-tight text-brand-dark sm:text-3xl">
              Clear insights for better ministry{' '}
              <BrandWord>decisions.</BrandWord>
            </h2>
            <p className="mt-6 text-lg leading-8 text-brand-dark/66">
              FaithConnect converts church activity into simple, useful reports.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {reportingTopics.map(([label, icon]) => (
                <div
                  key={label as string}
                  className="flex min-h-16 items-center gap-3 rounded-lg border border-brand-blue/10 bg-white p-4 shadow-sm"
                >
                  <FlatIconTile icon={icon} className="size-10 rounded-md" />
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

      <section className="bg-brand-blue/[0.035] py-20">
        <div
          className="page-shell grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]"
          data-home-reveal="split"
        >
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
                  icon={Icon}
                  title={label as string}
                  text="Keep operations protected, auditable, and properly separated."
                />
              ))}
            </div>
          </div>
          <SecurityMockup />
        </div>
        {/* <div className="mx-auto mt-10 grid max-w-7xl gap-4 rounded-lg border border-brand-blue/10 bg-white p-5 shadow-[0_18px_44px_rgb(0_14_53/0.08)] md:grid-cols-[1fr_repeat(4,auto)] md:items-center">
          <div className="flex items-center gap-4">
            <FlatIconTile icon="shield" />
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
          {(
            [
              ['lock', '256-bit', 'Encryption'],
              ['shield', 'SOC 2', 'Compliant'],
              ['cloud', 'Regular', 'Backups'],
              ['shield', '99.9%', 'Uptime'],
            ] as const
          ).map(([icon, stat, label]) => (
            <div key={label} className="flex items-center gap-3">
              <FlatIconImage icon={icon} className="size-7" />
              <div>
                <p className="text-sm font-extrabold text-brand-dark">{stat}</p>
                <p className="text-xs text-brand-dark/58">{label}</p>
              </div>
            </div>
          ))}
        </div> */}
      </section>

      <CtaBanner />
    </main>
  )
}
