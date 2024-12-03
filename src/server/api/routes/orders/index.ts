import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../../trpc'

export const ordersRouter = createTRPCRouter({
  byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const { id } = input
    const order = await ctx.payload.findByID({
      collection: 'orders',
      id,
    })

    return order
  }),
})
