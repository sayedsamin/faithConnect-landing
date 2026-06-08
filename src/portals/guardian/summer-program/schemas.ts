import { z } from 'zod'

const optionalTrimmedStringSchema = z
  .union([z.string().trim().min(1), z.literal('')])
  .optional()
  .transform((value) => value || undefined)

const participantGenderSchema = z
  .union([z.enum(['Female', 'Male', 'Prefer not to say']), z.literal('')])
  .refine((value) => value !== '', 'Select a participant gender')
  .transform((value) => value)

export const guardianSummerProgramParticipantSchema = z
  .object({
    first_name: z.string().trim().min(1, 'Enter the participant first name'),
    last_name: z.string().trim().min(1, 'Enter the participant last name'),
    age: z.coerce
      .number()
      .int('Enter a whole number')
      .min(11, 'Participants must be at least 11')
      .max(17, 'Participants must be 17 or younger'),
    grade_level: z.coerce
      .number()
      .int('Enter a whole number')
      .min(1, 'Grade must be at least 1')
      .max(12, 'Grade must be 12 or lower'),
    gender: participantGenderSchema,
  })
  .strict()

export const guardianSummerProgramRegistrationSchema = z
  .object({
    guardian_name: z.string().trim().min(2, 'Enter your name'),
    guardian_email: z.string().trim().email('Enter a valid email address'),
    guardian_phone: z.string().trim().min(7, 'Enter your phone number'),
    emergency_contact_name: optionalTrimmedStringSchema,
    emergency_contact_phone: optionalTrimmedStringSchema,
    notes: optionalTrimmedStringSchema,
    participants: z
      .array(guardianSummerProgramParticipantSchema)
      .min(1, 'Add at least one participant')
      .max(6, 'Register up to 6 participants at a time'),
    accept_terms: z
      .boolean()
      .refine((value) => value, 'Agree to the Terms and Conditions'),
  })
  .strict()

export const guardianSummerProgramRegistrationResponseSchema = z.object({
  id: z.uuid(),
  status: z.literal('awaiting_confirmation'),
})

export const guardianSummerProgramRegistrationStatusSchema = z.enum([
  'awaiting_confirmation',
  'confirmed',
  'cancelled',
])

export const guardianSummerProgramRegistrationListItemSchema = z.object({
  id: z.uuid(),
  program_code: z.string().trim().min(1),
  guardian_name: z.string().trim().min(1),
  guardian_email: z.string().trim().email(),
  guardian_phone: z.string().trim().min(1),
  emergency_contact_name: z.string().trim().min(1).nullable(),
  emergency_contact_phone: z.string().trim().min(1).nullable(),
  notes: z.string().trim().min(1).nullable(),
  participants: z.array(guardianSummerProgramParticipantSchema),
  status: guardianSummerProgramRegistrationStatusSchema,
  terms_accepted_at: z.iso.datetime({ offset: true }),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
})

export const guardianSummerProgramRegistrationsListSchema = z.array(
  guardianSummerProgramRegistrationListItemSchema,
)

export type GuardianSummerProgramParticipant = z.infer<
  typeof guardianSummerProgramParticipantSchema
>
export type GuardianSummerProgramRegistrationInput = z.infer<
  typeof guardianSummerProgramRegistrationSchema
>
export type GuardianSummerProgramRegistrationFormValues = z.input<
  typeof guardianSummerProgramRegistrationSchema
>
export type GuardianSummerProgramRegistrationResponse = z.infer<
  typeof guardianSummerProgramRegistrationResponseSchema
>
export type GuardianSummerProgramRegistrationStatus = z.infer<
  typeof guardianSummerProgramRegistrationStatusSchema
>
export type GuardianSummerProgramRegistrationListItem = z.infer<
  typeof guardianSummerProgramRegistrationListItemSchema
>
