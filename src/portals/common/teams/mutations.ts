import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCommonTeam, deleteCommonTeam, updateCommonTeam } from './api'
import { commonTeamsQueryKey } from './queries'
import type {
  CreateCommonTeamInput,
  DeleteCommonTeamInput,
  UpdateCommonTeamInput,
} from './schemas'

export function useCreateCommonTeamMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateCommonTeamInput) =>
      createCommonTeam({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commonTeamsQueryKey })
    },
  })
}

export function useUpdateCommonTeamMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateCommonTeamInput) =>
      updateCommonTeam({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commonTeamsQueryKey })
    },
  })
}

export function useDeleteCommonTeamMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: DeleteCommonTeamInput) =>
      deleteCommonTeam({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commonTeamsQueryKey })
    },
  })
}
