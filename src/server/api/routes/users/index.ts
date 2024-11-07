import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../../trpc'

export const usersRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    const id = ctx?.session?.user?.id
    if (!id) throw new TRPCError({ code: 'NOT_FOUND' })
    const res = await ctx.payload.findByID({
      collection: 'users',
      id,
    })

    const user = {
      ...res,
      accounts: undefined,
      sessions: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      verificationTokens: undefined,
    }

    return user
  }),
})
