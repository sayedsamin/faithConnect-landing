import { useMemo } from 'react'
import type { CommonParticipant } from './schemas'

export function useParticipantsByTransactionId(
  participants: CommonParticipant[],
) {
  return useMemo(
    () => groupParticipantsByTransactionId(participants),
    [participants],
  )
}

function groupParticipantsByTransactionId(participants: CommonParticipant[]) {
  const groups = new Map<string, CommonParticipant[]>()

  for (const participant of participants) {
    if (!participant.transaction_id) {
      continue
    }

    const existing = groups.get(participant.transaction_id) ?? []
    existing.push(participant)
    groups.set(participant.transaction_id, existing)
  }

  return groups
}
