import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from '../../trpc'

export const usersRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    try {
      const id = ctx?.session?.user?.id
      if (!id) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User ID not found in session',
        })
      }

      const res = await ctx.payload.findByID({
        collection: 'users',
        id,
      })

      // If no user is found, throw a specific error
      if (!res) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User with ID ${id} does not exist in the database`,
        })
      }

      // Filter out sensitive fields
      const user = {
        ...res,
        accounts: undefined,
        sessions: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        verificationTokens: undefined,
      }

      return user
    } catch (error) {
      console.error('Error in getUser:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve user data',
        cause: error,
      })
    }
  }),
})
