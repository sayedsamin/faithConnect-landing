import { z } from 'zod'

export const addSuperadminAdminInputSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
})

export const removeSuperadminAdminInputSchema = z.object({
  adminId: z.uuid(),
})

export const superadminAdminProfileSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  full_name: z.string().nullable(),
  phone: z.string().nullable(),
  role: z.literal('admin'),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
})

export const superadminAdminsResponseSchema = z.object({
  admins: z.array(superadminAdminProfileSchema),
  total: z.number().int().nonnegative(),
})

export type SuperadminAdminProfile = z.infer<
  typeof superadminAdminProfileSchema
>

export type SuperadminAdminsResponse = z.infer<
  typeof superadminAdminsResponseSchema
>

export type AddSuperadminAdminInput = z.infer<
  typeof addSuperadminAdminInputSchema
>

export type RemoveSuperadminAdminInput = z.infer<
  typeof removeSuperadminAdminInputSchema
>
