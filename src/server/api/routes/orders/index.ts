import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../../trpc'

export const ordersRouter = createTRPCRouter({
  byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const { id } = input
    const order = await ctx.payload.findByID({
      collection: 'orders',
      id,
    })

    return order
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id

    if (!userId) return null

    const orders = await ctx.payload.find({
      collection: 'orders',
      where: {
        user: { equals: userId },
      },
      sort: ['-createdAt'],
      limit: 10,
      depth: 2,
    })

    return orders.docs
  }),
})
