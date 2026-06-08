import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_GTM_CONTAINER_ID: z
      .string()
      .regex(/^GTM-[A-Z0-9]+$/)
      .optional(),
    VITE_SENTRY_DSN: z.url().optional(),
    VITE_POSTHOG_KEY: z.string().min(1).optional(),
    VITE_POSTHOG_HOST: z.url().optional(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
