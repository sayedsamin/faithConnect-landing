import { describe, expect, it } from 'vitest'
import {
  toCommonAssignableCampLeader,
  toCommonTeam,
  toCommonTeamProgram,
} from '#/portals/common/teams/mappers'

describe('common team Prisma mappers', () => {
  it('maps camp leader options', () => {
    expect(
      toCommonAssignableCampLeader({
        id: 'b947c635-a3f3-47a1-ac2f-f8214f51e1f6',
        email: 'leader@example.com',
        fullName: null,
      }),
    ).toEqual({
      id: 'b947c635-a3f3-47a1-ac2f-f8214f51e1f6',
      email: 'leader@example.com',
      full_name: null,
    })
  })

  it('maps programs with assigned supervisor labels', () => {
    expect(
      toCommonTeamProgram({
        id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
        name: 'Summer 2026',
        supervisors: [
          {
            supervisor: {
              email: 'supervisor@example.com',
              fullName: null,
            },
          },
        ],
      }),
    ).toEqual({
      id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
      name: 'Summer 2026',
      assigned_supervisors: ['supervisor@example.com'],
    })
  })

  it('maps teams with camp leaders and participant counts', () => {
    expect(
      toCommonTeam({
        id: '31905abc-9170-48a6-8a36-0506679d6159',
        programId: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
        program: { name: 'Summer 2026' },
        name: 'Team A',
        description: 'Morning team',
        capacity: 12,
        leaders: [
          {
            roleLabel: 'Camp leader',
            campLeader: {
              id: 'b947c635-a3f3-47a1-ac2f-f8214f51e1f6',
              email: 'leader@example.com',
              fullName: 'Lina Leader',
            },
          },
        ],
        _count: { participants: 3 },
        createdBy: '1878cc84-d98d-4f0d-b80f-a987a508ca93',
        createdAt: new Date('2026-05-16T14:30:00.000Z'),
        updatedAt: new Date('2026-05-16T14:30:00.000Z'),
      }),
    ).toEqual({
      id: '31905abc-9170-48a6-8a36-0506679d6159',
      program_id: '2f4dba34-63ac-46d6-8e40-1c1d973f8267',
      program_name: 'Summer 2026',
      name: 'Team A',
      description: 'Morning team',
      capacity: 12,
      camp_leaders: [
        {
          id: 'b947c635-a3f3-47a1-ac2f-f8214f51e1f6',
          email: 'leader@example.com',
          full_name: 'Lina Leader',
          role_label: 'Camp leader',
        },
      ],
      participant_count: 3,
      created_by: '1878cc84-d98d-4f0d-b80f-a987a508ca93',
      created_at: '2026-05-16T14:30:00.000Z',
      updated_at: '2026-05-16T14:30:00.000Z',
    })
  })
})
