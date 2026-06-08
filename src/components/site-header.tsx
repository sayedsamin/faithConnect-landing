import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AuthNav } from './auth-nav'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const scrollThreshold = 24

    function syncScrolledState() {
      setHasScrolled(window.scrollY > scrollThreshold)
    }

    syncScrolledState()
    window.addEventListener('scroll', syncScrolledState, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncScrolledState)
    }
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <div
        className={[
          'relative mx-auto flex w-full max-w-5xl items-center justify-between gap-3 border backdrop-blur-md',
          'transition-[border-radius,box-shadow,background-color,border-color,padding,transform] duration-300 ease-out motion-reduce:transition-none',
          hasScrolled
            ? 'min-h-13 rounded-md px-4 py-1.5 shadow-[0_12px_26px_rgba(12,20,32,0.2)] sm:min-h-13 sm:px-5'
            : 'min-h-14 rounded-[1.75rem] px-4 py-2 shadow-[0_18px_38px_rgba(12,20,32,0.28)] sm:min-h-14.5 sm:rounded-full sm:px-6',
        ].join(' ')}
        style={{
          background:
            'linear-gradient(135deg, color-mix(in oklab, var(--brand-navy) 96%, transparent), color-mix(in oklab, var(--brand-navy) 86%, var(--brand-gold)))',
          borderColor:
            'color-mix(in oklab, var(--brand-gold) 34%, transparent)',
        }}
      >
        <Link
          to="/"
          aria-label="Questura home"
          className="inline-flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-white p-0.5 no-underline shadow-[0_8px_18px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25 sm:size-12"
        >
          <img
            src="/images/home/questura-logo.svg"
            alt=""
            width={506}
            height={506}
            loading="eager"
            decoding="async"
            className="h-full w-full scale-[1.28] object-contain"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 md:flex"
        >
          {navItems.map((item) => (
            <HeaderLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden shrink-0 md:block">
          <AuthNav />
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/18 bg-white/10 text-brand-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25 md:hidden"
          aria-label={
            isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setIsMenuOpen((current) => !current)
          }}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>

        {isMenuOpen ? (
          <div
            id="mobile-navigation"
            className="absolute top-full right-0 left-0 mt-3 rounded-2xl border border-brand-gold/30 bg-brand-navy p-3 shadow-[0_22px_44px_rgba(12,20,32,0.34)] md:hidden"
          >
            <nav aria-label="Mobile primary" className="grid gap-2">
              {navItems.map((item) => (
                <HeaderLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onClick={() => {
                    setIsMenuOpen(false)
                  }}
                  isMobile
                />
              ))}
            </nav>
            <div className="mt-3 border-t border-white/12 pt-3">
              <AuthNav />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

type HeaderLinkProps = {
  isMobile?: boolean
  item: (typeof navItems)[number]
  onClick?: () => void
  pathname: string
}

function HeaderLink({ isMobile, item, onClick, pathname }: HeaderLinkProps) {
  const isCurrent = item.href === '/' ? pathname === '/' : false

  return (
    <a
      href={item.href}
      className={[
        'relative inline-flex min-h-11 shrink-0 items-center rounded-md text-sm font-bold no-underline transition-[background-color,border-color,color,transform]',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        isMobile ? 'w-full px-3' : 'min-h-8',
        "text-brand-white/78! hover:text-brand-white! aria-[aria-current='page']:text-brand-white!",
      ].join(' ')}
      aria-current={isCurrent ? 'page' : undefined}
      onClick={onClick}
    >
      {item.label}
    </a>
  )
}
