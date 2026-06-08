import { createServerFn } from '@tanstack/react-start'
import { getPrismaClient } from '#/integrations/prisma/server'
import { requireCurrentUserRoles } from '#/lib/auth/server'
import {
  createRequestContext,
  logBusinessEvent,
} from '#/lib/observability/logging'
import { toSuperadminAdminProfile } from './mappers'
import {
  addSuperadminAdminInputSchema,
  removeSuperadminAdminInputSchema,
  superadminAdminsResponseSchema,
} from './schemas'
import type { SuperadminAdminsResponse } from './schemas'

export const getSuperadminAdmins = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SuperadminAdminsResponse> => {
    await requireCurrentSuperadmin()

    const admins = await getPrismaClient().profile.findMany({
      where: { role: 'admin' },
      orderBy: { createdAt: 'desc' },
    })

    return superadminAdminsResponseSchema.parse({
      admins: admins.map(toSuperadminAdminProfile),
      total: admins.length,
    })
  },
)

export const addSuperadminAdmin = createServerFn({ method: 'POST' })
  .inputValidator(addSuperadminAdminInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentSuperadmin()
    const requestContext = createRequestContext({
      path: '/portals/superadmin/admins',
      method: 'POST',
      actor: {
        id: profile.id,
        role: 'superadmin',
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

      if (targetProfile.role === 'superadmin') {
        throw new Error('Superadmin accounts already have elevated access.')
      }

      const updatedAdmin = await getPrismaClient().profile.update({
        where: { id: targetProfile.id },
        data: { role: 'admin' },
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'admin.create',
        actor: {
          id: profile.id,
          role: 'superadmin',
        },
        outcome: 'success',
        resource: {
          type: 'admin',
          id: updatedAdmin.id,
        },
        status: 200,
        metadata: {
          email: data.email,
          durationMs: Date.now() - startedAt,
        },
      })

      return toSuperadminAdminProfile(updatedAdmin)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'admin.create',
        actor: {
          id: profile.id,
          role: 'superadmin',
        },
        outcome: 'failure',
        resource: {
          type: 'admin',
        },
        status: 500,
        metadata: {
          email: data.email,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

export const removeSuperadminAdmin = createServerFn({ method: 'POST' })
  .inputValidator(removeSuperadminAdminInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentSuperadmin()
    const requestContext = createRequestContext({
      path: '/portals/superadmin/admins',
      method: 'POST',
      actor: {
        id: profile.id,
        role: 'superadmin',
      },
    })
    const startedAt = Date.now()

    const existingAdmin = await getPrismaClient().profile.findUnique({
      where: { id: data.adminId },
      select: { role: true },
    })

    if (!existingAdmin || existingAdmin.role !== 'admin') {
      throw new Error('That account is not currently an admin.')
    }

    try {
      await getPrismaClient().profile.update({
        where: { id: data.adminId },
        data: { role: 'guardian' },
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'admin.remove',
        actor: {
          id: profile.id,
          role: 'superadmin',
        },
        outcome: 'success',
        resource: {
          type: 'admin',
          id: data.adminId,
        },
        status: 200,
        metadata: {
          durationMs: Date.now() - startedAt,
        },
      })

      return removeSuperadminAdminInputSchema.parse(data)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'admin.remove',
        actor: {
          id: profile.id,
          role: 'superadmin',
        },
        outcome: 'failure',
        resource: {
          type: 'admin',
          id: data.adminId,
        },
        status: 500,
        metadata: {
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

function requireCurrentSuperadmin() {
  return requireCurrentUserRoles({
    allowedRoles: ['superadmin'],
    unauthenticatedMessage: 'You must be signed in to manage admins.',
    forbiddenMessage: 'You do not have permission to manage admins.',
  })
}
