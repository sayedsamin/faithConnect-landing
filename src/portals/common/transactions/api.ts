import { createServerFn } from '@tanstack/react-start'
import { getPrismaClient } from '#/integrations/prisma/server'
import { requireCurrentUserRoles } from '#/lib/auth/server'
import { toCommonParticipant, toCommonTransaction } from './mappers'
import { commonTransactionsResponseSchema } from './schemas'
import type { CommonTransactionsResponse } from './schemas'

export const getCommonTransactions = createServerFn({ method: 'GET' }).handler(
  async (): Promise<CommonTransactionsResponse> => {
    const profile = await requireCurrentUserRoles({
      allowedRoles: ['guardian', 'admin', 'superadmin'],
      unauthenticatedMessage: 'You must be signed in to view transactions.',
      forbiddenMessage: 'You do not have permission to view transactions.',
    })
    const transactions = await getPrismaClient().transaction.findMany({
      where: profile.role === 'guardian' ? { guardianId: profile.id } : {},
      include: {
        participants: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { paidAt: 'desc' },
    })

    return commonTransactionsResponseSchema.parse({
      participants: transactions.flatMap(({ participants }) =>
        participants.map(toCommonParticipant),
      ),
      participantWarning: null,
      transactions: transactions.map(toCommonTransaction),
    })
  },
)
