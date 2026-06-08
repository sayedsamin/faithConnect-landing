import { createServerFn } from '@tanstack/react-start'
import { getPrismaClient } from '#/integrations/prisma/server'
import { requireCurrentUserRoles } from '#/lib/auth/server'
import {
  createRequestContext,
  logBusinessEvent,
} from '#/lib/observability/logging'
import {
  toAdminProgram,
  toAdminProgramListItem,
  toPrismaProgramUpdateData,
  toPrismaProgramCreateData,
} from './mappers'
import {
  adminProgramIdSchema,
  adminProgramsListSchema,
  createAdminProgramInputSchema,
  updateAdminProgramInputSchema,
} from './schemas'

export const createAdminProgram = createServerFn({ method: 'POST' })
  .inputValidator(createAdminProgramInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentProgramAdmin()
    const requestContext = createRequestContext({
      path: '/portals/admin/programs',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    try {
      const program = await getPrismaClient().program.create({
        data: toPrismaProgramCreateData(data, profile.id),
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'program.create',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'program',
          id: program.id,
        },
        status: 200,
        metadata: {
          name: program.name,
          status: program.programStatus,
          durationMs: Date.now() - startedAt,
        },
      })

      return toAdminProgram(program)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'program.create',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'program',
          id: undefined,
        },
        status: 500,
        metadata: {
          name: data.name,
          status: data.program_status,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

export const updateAdminProgram = createServerFn({ method: 'POST' })
  .inputValidator(updateAdminProgramInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentProgramAdmin()
    const requestContext = createRequestContext({
      path: '/portals/admin/programs',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    try {
      const program = await getPrismaClient().program.update({
        where: { id: data.id },
        data: toPrismaProgramUpdateData(data),
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'program.update',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'program',
          id: program.id,
        },
        status: 200,
        metadata: {
          name: program.name,
          status: program.programStatus,
          durationMs: Date.now() - startedAt,
        },
      })

      return toAdminProgram(program)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'program.update',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'program',
          id: data.id,
        },
        status: 500,
        metadata: {
          id: data.id,
          name: data.name,
          status: data.program_status,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

export const getAdminPrograms = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireCurrentProgramAdmin()
    const programs = await getPrismaClient().program.findMany({
      include: {
        supervisors: {
          include: {
            supervisor: {
              select: {
                email: true,
                fullName: true,
              },
            },
          },
        },
      },
      orderBy: [{ startDate: 'asc' }, { createdAt: 'desc' }],
    })

    return adminProgramsListSchema.parse(programs.map(toAdminProgramListItem))
  },
)

export const getAdminProgram = createServerFn({ method: 'GET' })
  .inputValidator(adminProgramIdSchema)
  .handler(async ({ data }) => {
    await requireCurrentProgramAdmin()
    const program = await getPrismaClient().program.findUnique({
      where: { id: data },
    })

    return program ? toAdminProgram(program) : null
  })

function requireCurrentProgramAdmin() {
  return requireCurrentUserRoles({
    allowedRoles: ['admin', 'superadmin'],
    unauthenticatedMessage: 'You must be signed in to manage programs.',
    forbiddenMessage: 'You do not have permission to manage programs.',
  })
}
