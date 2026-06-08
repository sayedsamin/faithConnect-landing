import { PrismaPg } from '@prisma/adapter-pg'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { PrismaClient } from '../../src/generated/prisma/client.ts'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.url(),
  SUPABASE_SECRET_KEY: z.string().min(1),
  DATABASE_URL: z.url(),
  SUPERADMIN_BOOTSTRAP_EMAIL: z.email(),
  SUPERADMIN_BOOTSTRAP_PASSWORD: z.string().min(16),
  SUPERADMIN_BOOTSTRAP_FULL_NAME: z.string().trim().min(1),
})

const env = envSchema.parse(process.env)
const email = env.SUPERADMIN_BOOTSTRAP_EMAIL
const password = env.SUPERADMIN_BOOTSTRAP_PASSWORD
const fullName = env.SUPERADMIN_BOOTSTRAP_FULL_NAME
const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
})

try {
  const { data: userResult, error: createUserError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        guardian_name: fullName,
      },
    })

  if (createUserError) {
    throw createUserError
  }

  const user = userResult.user

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!user) {
    throw new Error('Supabase did not return a created user.')
  }

  await prisma.profile.update({
    where: { id: user.id },
    data: {
      email,
      role: 'superadmin',
      fullName,
    },
  })

  console.log(`Created superadmin: ${email}`)
} finally {
  await prisma.$disconnect()
}
