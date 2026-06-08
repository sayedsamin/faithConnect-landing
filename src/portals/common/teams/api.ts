import { createServerFn } from '@tanstack/react-start'
import { getPrismaClient } from '#/integrations/prisma/server'
import { requireCurrentUserRoles } from '#/lib/auth/server'
import {
  createRequestContext,
  logBusinessEvent,
} from '#/lib/observability/logging'
import {
  toCommonAssignableCampLeader,
  toCommonTeam,
  toCommonTeamProgram,
} from './mappers'
import {
  commonTeamsResponseSchema,
  createCommonTeamInputSchema,
  deleteCommonTeamInputSchema,
  updateCommonTeamInputSchema,
} from './schemas'
import type { CommonTeamsResponse } from './schemas'
import type { AppRole } from '#/lib/auth/rbac'

export const getCommonTeams = createServerFn({ method: 'GET' }).handler(
  async (): Promise<CommonTeamsResponse> => {
    const profile = await requireCurrentTeamManager()
    const programWhere = getVisibleProgramWhere(profile)

    const prisma = getPrismaClient()
    const [campLeaders, programs, teams] = await Promise.all([
      prisma.profile.findMany({
        where: { role: 'camp_leader' },
        orderBy: [{ fullName: 'asc' }, { email: 'asc' }],
        select: {
          id: true,
          email: true,
          fullName: true,
        },
      }),
      prisma.program.findMany({
        where: programWhere,
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
        orderBy: [{ startDate: 'asc' }, { name: 'asc' }],
      }),
      prisma.team.findMany({
        where: {
          program: programWhere,
        },
        include: {
          program: {
            select: { name: true },
          },
          leaders: {
            include: {
              campLeader: {
                select: {
                  id: true,
                  email: true,
                  fullName: true,
                },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
          _count: {
            select: { participants: true },
          },
        },
        orderBy: [{ program: { startDate: 'asc' } }, { name: 'asc' }],
      }),
    ])

    return commonTeamsResponseSchema.parse({
      camp_leaders: campLeaders.map(toCommonAssignableCampLeader),
      programs: programs.map(toCommonTeamProgram),
      teams: teams.map(toCommonTeam),
    })
  },
)

export const createCommonTeam = createServerFn({ method: 'POST' })
  .inputValidator(createCommonTeamInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentTeamManager()
    await assertCanManageProgram(profile, data.program_id)
    await assertCampLeadersExist(data.camp_leader_ids)
    const requestContext = createRequestContext({
      path: '/portals/common/teams',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    try {
      const team = await getPrismaClient().$transaction(async (transaction) => {
        const createdTeam = await transaction.team.create({
          data: {
            programId: data.program_id,
            name: data.name,
            description: data.description,
            capacity: data.capacity,
            createdBy: profile.id,
          },
        })

        if (data.camp_leader_ids.length) {
          await transaction.teamLeader.createMany({
            data: data.camp_leader_ids.map((campLeaderId) => ({
              teamId: createdTeam.id,
              campLeaderId,
              assignedBy: profile.id,
              roleLabel: 'Camp leader',
            })),
          })
        }

        return transaction.team.findUniqueOrThrow({
          where: { id: createdTeam.id },
          include: teamInclude,
        })
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'team.create',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'team',
          id: team.id,
        },
        status: 200,
        metadata: {
          programId: data.program_id,
          leaderCount: data.camp_leader_ids.length,
          durationMs: Date.now() - startedAt,
        },
      })

      return toCommonTeam(team)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'team.create',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'team',
          id: data.program_id,
        },
        status: 500,
        metadata: {
          programId: data.program_id,
          leaderCount: data.camp_leader_ids.length,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

export const updateCommonTeam = createServerFn({ method: 'POST' })
  .inputValidator(updateCommonTeamInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentTeamManager()
    const existingTeam = await getPrismaClient().team.findUnique({
      where: { id: data.teamId },
      select: { programId: true },
    })

    if (!existingTeam) {
      throw new Error('Team not found.')
    }

    await assertCanManageProgram(profile, existingTeam.programId)
    await assertCanManageProgram(profile, data.program_id)
    await assertCampLeadersExist(data.camp_leader_ids)
    const requestContext = createRequestContext({
      path: '/portals/common/teams',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    try {
      const team = await getPrismaClient().$transaction(async (transaction) => {
        await transaction.team.update({
          where: { id: data.teamId },
          data: {
            programId: data.program_id,
            name: data.name,
            description: data.description,
            capacity: data.capacity,
          },
        })

        await transaction.teamLeader.deleteMany({
          where: { teamId: data.teamId },
        })

        if (data.camp_leader_ids.length) {
          await transaction.teamLeader.createMany({
            data: data.camp_leader_ids.map((campLeaderId) => ({
              teamId: data.teamId,
              campLeaderId,
              assignedBy: profile.id,
              roleLabel: 'Camp leader',
            })),
          })
        }

        return transaction.team.findUniqueOrThrow({
          where: { id: data.teamId },
          include: teamInclude,
        })
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'team.update',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'team',
          id: data.teamId,
        },
        status: 200,
        metadata: {
          programId: data.program_id,
          leaderCount: data.camp_leader_ids.length,
          durationMs: Date.now() - startedAt,
        },
      })

      return toCommonTeam(team)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'team.update',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'team',
          id: data.teamId,
        },
        status: 500,
        metadata: {
          programId: data.program_id,
          leaderCount: data.camp_leader_ids.length,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

export const deleteCommonTeam = createServerFn({ method: 'POST' })
  .inputValidator(deleteCommonTeamInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentTeamManager()
    const existingTeam = await getPrismaClient().team.findUnique({
      where: { id: data.teamId },
      select: { programId: true },
    })

    if (!existingTeam) {
      throw new Error('Team not found.')
    }

    await assertCanManageProgram(profile, existingTeam.programId)
    const requestContext = createRequestContext({
      path: '/portals/common/teams',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    try {
      await getPrismaClient().team.delete({
        where: { id: data.teamId },
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'team.delete',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'team',
          id: data.teamId,
        },
        status: 200,
        metadata: {
          programId: existingTeam.programId,
          durationMs: Date.now() - startedAt,
        },
      })

      return deleteCommonTeamInputSchema.parse(data)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'team.delete',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'team',
          id: data.teamId,
        },
        status: 500,
        metadata: {
          programId: existingTeam.programId,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

const teamInclude = {
  program: {
    select: { name: true },
  },
  leaders: {
    include: {
      campLeader: {
        select: {
          id: true,
          email: true,
          fullName: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  },
  _count: {
    select: { participants: true },
  },
} as const

function requireCurrentTeamManager() {
  return requireCurrentUserRoles({
    allowedRoles: ['admin', 'superadmin', 'supervisor'],
    unauthenticatedMessage: 'You must be signed in to manage teams.',
    forbiddenMessage: 'You do not have permission to manage teams.',
  })
}

function getVisibleProgramWhere(profile: { id: string; role: AppRole }) {
  if (profile.role === 'admin' || profile.role === 'superadmin') {
    return {}
  }

  return {
    supervisors: {
      some: {
        supervisorId: profile.id,
      },
    },
  }
}

async function assertCanManageProgram(
  profile: { id: string; role: AppRole },
  programId: string,
) {
  const program = await getPrismaClient().program.findFirst({
    where: {
      id: programId,
      ...getVisibleProgramWhere(profile),
    },
    select: { id: true },
  })

  if (!program) {
    throw new Error('You do not have permission to manage that program.')
  }
}

async function assertCampLeadersExist(campLeaderIds: string[]) {
  if (!campLeaderIds.length) {
    return
  }

  const campLeaderCount = await getPrismaClient().profile.count({
    where: {
      id: { in: campLeaderIds },
      role: 'camp_leader',
    },
  })

  if (campLeaderCount !== campLeaderIds.length) {
    throw new Error('One or more selected camp leaders could not be found.')
  }
}
