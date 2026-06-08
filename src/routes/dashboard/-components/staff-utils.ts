import type { CommonStaffRole } from '#/portals/common/staff/schemas'

export function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function formatRole(role: CommonStaffRole) {
  return role === 'camp_leader' ? 'camp leader' : 'supervisor'
}

export function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback
}
