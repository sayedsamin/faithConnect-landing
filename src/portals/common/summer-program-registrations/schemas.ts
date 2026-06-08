import { z } from 'zod'

const timestampSchema = z.iso.datetime({ offset: true })

export const commonSummerProgramRegistrationStatusSchema = z.enum([
  'awaiting_confirmation',
  'confirmed',
  'cancelled',
])

export const commonSummerProgramRegistrationActionSchema = z.enum([
  'confirmed',
  'cancelled',
])

export const commonSummerProgramRegistrationSortSchema = z.enum([
  'submitted_at',
  'guardian',
  'status',
  'participant_count',
  'program',
])

export const commonSummerProgramRegistrationSortDirectionSchema = z.enum([
  'asc',
  'desc',
])

export const commonSummerProgramRegistrationViewSchema = z.enum([
  'participants',
])

const optionalSearchParamSchema = z
  .string()
  .trim()
  .min(1)
  .optional()
  .catch(undefined)

export const commonSummerProgramRegistrationsSearchSchema = z.object({
  status: commonSummerProgramRegistrationStatusSchema
    .optional()
    .catch(undefined),
  view: commonSummerProgramRegistrationViewSchema.optional().catch(undefined),
  q: optionalSearchParamSchema,
  program: optionalSearchParamSchema,
  sort: commonSummerProgramRegistrationSortSchema.catch('submitted_at'),
  dir: commonSummerProgramRegistrationSortDirectionSchema.catch('desc'),
})

export const commonSummerProgramRegistrationParticipantSchema = z
  .object({
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    age: z.number().int().min(0),
    grade_level: z.number().int().min(1),
    gender: z.string().trim().min(1),
  })
  .strict()

export const commonSummerProgramRegistrationSchema = z.object({
  id: z.uuid(),
  guardian_id: z.uuid(),
  program_code: z.string().trim().min(1),
  guardian_name: z.string().trim().min(1),
  guardian_email: z.email(),
  guardian_phone: z.string().trim().min(1),
  emergency_contact_name: z.string().trim().min(1).nullable(),
  emergency_contact_phone: z.string().trim().min(1).nullable(),
  notes: z.string().trim().min(1).nullable(),
  participants: z.array(commonSummerProgramRegistrationParticipantSchema),
  participant_count: z.number().int().min(0),
  status: commonSummerProgramRegistrationStatusSchema,
  terms_accepted_at: timestampSchema,
  created_at: timestampSchema,
  updated_at: timestampSchema,
})

export const commonSummerProgramRegistrationsSchema = z.array(
  commonSummerProgramRegistrationSchema,
)

export const updateCommonSummerProgramRegistrationStatusInputSchema = z
  .object({
    id: z.uuid(),
    status: commonSummerProgramRegistrationActionSchema,
  })
  .strict()

export type CommonSummerProgramRegistration = z.infer<
  typeof commonSummerProgramRegistrationSchema
>
export type CommonSummerProgramRegistrationView = z.infer<
  typeof commonSummerProgramRegistrationViewSchema
>
export type CommonSummerProgramRegistrationAction = z.infer<
  typeof commonSummerProgramRegistrationActionSchema
>
export type CommonSummerProgramRegistrationSort = z.infer<
  typeof commonSummerProgramRegistrationSortSchema
>
export type CommonSummerProgramRegistrationSortDirection = z.infer<
  typeof commonSummerProgramRegistrationSortDirectionSchema
>
export type CommonSummerProgramRegistrationsSearch = z.infer<
  typeof commonSummerProgramRegistrationsSearchSchema
>
export type CommonSummerProgramRegistrationStatus = z.infer<
  typeof commonSummerProgramRegistrationStatusSchema
>
export type UpdateCommonSummerProgramRegistrationStatusInput = z.infer<
  typeof updateCommonSummerProgramRegistrationStatusInputSchema
>
