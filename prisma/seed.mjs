import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Check if User 1 already exists
  const existingUser = await prisma.user.findUnique({
    where: { id: 1 }
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: 1,
        name: '李雷',
        points: 0,
        role: 'MEMBER'
      }
    })
    console.log('Seeded User "李雷" with 0 points.')
  } else {
    console.log('User "李雷" already exists. Skipping seed.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
