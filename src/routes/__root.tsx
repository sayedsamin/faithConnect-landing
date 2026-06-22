import {
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import {
  GoogleTagManagerNoScript,
  GoogleTagManagerPageView,
  GoogleTagManagerScript,
} from '../integrations/analytics/google-tag-manager'
import { PostHogAnalytics } from '../integrations/analytics/posthog'
import { SiteFooter } from '#/components/site-footer'
import { SiteHeader } from '#/components/site-header'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'theme-color',
        content: '#011e3c',
      },
      {
        title: 'FaithConnect',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/images/home/FaithConnect%20Icon%20V3.svg',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: RootNotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const isAuthRoute = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ].includes(pathname)

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <GoogleTagManagerScript />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <SiteHeader />
        <main>{children}</main>
        {isAuthRoute ? null : <SiteFooter />}
        <GoogleTagManagerPageView />
        <PostHogAnalytics />
        <Scripts />
      </body>
    </html>
  )
}

function RootNotFound() {
  return (
    <section className="page-wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="island-kicker">Page Not Found</p>
      <h1 className="display-title mt-4 text-4xl font-bold text-foreground sm:text-5xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        The page may have moved, or the URL might be incorrect.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md border px-6 py-3 font-semibold no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
        style={{
          background:
            'linear-gradient(145deg, color-mix(in oklab, var(--primary) 84%, var(--white)), color-mix(in oklab, var(--secondary) 68%, var(--white)))',
          color: 'var(--primary-foreground)',
          borderColor: 'color-mix(in oklab, var(--primary) 38%, var(--line))',
        }}
      >
        Back to Homepage
      </Link>
    </section>
  )
}
