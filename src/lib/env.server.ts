import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const envServer = createEnv({
  server: {
    DATABASE_URL: z.url().optional(),
    DIRECT_URL: z.url().optional(),
    SUPABASE_ADMIN_DIRECT_URL: z.url().optional(),
    REDIS_URL: z.url().optional(),
    ZEFFY_API_KEY: z.string().min(1).optional(),
    ZEFFY_API_BASE_URL: z.url().optional(),
    ZEFFY_WEBHOOK_SECRET: z.string().min(16).optional(),
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.coerce.number().int().positive().optional(),
    SMTP_SECURE: z.enum(['true', 'false']).optional(),
    SMTP_USER: z.string().min(1).optional(),
    SMTP_PASS: z.string().min(1).optional(),
    CONTACT_TO_EMAIL: z.email().optional(),
    CONTACT_FROM_EMAIL: z.email().optional(),
    DEMO_SUPERADMIN_EMAIL: z.email().optional(),
    DEMO_SUPERADMIN_PASSWORD: z.string().min(1).optional(),
    DEMO_ADMIN_EMAIL: z.email().optional(),
    DEMO_ADMIN_PASSWORD: z.string().min(1).optional(),
    DEMO_SUPERVISOR_EMAIL: z.email().optional(),
    DEMO_SUPERVISOR_PASSWORD: z.string().min(1).optional(),
    DEMO_TEAM_LEAD_EMAIL: z.email().optional(),
    DEMO_TEAM_LEAD_PASSWORD: z.string().min(1).optional(),
    DEMO_GUARDIAN_EMAIL: z.email().optional(),
    DEMO_GUARDIAN_PASSWORD: z.string().min(1).optional(),
    SUMMER_PROGRAM_CODE: z.string().trim().min(1).default('summer2026'),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})

export function hasPrismaConfig() {
  return Boolean(envServer.DATABASE_URL)
}

export function hasZeffyConfig() {
  return Boolean(envServer.ZEFFY_API_KEY)
}

export function hasZeffyWebhookConfig() {
  return Boolean(envServer.ZEFFY_WEBHOOK_SECRET)
}

export function hasContactSmtpConfig() {
  return Boolean(
    envServer.SMTP_HOST &&
    envServer.SMTP_PORT &&
    envServer.SMTP_USER &&
    envServer.SMTP_PASS &&
    envServer.CONTACT_TO_EMAIL &&
    envServer.CONTACT_FROM_EMAIL,
  )
}
