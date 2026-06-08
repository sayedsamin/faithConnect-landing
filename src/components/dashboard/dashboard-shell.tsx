import { Link, useNavigate } from '@tanstack/react-router'
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  LoaderCircle,
  Minus,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'
import { getCurrentUserProfileRpc } from '#/lib/auth/profile-api'
import { getDashboardPathForRole } from '#/lib/auth/rbac'
import type { AppRole } from '#/lib/auth/rbac'

export type DashboardSidebarItem = {
  badge?: number | string
  Icon: LucideIcon
  label: string
  subitems?: DashboardSidebarSubitem[]
  to: string
}

export type DashboardSidebarSubitem = {
  badge?: number | string
  Icon?: LucideIcon
  label: string
  to: string
}

export type DashboardSidebarSection = {
  items: DashboardSidebarItem[]
  label: string
}

type DashboardShellProps = {
  allowedRoles?: AppRole[]
  children: ReactNode
  items?: DashboardSidebarItem[]
  role: AppRole
  sections?: DashboardSidebarSection[]
}

export function DashboardShell({
  allowedRoles,
  children,
  items = [],
  role,
  sections,
}: DashboardShellProps) {
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({})
  const [status, setStatus] = useState<'checking' | 'ready' | 'error'>(
    'checking',
  )
  const sidebarSections = sections?.length
    ? sections
    : [{ items, label: 'Dashboard' }]
  const mobileItems = sidebarSections.flatMap((section) => section.items)
  const permittedRoles = useMemo(
    () => (allowedRoles?.length ? allowedRoles : [role]),
    [allowedRoles, role],
  )

  useEffect(() => {
    let isMounted = true

    async function verifyDashboardRole() {
      try {
        const supabase = getSupabaseBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!isMounted) {
          return
        }

        if (!session?.user.id) {
          await navigate({ to: '/signin', replace: true })
          return
        }

        const profile = await getCurrentUserProfileRpc()
        const profileRole = profile?.role

        if (!profileRole) {
          setStatus('error')
          return
        }

        if (!permittedRoles.includes(profileRole)) {
          await navigate({
            to: getDashboardPathForRole(profileRole),
            replace: true,
          })
          return
        }

        setStatus('ready')
      } catch {
        if (isMounted) {
          setStatus('error')
        }
      }
    }

    void verifyDashboardRole()

    return () => {
      isMounted = false
    }
  }, [navigate, permittedRoles])

  if (status === 'checking') {
    return (
      <section className="page-wrap flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-12 sm:px-6">
        <div
          role="status"
          className="flex min-h-44 w-full max-w-sm flex-col items-center justify-center gap-4 rounded-md border border-border bg-background px-6 py-8 text-center shadow-sm"
        >
          <LoaderCircle
            aria-hidden="true"
            className="size-10 animate-spin text-primary motion-reduce:animate-none"
          />
          <span className="text-sm font-semibold text-foreground">
            Loading dashboard…
          </span>
        </div>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="page-wrap flex min-h-[calc(100vh-6rem)] items-center px-4 py-12 sm:px-6">
        <p
          role="alert"
          className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
        >
          Unable to load your dashboard. Please sign out and try again.
        </p>
      </section>
    )
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] pt-24 text-foreground">
      <div className="flex w-full gap-4 px-4 pb-8 sm:px-6 lg:px-8">
        <aside
          className={[
            'sticky top-24 hidden h-[calc(100vh-7rem)] shrink-0 rounded-md border border-brand-white/15 bg-shadow-grey p-3 text-brand-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_18px_34px_rgba(0,0,0,0.18)] transition-[width,box-shadow,border-color] duration-200 ease-out motion-reduce:transition-none md:block',
            isCollapsed ? 'w-19' : 'w-64',
          ].join(' ')}
          aria-label="Dashboard"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-2 px-2 py-1">
              <div className="flex min-w-0 items-center gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-school-bus-yellow text-shadow-grey shadow-[0_10px_18px_rgba(0,0,0,0.28)]">
                  <LayoutDashboard aria-hidden="true" className="size-5" />
                </span>
                {!isCollapsed ? (
                  <span className="min-w-0 truncate text-sm font-extrabold text-brand-white">
                    Dashboard
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                className="inline-flex size-9 shrink-0 touch-manipulation items-center justify-center rounded-md border border-brand-white/18 bg-brand-white/10 text-brand-white shadow-sm transition-[background-color,border-color,color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-school-bus-yellow hover:bg-brand-white/16 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={() => {
                  setIsCollapsed((value) => !value)
                }}
              >
                {isCollapsed ? (
                  <ChevronsRight aria-hidden="true" className="size-4" />
                ) : (
                  <ChevronsLeft aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>

            <nav
              className="mt-5 flex flex-col gap-5 overflow-y-auto pr-1"
              aria-label="Dashboard sections"
            >
              {sidebarSections.map((section, sectionIndex) => {
                const sectionKey = `${section.label}-${sectionIndex}`
                const isSectionCollapsed = collapsedSections[sectionKey]

                return (
                  <section
                    key={sectionKey}
                    className="border-t border-brand-white/14 pt-5 first:border-t-0 first:pt-0"
                  >
                    {!isCollapsed ? (
                      <button
                        type="button"
                        className="mb-3 flex min-h-8 w-full touch-manipulation items-center justify-between gap-3 rounded-md px-2 text-left text-xs font-extrabold uppercase tracking-[0.12em] text-brand-white/74 transition-[background-color,color] duration-150 ease-out hover:bg-brand-white/8 hover:text-brand-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35 motion-reduce:transition-none"
                        aria-expanded={!isSectionCollapsed}
                        onClick={() => {
                          setCollapsedSections((value) => ({
                            ...value,
                            [sectionKey]: !value[sectionKey],
                          }))
                        }}
                      >
                        <span className="min-w-0 truncate">
                          {section.label}
                        </span>
                        <Minus aria-hidden="true" className="size-4 shrink-0" />
                      </button>
                    ) : null}

                    {!isSectionCollapsed ? (
                      <div className="flex flex-col gap-1">
                        {section.items.map((item) => {
                          const { badge, Icon, label, subitems, to } = item
                          const hasSubitems = Boolean(subitems?.length)

                          return (
                            <div key={to} className="min-w-0">
                              <Link
                                to={to}
                                title={isCollapsed ? label : undefined}
                                className={[
                                  'group flex min-h-11 items-center gap-3 rounded-md border border-transparent px-3 text-sm font-bold text-brand-white! no-underline',
                                  'transition-[background-color,border-color,color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-brand-white/24 hover:bg-brand-white/10',
                                  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                                  '[&.active]:border-brand-white/18 [&.active]:bg-brand-white/18 [&.active]:text-brand-white! [&.active]:shadow-[0_10px_18px_rgba(0,0,0,0.2)]',
                                ].join(' ')}
                                activeOptions={{ exact: !hasSubitems }}
                              >
                                <Icon
                                  aria-hidden="true"
                                  className="size-5 shrink-0 transition-transform duration-150 ease-out group-hover:scale-105 group-[.active]:scale-105 motion-reduce:transition-none"
                                />
                                {!isCollapsed ? (
                                  <>
                                    <span className="min-w-0 flex-1 truncate transition-opacity duration-150 ease-out motion-reduce:transition-none">
                                      {label}
                                    </span>
                                    {badge ? (
                                      <span className="shrink-0 rounded-md bg-brand-white/18 px-2 py-1 text-xs font-extrabold text-brand-white">
                                        {badge}
                                      </span>
                                    ) : null}
                                  </>
                                ) : null}
                              </Link>

                              {!isCollapsed && hasSubitems ? (
                                <div className="ml-5 mt-1 flex flex-col gap-1 border-l border-brand-white/16 pl-3">
                                  {subitems?.map((subitem) => {
                                    const SubitemIcon = subitem.Icon

                                    return (
                                      <Link
                                        key={subitem.to}
                                        to={subitem.to}
                                        className={[
                                          'group/subitem flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 text-sm font-semibold text-brand-white/86! no-underline',
                                          'transition-[background-color,border-color,color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-brand-white/20 hover:bg-brand-white/10 hover:text-brand-white!',
                                          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                                          '[&.active]:border-brand-white/24 [&.active]:bg-brand-white/14 [&.active]:text-brand-white!',
                                        ].join(' ')}
                                        activeOptions={{ exact: true }}
                                      >
                                        {SubitemIcon ? (
                                          <SubitemIcon
                                            aria-hidden="true"
                                            className="size-4 shrink-0 transition-transform duration-150 ease-out group-hover/subitem:scale-105 group-[.active]/subitem:scale-105 motion-reduce:transition-none"
                                          />
                                        ) : (
                                          <span
                                            aria-hidden="true"
                                            className="size-1.5 shrink-0 rounded-full bg-current"
                                          />
                                        )}
                                        <span className="min-w-0 flex-1 truncate">
                                          {subitem.label}
                                        </span>
                                        {subitem.badge ? (
                                          <span className="shrink-0 rounded-md bg-brand-white/14 px-2 py-1 text-xs font-extrabold text-brand-white">
                                            {subitem.badge}
                                          </span>
                                        ) : null}
                                      </Link>
                                    )
                                  })}
                                </div>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    ) : null}
                  </section>
                )
              })}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <nav
            aria-label="Dashboard sections"
            className="mb-4 flex gap-2 overflow-x-auto pb-2 md:hidden"
          >
            {mobileItems.flatMap(({ badge, Icon, label, subitems, to }) => [
              <Link
                key={to}
                to={to}
                className={[
                  'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border border-brand-white/15 bg-shadow-grey px-3 text-sm font-bold text-brand-white! no-underline shadow-sm',
                  'transition-[background-color,border-color,color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-school-bus-yellow hover:bg-shadow-grey/92',
                  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                  '[&.active]:border-school-bus-yellow [&.active]:bg-school-bus-yellow [&.active]:text-shadow-grey!',
                ].join(' ')}
                activeOptions={{ exact: !subitems?.length }}
              >
                <Icon aria-hidden="true" className="size-4" />
                <span>{label}</span>
                {badge ? (
                  <span className="rounded-md bg-brand-white/18 px-2 py-1 text-xs font-extrabold">
                    {badge}
                  </span>
                ) : null}
              </Link>,
              ...(subitems ?? []).map((subitem) => {
                const SubitemIcon = subitem.Icon

                return (
                  <Link
                    key={subitem.to}
                    to={subitem.to}
                    className={[
                      'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border border-brand-white/15 bg-shadow-grey px-3 text-sm font-semibold text-brand-white/86! no-underline shadow-sm',
                      'transition-[background-color,border-color,color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-brand-white/28 hover:bg-shadow-grey/92 hover:text-brand-white!',
                      'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                      '[&.active]:border-brand-white/28 [&.active]:bg-brand-white/14 [&.active]:text-brand-white!',
                    ].join(' ')}
                    activeOptions={{ exact: true }}
                  >
                    {SubitemIcon ? (
                      <SubitemIcon aria-hidden="true" className="size-4" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-full bg-current"
                      />
                    )}
                    <span>{subitem.label}</span>
                    {subitem.badge ? (
                      <span className="rounded-md bg-brand-white/14 px-2 py-1 text-xs font-extrabold">
                        {subitem.badge}
                      </span>
                    ) : null}
                  </Link>
                )
              }),
            ])}
          </nav>

          {children}
        </div>
      </div>
    </section>
  )
}
