import '@tanstack/react-start/server-only'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '#/generated/prisma/client'
import { envServer, hasPrismaConfig } from '#/lib/env.server'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaSchemaSignature: string | undefined
}

const prismaSchemaSignature = 'summerProgramRegistration:participantData'

export function getPrismaClient() {
  if (!hasPrismaConfig()) {
    throw new Error('Prisma is not configured. Set DATABASE_URL.')
  }

  const cachedPrisma = globalForPrisma.prisma

  if (cachedPrisma && isStalePrismaClient(cachedPrisma)) {
    void cachedPrisma.$disconnect()
    globalForPrisma.prisma = undefined
    globalForPrisma.prismaSchemaSignature = undefined
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: envServer.DATABASE_URL as string,
      }),
    })
    globalForPrisma.prismaSchemaSignature = prismaSchemaSignature
  }

  return globalForPrisma.prisma
}

function isStalePrismaClient(prisma: unknown) {
  return (
    globalForPrisma.prismaSchemaSignature !== prismaSchemaSignature ||
    typeof prisma !== 'object' ||
    prisma === null ||
    !('summerProgramRegistration' in prisma)
  )
}
