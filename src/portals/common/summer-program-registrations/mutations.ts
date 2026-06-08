import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCommonSummerProgramRegistrationStatus } from './api'
import { commonSummerProgramRegistrationsQueryKey } from './queries'
import type { UpdateCommonSummerProgramRegistrationStatusInput } from './schemas'

export function useUpdateCommonSummerProgramRegistrationStatusMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateCommonSummerProgramRegistrationStatusInput) =>
      updateCommonSummerProgramRegistrationStatus({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: commonSummerProgramRegistrationsQueryKey,
      })
    },
  })
}
