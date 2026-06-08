import { randomUUID } from 'node:crypto'

import {
  adminProgramListItemSchema,
  adminProgramSchema,
  createAdminProgramInputSchema,
  updateAdminProgramInputSchema,
} from './schemas'
import type {
  CreateAdminProgramInput,
  UpdateAdminProgramInput,
} from './schemas'

interface PrismaProgramRow {
  id: string
  name: string
  description: string
  minimumAge: number
  maximumAge: number
  startDate: Date
  endDate: Date
  location: string
  capacity: number
  registrationStatus: string
  programStatus: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

interface PrismaProgramListRow extends PrismaProgramRow {
  supervisors: {
    supervisor: {
      email: string
      fullName: string | null
    }
  }[]
}

export function toPrismaProgramCreateData(
  input: CreateAdminProgramInput,
  createdBy: string,
) {
  const program = createAdminProgramInputSchema.parse(input)

  return {
    name: program.name,
    description: program.description,
    code: toProgramCode({
      name: program.name,
      startDate: program.start_date,
      location: program.location,
    }),
    minimumAge: program.minimum_age,
    maximumAge: program.maximum_age,
    startDate: parseDatabaseDate(program.start_date),
    endDate: parseDatabaseDate(program.end_date),
    location: program.location,
    capacity: program.capacity,
    registrationStatus: program.registration_status,
    programStatus: program.program_status,
    createdBy,
  }
}

function toProgramCode(input: {
  name: string
  startDate: string
  location: string
}) {
  const nameSlug = input.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  const locationSlug = input.location
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  const dateSlug = input.startDate.replace(/-/g, '')
  const codeBase = `${nameSlug}-${dateSlug}-${locationSlug}`.replace(
    /^-+|-+$/g,
    '',
  )
  const uniqueSuffix = randomUUID().slice(0, 8)
  const normalizedBase = codeBase || 'program'

  return `${normalizedBase.slice(0, 111)}-${uniqueSuffix}`
}

export function toPrismaProgramUpdateData(input: UpdateAdminProgramInput) {
  const program = updateAdminProgramInputSchema.parse(input)

  return {
    name: program.name,
    description: program.description,
    minimumAge: program.minimum_age,
    maximumAge: program.maximum_age,
    startDate: parseDatabaseDate(program.start_date),
    endDate: parseDatabaseDate(program.end_date),
    location: program.location,
    capacity: program.capacity,
    registrationStatus: program.registration_status,
    programStatus: program.program_status,
  }
}

export function toAdminProgram(row: PrismaProgramRow) {
  return adminProgramSchema.parse({
    id: row.id,
    name: row.name,
    description: row.description,
    minimum_age: row.minimumAge,
    maximum_age: row.maximumAge,
    start_date: formatDatabaseDate(row.startDate),
    end_date: formatDatabaseDate(row.endDate),
    location: row.location,
    capacity: row.capacity,
    registration_status: row.registrationStatus,
    program_status: row.programStatus,
    created_by: row.createdBy,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  })
}

export function toAdminProgramListItem(row: PrismaProgramListRow) {
  return adminProgramListItemSchema.parse({
    ...toAdminProgram(row),
    assigned_supervisors: row.supervisors.map(
      ({ supervisor }) => supervisor.fullName?.trim() || supervisor.email,
    ),
    registered_children_count: 0,
  })
}

function parseDatabaseDate(value: string) {
  return new Date(`${value}T00:00:00.000Z`)
}

function formatDatabaseDate(value: Date) {
  return value.toISOString().slice(0, 10)
}
