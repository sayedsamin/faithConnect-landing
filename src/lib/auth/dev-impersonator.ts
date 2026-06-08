import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import type { AppRole } from './rbac'
import { envServer } from '#/lib/env.server'

const impersonationRoleSchema = z.enum([
  'superadmin',
  'admin',
  'supervisor',
  'team_lead',
  'guardian',
])

export type ImpersonationRole = z.infer<typeof impersonationRoleSchema>

type DevRoleDefinition = {
  email?: string
  password?: string
  appRole: AppRole
}

const impersonationRoleDefinitions: Record<
  ImpersonationRole,
  DevRoleDefinition
> = {
  superadmin: {
    email: envServer.DEMO_SUPERADMIN_EMAIL,
    password: envServer.DEMO_SUPERADMIN_PASSWORD,
    appRole: 'superadmin',
  },
  admin: {
    email: envServer.DEMO_ADMIN_EMAIL,
    password: envServer.DEMO_ADMIN_PASSWORD,
    appRole: 'admin',
  },
  supervisor: {
    email: envServer.DEMO_SUPERVISOR_EMAIL,
    password: envServer.DEMO_SUPERVISOR_PASSWORD,
    appRole: 'supervisor',
  },
  team_lead: {
    email: envServer.DEMO_TEAM_LEAD_EMAIL,
    password: envServer.DEMO_TEAM_LEAD_PASSWORD,
    appRole: 'camp_leader',
  },
  guardian: {
    email: envServer.DEMO_GUARDIAN_EMAIL,
    password: envServer.DEMO_GUARDIAN_PASSWORD,
    appRole: 'guardian',
  },
} as const

export const getDevImpersonationCredentials = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      role: impersonationRoleSchema,
    }),
  )
  .handler(async ({ data }) => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Impersonation is disabled in production.')
    }

    const selectedRole = data.role
    const credentials = impersonationRoleDefinitions[selectedRole]

    if (!credentials.email || !credentials.password) {
      throw new Error(
        `Missing demo credentials for role "${selectedRole}" in environment variables.`,
      )
    }

    return {
      email: credentials.email,
      password: credentials.password,
      role: credentials.appRole,
    }
  })
