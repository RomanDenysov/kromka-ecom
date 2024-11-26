import { createTRPCRouter, publicProcedure } from '../../trpc'
import { byIdValidator, bySlugValidator } from './validator'

export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.payload.find({
      collection: 'categories',
      limit: 100,
      sort: '-createdAt',
      where: {
        isVisible: { equals: true },
      },
      joins: {
        products: {
          where: {
            or: [{ status: { equals: 'active' } }, { status: { equals: 'sold' } }],
          },
        },
      },
    })

    const categoriesWithProducts = categories.docs.filter(
      (category) =>
        category.products && category.products.docs && category.products.docs.length > 0,
    )

    return categoriesWithProducts
  }),

  byId: publicProcedure.input(byIdValidator).query(async ({ input, ctx }) => {
    const { id } = input
    const category = await ctx.payload.find({
      collection: 'categories',
      where: {
        id: { equals: id },
      },
      limit: 1,
    })

    return category.docs[0]
  }),

  bySlug: publicProcedure.input(bySlugValidator).query(async ({ input, ctx }) => {
    const { slug } = input
    const category = await ctx.payload.find({
      collection: 'categories',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    return category.docs[0]
  }),
})
