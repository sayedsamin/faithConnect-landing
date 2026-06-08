import { createServerFn } from '@tanstack/react-start'
import { getPrismaClient } from '#/integrations/prisma/server'
import { envServer } from '#/lib/env.server'
import { requireCurrentUserRoles } from '#/lib/auth/server'
import {
  createRequestContext,
  logBusinessEvent,
} from '#/lib/observability/logging'
import {
  guardianSummerProgramParticipantSchema,
  guardianSummerProgramRegistrationResponseSchema,
  guardianSummerProgramRegistrationSchema,
  guardianSummerProgramRegistrationsListSchema,
} from './schemas'
import type { Prisma } from '#/generated/prisma/client'
import type { GuardianSummerProgramRegistrationInput } from './schemas'

type SummerProgram = {
  code: string
}

export const submitGuardianSummerProgramRegistration = createServerFn({
  method: 'POST',
})
  .inputValidator(guardianSummerProgramRegistrationSchema)
  .handler(async ({ data }) => {
    const profile = await requireCurrentUserRoles({
      allowedRoles: ['guardian'],
      unauthenticatedMessage:
        'You must be signed in to submit a summer program registration.',
      forbiddenMessage:
        'Only guardian accounts can submit summer program registrations.',
    })
    const requestContext = createRequestContext({
      path: '/portals/guardian/summer-program-registrations',
      method: 'POST',
      actor: {
        id: profile.id,
        role: profile.role,
      },
    })
    const startedAt = Date.now()
    const prisma = getPrismaClient()
    const program = await resolveActiveSummerProgram(prisma)

    try {
      const registration = await prisma.summerProgramRegistration.create({
        data: toPrismaRegistrationCreateData(data, profile.id, program.code),
        select: {
          id: true,
          status: true,
        },
      })
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'summerProgramRegistration.create',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'success',
        resource: {
          type: 'summerProgramRegistration',
          id: registration.id,
        },
        status: 200,
        metadata: {
          programCode: program.code,
          guardianEmail: data.guardian_email,
          participantCount: data.participants.length,
          durationMs: Date.now() - startedAt,
        },
      })

      return guardianSummerProgramRegistrationResponseSchema.parse(registration)
    } catch (error) {
      logBusinessEvent({
        requestId: requestContext.requestId,
        action: 'summerProgramRegistration.create',
        actor: {
          id: profile.id,
          role: profile.role,
        },
        outcome: 'failure',
        resource: {
          type: 'summerProgramRegistration',
        },
        status: 500,
        metadata: {
          programCode: program.code,
          participantCount: data.participants.length,
          durationMs: Date.now() - startedAt,
        },
        error,
      })
      throw error
    }
  })

export const getGuardianSummerProgramRegistrations = createServerFn({
  method: 'GET',
}).handler(async () => {
  const profile = await requireCurrentUserRoles({
    allowedRoles: ['guardian'],
    unauthenticatedMessage:
      'You must be signed in to view summer program registrations.',
    forbiddenMessage:
      'Only guardian accounts can view summer program registrations.',
  })

  const registrations =
    await getPrismaClient().summerProgramRegistration.findMany({
      where: {
        guardianId: profile.id,
        status: { not: 'cancelled' },
      },
      orderBy: { createdAt: 'desc' },
    })

  return guardianSummerProgramRegistrationsListSchema.parse(
    registrations.map((registration) => ({
      id: registration.id,
      program_code: registration.programCode,
      guardian_name: registration.guardianName,
      guardian_email: registration.guardianEmail,
      guardian_phone: registration.guardianPhone,
      emergency_contact_name: registration.emergencyContactName,
      emergency_contact_phone: registration.emergencyContactPhone,
      notes: registration.notes,
      participants: guardianSummerProgramParticipantSchema
        .array()
        .parse(registration.participantData),
      status: registration.status,
      terms_accepted_at: registration.termsAcceptedAt.toISOString(),
      created_at: registration.createdAt.toISOString(),
      updated_at: registration.updatedAt.toISOString(),
    })),
  )
})

function toPrismaRegistrationCreateData(
  registration: GuardianSummerProgramRegistrationInput,
  guardianId: string,
  programCode: string,
): Prisma.SummerProgramRegistrationCreateInput {
  return {
    guardian: { connect: { id: guardianId } },
    program: { connect: { code: programCode } },
    guardianName: registration.guardian_name,
    guardianEmail: registration.guardian_email,
    guardianPhone: registration.guardian_phone,
    emergencyContactName: registration.emergency_contact_name,
    emergencyContactPhone: registration.emergency_contact_phone,
    notes: registration.notes,
    participantData: toPrismaJson(registration.participants),
    termsAcceptedAt: new Date(),
  }
}

function toPrismaJson(value: unknown) {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue
}

async function resolveActiveSummerProgram(
  prisma: ReturnType<typeof getPrismaClient>,
): Promise<SummerProgram> {
  const configuredCode = envServer.SUMMER_PROGRAM_CODE.trim()
  const configuredProgram = configuredCode
    ? ((await prisma.program.findUnique({
        where: { code: configuredCode },
        select: { code: true },
      } as unknown as Parameters<
        typeof prisma.program.findUnique
      >[0])) as SummerProgram | null)
    : null

  if (configuredProgram) {
    return configuredProgram
  }

  const activeProgram = (await prisma.program.findFirst({
    where: {
      registrationStatus: 'open',
    },
    orderBy: {
      startDate: 'desc',
    },
    select: { code: true },
  } as unknown as Parameters<
    typeof prisma.program.findFirst
  >[0])) as SummerProgram | null

  if (!activeProgram) {
    throw new Error('No active summer program is currently available.')
  }

  return activeProgram
}
