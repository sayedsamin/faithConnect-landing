import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { appRoleSchema, getDashboardPathForRole, parseAppRole } from './rbac'
import { getCurrentUserProfile } from './server'
import type { AppRole } from './rbac'

const dashboardAccessInputSchema = z
  .object({
    allowedRoles: z.array(appRoleSchema).min(1).optional(),
    redirect: z
      .string()
      .trim()
      .refine(
        (value) =>
          value.startsWith('/') &&
          !value.startsWith('//') &&
          !value.includes('://'),
        'Redirect must be an internal path.',
      ),
    requiredRole: appRoleSchema.optional(),
  })
  .refine((value) => value.requiredRole || value.allowedRoles?.length, {
    message: 'At least one dashboard role is required.',
    path: ['requiredRole'],
  })

type DashboardAccessInput = z.infer<typeof dashboardAccessInputSchema>

const getDashboardAccess = createServerFn({ method: 'GET' })
  .inputValidator(dashboardAccessInputSchema)
  .handler(async ({ data }) => {
    const profile = await getCurrentUserProfile()

    if (!profile) {
      return {
        redirectTo: '/signin',
        search: { redirect: data.redirect },
      } as const
    }

    const allowedRoles =
      data.allowedRoles ?? (data.requiredRole ? [data.requiredRole] : [])

    if (!allowedRoles.includes(profile.role)) {
      return {
        redirectTo: getDashboardPathForRole(profile.role),
      } as const
    }

    return { redirectTo: null } as const
  })

export async function requireDashboardRole(input: DashboardAccessInput) {
  const validatedInput = dashboardAccessInputSchema.parse(input)
  const access = await getDashboardAccess({ data: validatedInput })
  const redirectTo = parseRedirectTarget(access.redirectTo)

  if (!redirectTo) {
    return
  }

  throw redirect({
    to: redirectTo,
    search: access.search,
    replace: true,
  })
}

function parseRedirectTarget(
  value: unknown,
): '/signin' | AppRoleDashboardPath | null {
  if (value === '/signin') {
    return value
  }

  const role = parseAppRoleFromDashboardPath(value)

  return role ? getDashboardPathForRole(role) : null
}

type AppRoleDashboardPath = ReturnType<typeof getDashboardPathForRole>

function parseAppRoleFromDashboardPath(value: unknown): AppRole | null {
  if (typeof value !== 'string') {
    return null
  }

  const role = value.replace('/dashboard/', '')

  return parseAppRole(role)
}
