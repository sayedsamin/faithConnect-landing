import { createBrowserClient } from '@supabase/ssr'
import { env, hasSupabaseConfig } from '#/lib/env'
import { logger } from '#/lib/logger'

let cachedClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (!hasSupabaseConfig()) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.',
    )
  }

  if (!cachedClient) {
    cachedClient = createBrowserClient(
      env.VITE_SUPABASE_URL as string,
      env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
      {
        auth: {
          flowType: 'implicit',
        },
      },
    )
    logger.info('Supabase client initialized')
  }

  return cachedClient
}
