import { useEffect } from 'react'
import posthog from 'posthog-js'
import { useRouterState } from '@tanstack/react-router'
import { env } from '#/lib/env'

let initialized = false

export function PostHogAnalytics() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  useEffect(() => {
    if (initialized || !env.VITE_POSTHOG_KEY) {
      return
    }

    posthog.init(env.VITE_POSTHOG_KEY, {
      api_host: env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      capture_pageview: false,
    })
    initialized = true
  }, [])

  useEffect(() => {
    if (!initialized) {
      return
    }

    posthog.capture('$pageview', { $current_url: pathname })
  }, [pathname])

  return null
}
