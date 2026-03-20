import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  // Simulate scanning a code to add points
  const user = await prisma.user.update({
    where: { id: 1 },
    data: { points: { increment: 50 } }
  })
  return user
})
