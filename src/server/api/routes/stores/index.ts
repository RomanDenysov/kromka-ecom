import { createTRPCRouter, publicProcedure } from '../../trpc'

export const storesRouter = createTRPCRouter({
  getStores: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.payload.find({
      collection: 'stores',
    })

    if (!result.docs.length) {
      return []
    }
    return result.docs
  }),
})
