import { createServerFn } from '@tanstack/react-start'
import { getPrismaClient } from '#/integrations/prisma/server'
import { requireCurrentUserRoles } from '#/lib/auth/server'
import {
  createRequestContext,
  logBusinessEvent,
} from '#/lib/observability/logging'
import { toCommonStaffProfile } from './mappers'
import {
  addCommonStaffInputSchema,
  commonStaffResponseSchema,
  removeCommonStaffInputSchema,
  updateCommonStaffInputSchema,
} from './schemas'
import type { CommonStaffResponse } from './schemas'

export const getCommonStaff = createServerFn({ method: 'GET' }).handler(
  async (): Promise<CommonStaffResponse> => {
    await requireCurrentStaffManager()

    const staff = await getPrismaClient().profile.findMany({
      where: {
        role: {
          in: ['supervisor', 'camp_leader'],
        },
      },
      orderBy: [{ role: 'asc' }, { createdAt: 'desc' }],
    })

    return commonStaffResponseSchema.parse({
      staff: staff.map(toCommonStaffProfile),
      total: staff.length,
    })
  },
)

export const addCommonStaff = createServerFn({ method: 'POST' })
  .inputValidator(addCommonStaffInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentStaffManager()
    const requestContext = createRequestContext({
      path: '/portals/common/staff',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    try {
      const targetProfiles = await getPrismaClient().profile.findMany({
        where: {
          email: {
            equals: data.email,
            mode: 'insensitive',
          },
        },
        take: 2,
      })

      if (targetProfiles.length === 0) {
        throw new Error('No existing account was found for that email.')
      }

      if (targetProfiles.length > 1) {
        throw new Error('Unable to find that account.')
      }

      const [targetProfile] = targetProfiles

      if (
        targetProfile.role === 'superadmin' ||
        targetProfile.role === 'admin'
      ) {
        throw new Error('Admin accounts cannot be reassigned as program staff.')
      }

      const updatedStaff = await getPrismaClient().profile.update({
        where: { id: targetProfile.id },
        data: { role: data.role },
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'staff.add',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'staff',
          id: updatedStaff.id,
        },
        status: 200,
        metadata: {
          email: data.email,
          newRole: data.role,
          durationMs: Date.now() - startedAt,
        },
      })

      return toCommonStaffProfile(updatedStaff)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'staff.add',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'staff',
        },
        status: 500,
        metadata: {
          email: data.email,
          newRole: data.role,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

export const updateCommonStaff = createServerFn({ method: 'POST' })
  .inputValidator(updateCommonStaffInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentStaffManager()
    const requestContext = createRequestContext({
      path: '/portals/common/staff',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    const existingStaff = await getPrismaClient().profile.findUnique({
      where: { id: data.staffId },
      select: { role: true },
    })

    if (!existingStaff || !isProgramStaffRole(existingStaff.role)) {
      throw new Error('That account is not currently program staff.')
    }

    try {
      const updatedStaff = await getPrismaClient().profile.update({
        where: { id: data.staffId },
        data: {
          fullName: data.full_name?.trim() || null,
          phone: data.phone?.trim() || null,
          role: data.role,
        },
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'staff.update',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'staff',
          id: data.staffId,
        },
        status: 200,
        metadata: {
          previousRole: existingStaff.role,
          newRole: data.role,
          durationMs: Date.now() - startedAt,
        },
      })
      return toCommonStaffProfile(updatedStaff)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'staff.update',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'staff',
          id: data.staffId,
        },
        status: 500,
        metadata: {
          previousRole: existingStaff.role,
          newRole: data.role,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

export const removeCommonStaff = createServerFn({ method: 'POST' })
  .inputValidator(removeCommonStaffInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentStaffManager()
    const requestContext = createRequestContext({
      path: '/portals/common/staff',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    const existingStaff = await getPrismaClient().profile.findUnique({
      where: { id: data.staffId },
      select: { role: true },
    })

    if (!existingStaff || !isProgramStaffRole(existingStaff.role)) {
      throw new Error('That account is not currently program staff.')
    }

    try {
      await getPrismaClient().profile.update({
        where: { id: data.staffId },
        data: { role: 'guardian' },
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'staff.remove',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'staff',
          id: data.staffId,
        },
        status: 200,
        metadata: {
          previousRole: existingStaff.role,
          durationMs: Date.now() - startedAt,
        },
      })
      return removeCommonStaffInputSchema.parse(data)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'staff.remove',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'staff',
          id: data.staffId,
        },
        status: 500,
        metadata: {
          previousRole: existingStaff.role,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

function requireCurrentStaffManager() {
  return requireCurrentUserRoles({
    allowedRoles: ['admin', 'superadmin'],
    unauthenticatedMessage: 'You must be signed in to manage program staff.',
    forbiddenMessage: 'You do not have permission to manage program staff.',
  })
}

function isProgramStaffRole(role: string) {
  return role === 'supervisor' || role === 'camp_leader'
}
