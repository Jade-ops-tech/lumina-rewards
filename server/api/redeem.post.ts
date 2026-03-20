import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cost = body.cost

  if (!cost || cost <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid cost' })
  }

  // Check balance
  const user = await prisma.user.findUnique({ where: { id: 1 } })
  if (!user || user.points < cost) {
    throw createError({ statusCode: 400, statusMessage: 'Insufficient Balance' })
  }

  // Deduct points
  const updatedUser = await prisma.user.update({
    where: { id: 1 },
    data: { points: { decrement: cost } }
  })
  
  return updatedUser
})
