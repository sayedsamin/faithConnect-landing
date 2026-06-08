import { createServerFn } from '@tanstack/react-start'
import { getPrismaClient } from '#/integrations/prisma/server'
import { requireCurrentUserRoles } from '#/lib/auth/server'
import {
  createRequestContext,
  logBusinessEvent,
} from '#/lib/observability/logging'
import { toCommonSummerProgramRegistration } from './mappers'
import {
  commonSummerProgramRegistrationParticipantSchema,
  commonSummerProgramRegistrationSchema,
  commonSummerProgramRegistrationsSchema,
  updateCommonSummerProgramRegistrationStatusInputSchema,
} from './schemas'
import type { Prisma } from '#/generated/prisma/client'

export const getCommonSummerProgramRegistrations = createServerFn({
  method: 'GET',
}).handler(async () => {
  await requireCurrentProgramRegistrationApprover()

  const registrations =
    await getPrismaClient().summerProgramRegistration.findMany({
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    })

  return commonSummerProgramRegistrationsSchema.parse(
    registrations.map(toCommonSummerProgramRegistration),
  )
})

export const updateCommonSummerProgramRegistrationStatus = createServerFn({
  method: 'POST',
})
  .inputValidator(updateCommonSummerProgramRegistrationStatusInputSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentProgramRegistrationApprover()
    const requestContext = createRequestContext({
      path: '/portals/common/summer-program-registrations',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()

    const prisma = getPrismaClient()
    try {
      const registration = await prisma.$transaction(async (transaction) => {
        const existing = await transaction.summerProgramRegistration.findUnique(
          {
            where: { id: data.id },
          },
        )

        if (!existing) {
          throw new Error('Registration not found.')
        }

        const updated = await transaction.summerProgramRegistration.update({
          where: { id: data.id },
          data: { status: data.status },
        })

        if (data.status === 'confirmed') {
          await ensureRegistrationParticipants(transaction, updated)
        }

        if (data.status === 'cancelled') {
          await transaction.participant.deleteMany({
            where: {
              summerProgramRegistrationId: updated.id,
              transactionId: null,
            },
          })
        }

        return updated
      })

      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'summerProgramRegistration.updateStatus',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'summerProgramRegistration',
          id: data.id,
        },
        status: 200,
        metadata: {
          newStatus: data.status,
          durationMs: Date.now() - startedAt,
        },
      })

      return commonSummerProgramRegistrationSchema.parse(
        toCommonSummerProgramRegistration(registration),
      )
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'summerProgramRegistration.updateStatus',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'summerProgramRegistration',
          id: data.id,
        },
        status: 500,
        metadata: {
          newStatus: data.status,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

function requireCurrentProgramRegistrationApprover() {
  return requireCurrentUserRoles({
    allowedRoles: ['admin', 'superadmin'],
    unauthenticatedMessage:
      'You must be signed in to review summer program registrations.',
    forbiddenMessage:
      'You do not have permission to review summer program registrations.',
  })
}

async function ensureRegistrationParticipants(
  transaction: Prisma.TransactionClient,
  registration: {
    id: string
    guardianId: string
    participantData: Prisma.JsonValue
  },
) {
  const existingParticipantCount = await transaction.participant.count({
    where: {
      summerProgramRegistrationId: registration.id,
      transactionId: null,
    },
  })

  if (existingParticipantCount > 0) {
    return
  }

  const participants = commonSummerProgramRegistrationParticipantSchema
    .array()
    .parse(registration.participantData)

  if (!participants.length) {
    return
  }

  await transaction.participant.createMany({
    data: participants.map((participant) => ({
      guardianId: registration.guardianId,
      summerProgramRegistrationId: registration.id,
      firstName: participant.first_name,
      lastName: participant.last_name,
      age: String(participant.age),
      gender: participant.gender,
      gradeLevel: String(participant.grade_level),
      rawItem: toPrismaJson(participant),
    })),
  })
}

function toPrismaJson(value: unknown) {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue
}
