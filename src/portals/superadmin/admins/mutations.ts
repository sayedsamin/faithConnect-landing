import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addSuperadminAdmin, removeSuperadminAdmin } from './api'
import { superadminAdminsQueryKey } from './queries'
import type {
  AddSuperadminAdminInput,
  RemoveSuperadminAdminInput,
} from './schemas'

export function useAddSuperadminAdminMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AddSuperadminAdminInput) =>
      addSuperadminAdmin({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: superadminAdminsQueryKey,
      })
    },
  })
}

export function useRemoveSuperadminAdminMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: RemoveSuperadminAdminInput) =>
      removeSuperadminAdmin({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: superadminAdminsQueryKey,
      })
    },
  })
}
