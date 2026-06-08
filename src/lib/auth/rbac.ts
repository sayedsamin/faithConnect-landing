import { z } from 'zod'

export const APP_ROLES = [
  'superadmin',
  'admin',
  'supervisor',
  'camp_leader',
  'guardian',
  'student',
] as const

export type AppRole = (typeof APP_ROLES)[number]

export const appRoleSchema = z.enum(APP_ROLES)

export const DASHBOARD_PATH_BY_ROLE = {
  superadmin: '/dashboard/superadmin',
  admin: '/dashboard/admin',
  supervisor: '/dashboard/supervisor',
  camp_leader: '/dashboard/supervisor',
  guardian: '/dashboard/guardian',
  student: '/dashboard/student',
} as const satisfies Record<AppRole, string>

export type DashboardPath = (typeof DASHBOARD_PATH_BY_ROLE)[AppRole]

const roleRank: Record<AppRole, number> = {
  superadmin: 5,
  admin: 4,
  supervisor: 3,
  camp_leader: 2,
  guardian: 1,
  student: 0,
}

export function hasMinimumRole(currentRole: AppRole, requiredRole: AppRole) {
  return roleRank[currentRole] >= roleRank[requiredRole]
}

export function assertMinimumRole(currentRole: AppRole, requiredRole: AppRole) {
  if (!hasMinimumRole(currentRole, requiredRole)) {
    throw new Error(`Forbidden: requires ${requiredRole}, got ${currentRole}`)
  }
}

export function getDashboardPathForRole(role: AppRole): DashboardPath {
  return DASHBOARD_PATH_BY_ROLE[role]
}

export function parseAppRole(value: unknown): AppRole | null {
  const result = appRoleSchema.safeParse(value)
  return result.success ? result.data : null
}
