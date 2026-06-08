import { z } from 'zod'

export const adminProgramIdSchema = z.uuid()

export const adminProgramRegistrationStatusSchema = z.enum([
  'closed',
  'open',
  'waitlist',
])

export const adminProgramStatusSchema = z.enum([
  'draft',
  'published',
  'archived',
])

export const createAdminProgramInputSchema = z.object({
  name: z.string().trim().min(1, 'Enter a program name').max(120),
  description: z.string().trim().min(1, 'Enter a description').max(2000),
  minimum_age: z.coerce
    .number()
    .int('Minimum age must be a whole number')
    .min(0, 'Minimum age cannot be negative'),
  maximum_age: z.coerce
    .number()
    .int('Maximum age must be a whole number')
    .min(0, 'Maximum age cannot be negative'),
  start_date: z.iso.date('Enter a valid start date'),
  end_date: z.iso.date('Enter a valid end date'),
  location: z.string().trim().min(1, 'Enter a location').max(200),
  capacity: z.coerce
    .number()
    .int('Capacity must be a whole number')
    .min(1, 'Capacity must be at least 1'),
  registration_status: adminProgramRegistrationStatusSchema,
  program_status: adminProgramStatusSchema,
})

export const updateAdminProgramInputSchema =
  createAdminProgramInputSchema.extend({
    id: z.uuid(),
  })

export const adminProgramSchema = createAdminProgramInputSchema.extend({
  id: z.uuid(),
  created_by: z.uuid(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
})

export const adminProgramListItemSchema = adminProgramSchema.extend({
  assigned_supervisors: z.array(z.string().trim().min(1)),
  registered_children_count: z.number().int().min(0),
})

export const adminProgramsListSchema = z.array(adminProgramListItemSchema)

export type AdminProgram = z.infer<typeof adminProgramSchema>

export type AdminProgramListItem = z.infer<typeof adminProgramListItemSchema>

export type AdminProgramRegistrationStatus = z.infer<
  typeof adminProgramRegistrationStatusSchema
>

export type AdminProgramStatus = z.infer<typeof adminProgramStatusSchema>

export type CreateAdminProgramInput = z.infer<
  typeof createAdminProgramInputSchema
>

export type UpdateAdminProgramInput = z.infer<
  typeof updateAdminProgramInputSchema
>

export type CreateAdminProgramFormValues = z.input<
  typeof createAdminProgramInputSchema
>
