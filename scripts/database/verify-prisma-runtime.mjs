import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../src/generated/prisma/client.ts'
import { z } from 'zod'

const databaseUrl = z.url().parse(process.env.DATABASE_URL)
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
})

try {
  const [profileCount, programCount, contactMessageCount] = await Promise.all([
    prisma.profile.count(),
    prisma.program.count(),
    prisma.contactMessage.count(),
  ])

  console.log({ profileCount, programCount, contactMessageCount })
} finally {
  await prisma.$disconnect()
}
