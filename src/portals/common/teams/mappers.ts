import {
  commonAssignableCampLeaderSchema,
  commonTeamProgramSchema,
  commonTeamSchema,
} from './schemas'

interface PrismaTeamProgramRow {
  id: string
  name: string
  supervisors: {
    supervisor: {
      email: string
      fullName: string | null
    }
  }[]
}

interface PrismaTeamRow {
  id: string
  programId: string
  name: string
  description: string | null
  capacity: number | null
  createdBy: string
  createdAt: Date
  updatedAt: Date
  program: {
    name: string
  }
  leaders: {
    roleLabel: string
    campLeader: {
      id: string
      email: string
      fullName: string | null
    }
  }[]
  _count: {
    participants: number
  }
}

interface PrismaAssignableCampLeaderRow {
  id: string
  email: string
  fullName: string | null
}

export function toCommonAssignableCampLeader(
  row: PrismaAssignableCampLeaderRow,
) {
  return commonAssignableCampLeaderSchema.parse({
    id: row.id,
    email: row.email,
    full_name: row.fullName,
  })
}

export function toCommonTeamProgram(row: PrismaTeamProgramRow) {
  return commonTeamProgramSchema.parse({
    id: row.id,
    name: row.name,
    assigned_supervisors: row.supervisors.map(
      ({ supervisor }) => supervisor.fullName?.trim() || supervisor.email,
    ),
  })
}

export function toCommonTeam(row: PrismaTeamRow) {
  return commonTeamSchema.parse({
    id: row.id,
    program_id: row.programId,
    program_name: row.program.name,
    name: row.name,
    description: row.description,
    capacity: row.capacity,
    camp_leaders: row.leaders.map(({ campLeader, roleLabel }) => ({
      id: campLeader.id,
      email: campLeader.email,
      full_name: campLeader.fullName,
      role_label: roleLabel,
    })),
    participant_count: row._count.participants,
    created_by: row.createdBy,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  })
}
