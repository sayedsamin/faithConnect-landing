import { z } from 'zod'

const optionalTrimmedString = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullable()
    .transform((value) => value || null)

const campLeaderIdsSchema = z
  .array(z.uuid())
  .refine((ids) => new Set(ids).size === ids.length, {
    message: 'Each camp leader can only be assigned once.',
  })

const commonTeamIdSchema = z.uuid()

const commonTeamProgramIdSchema = z.uuid()

export const createCommonTeamInputSchema = z.object({
  program_id: commonTeamProgramIdSchema,
  name: z.string().trim().min(1, 'Enter a team name').max(120),
  description: optionalTrimmedString(1000),
  capacity: z
    .union([
      z.coerce
        .number()
        .int('Capacity must be a whole number')
        .min(1, 'Capacity must be at least 1'),
      z.null(),
    ])
    .transform((value) => value ?? null),
  camp_leader_ids: campLeaderIdsSchema,
})

export const updateCommonTeamInputSchema = createCommonTeamInputSchema.extend({
  teamId: commonTeamIdSchema,
})

export const deleteCommonTeamInputSchema = z.object({
  teamId: commonTeamIdSchema,
})

export const commonTeamProgramSchema = z.object({
  id: commonTeamProgramIdSchema,
  name: z.string(),
  assigned_supervisors: z.array(z.string()),
})

const commonTeamLeaderSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  full_name: z.string().nullable(),
  role_label: z.string(),
})

export const commonAssignableCampLeaderSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  full_name: z.string().nullable(),
})

export const commonTeamSchema = z.object({
  id: commonTeamIdSchema,
  program_id: commonTeamProgramIdSchema,
  program_name: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  capacity: z.number().int().positive().nullable(),
  camp_leaders: z.array(commonTeamLeaderSchema),
  participant_count: z.number().int().nonnegative(),
  created_by: z.uuid(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
})

export const commonTeamsResponseSchema = z.object({
  camp_leaders: z.array(commonAssignableCampLeaderSchema),
  programs: z.array(commonTeamProgramSchema),
  teams: z.array(commonTeamSchema),
})

export type CommonAssignableCampLeader = z.infer<
  typeof commonAssignableCampLeaderSchema
>

export type CommonTeam = z.infer<typeof commonTeamSchema>

export type CommonTeamsResponse = z.infer<typeof commonTeamsResponseSchema>

export type CreateCommonTeamInput = z.infer<typeof createCommonTeamInputSchema>

export type DeleteCommonTeamInput = z.infer<typeof deleteCommonTeamInputSchema>

export type UpdateCommonTeamInput = z.infer<typeof updateCommonTeamInputSchema>
