import { useMutation } from '@tanstack/react-query'
import { submitGuardianSummerProgramRegistration } from './api'
import type { GuardianSummerProgramRegistrationInput } from './schemas'

export function useSubmitGuardianSummerProgramRegistrationMutation() {
  return useMutation({
    mutationFn: (input: GuardianSummerProgramRegistrationInput) =>
      submitGuardianSummerProgramRegistration({ data: input }),
  })
}
