import {
  commonSummerProgramRegistrationParticipantSchema,
  commonSummerProgramRegistrationSchema,
} from './schemas'
import type { Prisma } from '#/generated/prisma/client'

type PrismaSummerProgramRegistrationRow = {
  id: string
  guardianId: string
  programCode: string
  program?: {
    code: string
  } | null
  guardianName: string
  guardianEmail: string
  guardianPhone: string
  emergencyContactName: string | null
  emergencyContactPhone: string | null
  notes: string | null
  participantData: Prisma.JsonValue
  status: string
  termsAcceptedAt: Date
  createdAt: Date
  updatedAt: Date
}

export function toCommonSummerProgramRegistration(
  row: PrismaSummerProgramRegistrationRow,
) {
  const participants = commonSummerProgramRegistrationParticipantSchema
    .array()
    .parse(row.participantData)

  return commonSummerProgramRegistrationSchema.parse({
    id: row.id,
    guardian_id: row.guardianId,
    program_code: row.program?.code || row.programCode,
    guardian_name: row.guardianName,
    guardian_email: row.guardianEmail,
    guardian_phone: row.guardianPhone,
    emergency_contact_name: row.emergencyContactName,
    emergency_contact_phone: row.emergencyContactPhone,
    notes: row.notes,
    participants,
    participant_count: participants.length,
    status: row.status,
    terms_accepted_at: row.termsAcceptedAt.toISOString(),
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  })
}
