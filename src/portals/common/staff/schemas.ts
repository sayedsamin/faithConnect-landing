import { z } from 'zod'

export const commonStaffRoleSchema = z.enum(['supervisor', 'camp_leader'])

const commonStaffIdSchema = z.uuid()

export const addCommonStaffInputSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  role: commonStaffRoleSchema,
})

export const updateCommonStaffInputSchema = z.object({
  staffId: commonStaffIdSchema,
  full_name: z
    .string()
    .trim()
    .max(120, 'Name must be 120 characters or fewer')
    .nullable(),
  phone: z
    .string()
    .trim()
    .max(40, 'Phone must be 40 characters or fewer')
    .nullable(),
  role: commonStaffRoleSchema,
})

export const removeCommonStaffInputSchema = z.object({
  staffId: commonStaffIdSchema,
})

export const commonStaffProfileSchema = z.object({
  id: commonStaffIdSchema,
  email: z.email(),
  full_name: z.string().nullable(),
  phone: z.string().nullable(),
  role: commonStaffRoleSchema,
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
})

export const commonStaffResponseSchema = z.object({
  staff: z.array(commonStaffProfileSchema),
  total: z.number().int().nonnegative(),
})

export type AddCommonStaffInput = z.infer<typeof addCommonStaffInputSchema>

export type CommonStaffProfile = z.infer<typeof commonStaffProfileSchema>

export type CommonStaffResponse = z.infer<typeof commonStaffResponseSchema>

export type CommonStaffRole = z.infer<typeof commonStaffRoleSchema>

export type RemoveCommonStaffInput = z.infer<
  typeof removeCommonStaffInputSchema
>

export type UpdateCommonStaffInput = z.infer<
  typeof updateCommonStaffInputSchema
>
