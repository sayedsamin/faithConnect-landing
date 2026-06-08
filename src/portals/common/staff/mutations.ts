import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCommonStaff, removeCommonStaff, updateCommonStaff } from './api'
import { commonStaffQueryKey } from './queries'
import type {
  AddCommonStaffInput,
  RemoveCommonStaffInput,
  UpdateCommonStaffInput,
} from './schemas'

export function useAddCommonStaffMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AddCommonStaffInput) => addCommonStaff({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commonStaffQueryKey })
    },
  })
}

export function useUpdateCommonStaffMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateCommonStaffInput) =>
      updateCommonStaff({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commonStaffQueryKey })
    },
  })
}

export function useRemoveCommonStaffMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: RemoveCommonStaffInput) =>
      removeCommonStaff({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commonStaffQueryKey })
    },
  })
}
