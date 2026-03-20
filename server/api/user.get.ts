import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const user = await prisma.user.findUnique({
    where: { id: 1 }
  })
  return user
})
