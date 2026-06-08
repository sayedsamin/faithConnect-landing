import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAdminProgram, updateAdminProgram } from './api'
import { adminProgramQueryKey, adminProgramsQueryKey } from './queries'
import type {
  CreateAdminProgramInput,
  UpdateAdminProgramInput,
} from './schemas'

export function useCreateAdminProgramMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateAdminProgramInput) =>
      createAdminProgram({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: adminProgramsQueryKey,
      })
    },
  })
}

export function useUpdateAdminProgramMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateAdminProgramInput) =>
      updateAdminProgram({ data: input }),
    onSuccess: async (program) => {
      await queryClient.invalidateQueries({
        queryKey: adminProgramsQueryKey,
      })
      await queryClient.invalidateQueries({
        queryKey: adminProgramQueryKey(program.id),
      })
    },
  })
}
