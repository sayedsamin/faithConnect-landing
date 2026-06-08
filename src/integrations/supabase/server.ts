import { createServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'
import { env, hasSupabaseConfig } from '#/lib/env'

interface CookieAdapter {
  getAll: () => { name: string; value: string }[]
  set: (name: string, value: string, options: CookieOptions) => void
  remove: (name: string, options: CookieOptions) => void
}

export function createSupabaseServerClient(cookies: CookieAdapter) {
  if (!hasSupabaseConfig()) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.',
    )
  }

  return createServerClient(
    env.VITE_SUPABASE_URL as string,
    env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
    {
      cookies: {
        getAll: () => cookies.getAll(),
        setAll: (cookieList) => {
          for (const cookie of cookieList) {
            if (cookie.value) {
              cookies.set(cookie.name, cookie.value, cookie.options)
            } else {
              cookies.remove(cookie.name, cookie.options)
            }
          }
        },
      },
    },
  )
}
