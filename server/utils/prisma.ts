import { PrismaClient } from '@prisma/client'

// In production (Nitro), the bundled files shift directories. We override the relative path with PM2's absolute path.
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || undefined,
})

export default prisma
