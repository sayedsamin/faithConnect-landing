import 'dotenv/config'
import { defineConfig } from 'prisma/config'
import { z } from 'zod'

const directUrl = z.url().optional().parse(process.env.DIRECT_URL)

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  ...(directUrl ? { datasource: { url: directUrl } } : {}),
})
