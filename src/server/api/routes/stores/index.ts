import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from '../../trpc'
import { bySlugValidator } from './validator'

export const storesRouter = createTRPCRouter({
  getStores: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.payload.find({
      collection: 'stores',
      where: {
        isVisible: { equals: true },
      },
      sort: '-createdAt',
    })

    if (!result.docs.length) {
      return []
    }
    return result.docs
  }),

  bySlug: publicProcedure.input(bySlugValidator).query(async ({ input, ctx }) => {
    const { slug } = input
    const store = await ctx.payload.find({
      collection: 'stores',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    if (!store) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Store not found',
      })
    }

    return store.docs[0]
  }),
})
