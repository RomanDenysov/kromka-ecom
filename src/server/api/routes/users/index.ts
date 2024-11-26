import { createTRPCRouter, publicProcedure } from '../../trpc'
import { getUserById } from './service'

export const usersRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    const id = ctx?.session?.user?.id

    if (!id) return null

    return getUserById(id)
  }),
})
