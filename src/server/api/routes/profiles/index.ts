import { COLLECTIONS } from '~/server/payload/config'
import { createTRPCRouter, publicProcedure } from '../../trpc'
import { getProfileById } from './service'
import { updateProfileSchema } from './validator'

export const profilesRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id

    if (!userId) {
      return null
    }

    return getProfileById(userId)
  }),

  create: publicProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session?.user?.id ?? null

    const profile = await ctx.payload.create({
      collection: 'profiles',
      data: {
        user: userId,
        options: {
          terms: false,
          privacy: false,
          cookie: true,
        },
      },
    })

    return profile
  }),

  update: publicProcedure.input(updateProfileSchema).mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id
    if (!userId) throw new Error('Unauthorized')

    const existingProfile = await ctx.payload.find({
      collection: COLLECTIONS.PROFILES,
      where: {
        user: { equals: userId },
      },
    })

    if (!existingProfile.docs.length) {
      throw new Error('Profile not found')
    }

    const profile = await ctx.payload.update({
      collection: COLLECTIONS.PROFILES,
      id: existingProfile.docs[0].id,
      data: {
        ...input,
      },
    })

    return profile
  }),
})
