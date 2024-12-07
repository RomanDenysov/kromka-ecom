import { createTRPCRouter, protectedProcedure, publicProcedure } from '../../trpc'
import { getUserById } from './service'
import { userSchemaValidator } from './validator'

export const usersRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    const id = ctx?.session?.user?.id

    if (!id) return null

    return getUserById(id)
  }),
  update: protectedProcedure.input(userSchemaValidator).mutation(async ({ ctx, input }) => {
    const id = ctx?.session?.user?.id
    if (!id) return null

    await ctx.payload.update({
      collection: 'users',
      id,
      data: input,
    })
  }),
})
