import { commonStaffProfileSchema } from './schemas'

interface PrismaStaffProfileRow {
  id: string
  email: string
  fullName: string | null
  phone: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export function toCommonStaffProfile(row: PrismaStaffProfileRow) {
  return commonStaffProfileSchema.parse({
    id: row.id,
    email: row.email,
    full_name: row.fullName,
    phone: row.phone,
    role: row.role,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  })
}
