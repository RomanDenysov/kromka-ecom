import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from '../../trpc'

export const profilesRoutes = createTRPCRouter({
  getProfile: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id

    if (!userId) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    const result = await ctx.payload.find({
      collection: 'profiles',
      where: {
        userId: { equals: userId },
      },
    })

    return result.docs.length > 0 ? result.docs[0] : null
  }),
})
