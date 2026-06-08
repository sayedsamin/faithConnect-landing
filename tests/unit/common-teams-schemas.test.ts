import { describe, expect, it } from 'vitest'
import {
  commonTeamsResponseSchema,
  createCommonTeamInputSchema,
  updateCommonTeamInputSchema,
} from '#/portals/common/teams/schemas'

describe('common team schemas', () => {
  it('validates team responses', () => {
    expect(() =>
      commonTeamsResponseSchema.parse({
        camp_leaders: [
          {
            id: 'b947c635-a3f3-47a1-ac2f-f8214f51e1f6',
            email: 'leader@example.com',
            full_name: 'Lina Leader',
          },
        ],
        programs: [
          {
            id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
            name: 'Summer 2026',
            assigned_supervisors: ['Sue Supervisor'],
          },
        ],
        teams: [
          {
            id: '31905abc-9170-48a6-8a36-0506679d6159',
            program_id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
            program_name: 'Summer 2026',
            name: 'Team A',
            description: null,
            capacity: 12,
            camp_leaders: [
              {
                id: 'b947c635-a3f3-47a1-ac2f-f8214f51e1f6',
                email: 'leader@example.com',
                full_name: 'Lina Leader',
                role_label: 'Camp leader',
              },
            ],
            participant_count: 0,
            created_by: '1878cc84-d98d-4f0d-b80f-a987a508ca93',
            created_at: '2026-05-16T14:30:00+00:00',
            updated_at: '2026-05-16T14:30:00.123456+00:00',
          },
        ],
      }),
    ).not.toThrow()
  })

  it('normalizes optional capacity and description input', () => {
    expect(
      createCommonTeamInputSchema.parse({
        program_id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
        name: '  Team A  ',
        description: '',
        capacity: null,
        camp_leader_ids: [],
      }),
    ).toEqual({
      program_id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
      name: 'Team A',
      description: null,
      capacity: null,
      camp_leader_ids: [],
    })
  })

  it('rejects duplicate camp leader assignments', () => {
    const leaderId = 'b947c635-a3f3-47a1-ac2f-f8214f51e1f6'
    const result = updateCommonTeamInputSchema.safeParse({
      teamId: '31905abc-9170-48a6-8a36-0506679d6159',
      program_id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
      name: 'Team A',
      description: null,
      capacity: 12,
      camp_leader_ids: [leaderId, leaderId],
    })

    expect(result.success).toBe(false)
  })
})
