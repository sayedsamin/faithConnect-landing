import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
]

function isActiveNavItem(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    <header className="bg-white fixed w-full top-0 right-0 left-0 z-50 py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100 drop-shadow-md">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="GraceNexa home"
          className="inline-flex shrink-0 items-center gap-2 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg"
        >
          <img
            src="/images/home/GraceNexa%20Icon%20V3.webp"
            alt="GraceNexa"
            width={40}
            height={40}
            loading="eager"
            decoding="async"
            className="h-10 w-10 object-contain"
          />
          <span className="hidden sm:inline font-bold text-lg text-brand-dark">
            GraceNexa
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 md:flex"
        >
          {navItems.map((item) => {
            const isActive = isActiveNavItem(pathname, item.href)

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                  isActive ? 'is-active' : ''
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-brand-blue border border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
          >
            Book Demo
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>

        <button
          type="button"
          className="inline-flex md:hidden min-h-10 min-w-10 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-brand-blue/20 bg-brand-blue/5 text-brand-dark transition-colors hover:bg-brand-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
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
            className="absolute top-full right-4 left-4 mt-3 rounded-xl border border-brand-blue/20 bg-white p-4 shadow-lg md:hidden"
          >
            <nav aria-label="Mobile primary" className="grid gap-3">
              {navItems.map((item) => {
                const isActive = isActiveNavItem(pathname, item.href)

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-blue/5 ${
                      isActive ? 'is-active bg-brand-blue/5' : ''
                    }`}
                    onClick={() => {
                      setIsMenuOpen(false)
                    }}
                  >
                    {item.label}
                  </a>
                )
              })}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-brand-blue/10">
                <button className="w-full px-4 py-2 text-sm font-medium text-brand-blue border border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
                  Book Demo
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-lg hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </div>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
