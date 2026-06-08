import { z } from 'zod'

export const authRedirectSearchSchema = z.object({
  redirect: z
    .string()
    .trim()
    .refine(
      (value) =>
        value.startsWith('/') &&
        !value.startsWith('//') &&
        !value.includes('://'),
      'Redirect must be an internal path.',
    )
    .optional()
    .catch(undefined),
})

export type AuthRedirectSearch = z.infer<typeof authRedirectSearchSchema>

export function getPostAuthRedirect(
  redirect: string | undefined,
  fallback: string,
) {
  return redirect ?? fallback
}
