import { createServerOnlyFn } from '@tanstack/react-start'
import {
  deleteCookie,
  getCookies,
  setCookie,
} from '@tanstack/react-start/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '#/integrations/supabase/server'
import { getPrismaClient } from '#/integrations/prisma/server'
import { appRoleSchema } from './rbac'
import type { AppRole } from './rbac'

const currentUserProfileSchema = z.object({
  id: z.uuid(),
  email: z.string(),
  fullName: z.string().nullable(),
  phone: z.string().nullable(),
  role: appRoleSchema,
})

const requiredRolesSchema = z.array(appRoleSchema).min(1)

type CurrentUserProfile = z.infer<typeof currentUserProfileSchema>

export const getCurrentUserProfile = createServerOnlyFn(
  async (): Promise<CurrentUserProfile | null> => {
    const supabase = createSupabaseServerClient(getServerCookieAdapter())
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user?.id) {
      return null
    }

    const profile = await getPrismaClient().profile.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
      },
    })

    if (!profile) {
      throw new Error('Unable to find your account profile.')
    }

    return currentUserProfileSchema.parse(profile)
  },
)

export const requireCurrentUserRoles = createServerOnlyFn(
  async ({
    allowedRoles,
    forbiddenMessage,
    unauthenticatedMessage,
  }: {
    allowedRoles: AppRole[]
    forbiddenMessage: string
    unauthenticatedMessage: string
  }): Promise<CurrentUserProfile> => {
    const roles = requiredRolesSchema.parse(allowedRoles)
    const profile = await getCurrentUserProfile()

    if (!profile) {
      throw new Error(unauthenticatedMessage)
    }

    if (!roles.includes(profile.role)) {
      throw new Error(forbiddenMessage)
    }

    return profile
  },
)

type CookieAdapter = Parameters<typeof createSupabaseServerClient>[0]

function getServerCookieAdapter(): CookieAdapter {
  return {
    getAll: () =>
      Object.entries(getCookies()).map(([name, value]) => ({ name, value })),
    set: setCookie,
    remove: deleteCookie,
  }
}
