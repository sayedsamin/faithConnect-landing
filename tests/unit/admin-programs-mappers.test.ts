import { describe, expect, it } from 'vitest'
import {
  toAdminProgram,
  toAdminProgramListItem,
  toPrismaProgramCreateData,
} from '#/portals/admin/programs/mappers'

const prismaProgram = {
  id: '5b8064e4-832b-45f5-9068-f5188742ca8c',
  name: 'Summer Leadership Camp',
  description: 'A practical week of leadership and STEAM activities.',
  minimumAge: 8,
  maximumAge: 12,
  startDate: new Date('2026-07-06T00:00:00.000Z'),
  endDate: new Date('2026-07-10T00:00:00.000Z'),
  location: 'Questura Academy',
  capacity: 24,
  registrationStatus: 'closed',
  programStatus: 'draft',
  createdBy: '4425a084-894d-4eb2-91c0-b1ba6d4ce2f9',
  createdAt: new Date('2026-05-19T17:00:00.000Z'),
  updatedAt: new Date('2026-05-19T17:00:00.000Z'),
}

describe('admin program Prisma mappers', () => {
  it('maps validated portal input to Prisma fields', () => {
    expect(
      toPrismaProgramCreateData(
        {
          name: ' Summer Leadership Camp ',
          description: ' A practical week of leadership and STEAM activities. ',
          minimum_age: 8,
          maximum_age: 12,
          start_date: '2026-07-06',
          end_date: '2026-07-10',
          location: ' Questura Academy ',
          capacity: 24,
          registration_status: 'closed',
          program_status: 'draft',
        },
        prismaProgram.createdBy,
      ),
    ).toMatchObject({
      name: prismaProgram.name,
      minimumAge: 8,
      maximumAge: 12,
      startDate: prismaProgram.startDate,
      endDate: prismaProgram.endDate,
      createdBy: prismaProgram.createdBy,
    })
  })

  it('maps Prisma rows to validated portal response fields', () => {
    expect(toAdminProgram(prismaProgram)).toMatchObject({
      id: prismaProgram.id,
      minimum_age: 8,
      maximum_age: 12,
      start_date: '2026-07-06',
      end_date: '2026-07-10',
      created_by: prismaProgram.createdBy,
    })
  })

  it('uses supervisor names with email fallback in list responses', () => {
    expect(
      toAdminProgramListItem({
        ...prismaProgram,
        supervisors: [
          {
            supervisor: {
              email: 'avery@example.com',
              fullName: ' Avery Stone ',
            },
          },
          {
            supervisor: {
              email: 'fallback@example.com',
              fullName: null,
            },
          },
        ],
      }),
    ).toMatchObject({
      assigned_supervisors: ['Avery Stone', 'fallback@example.com'],
      registered_children_count: 0,
    })
  })
})
