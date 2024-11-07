import type { Sort, Where } from 'payload'
import { createTRPCRouter, publicProcedure } from '../../trpc'
import { byIdValidator, infiniteQueryValidator } from './validator'
import { bySlugValidator } from '../categories/validator'
import { TRPCError } from '@trpc/server'

export const productsRouter = createTRPCRouter({
  infiniteProducts: publicProcedure.input(infiniteQueryValidator).query(async ({ input, ctx }) => {
    const { query, cursor, excludeId } = input
    const { sort, limit, search, category, ...queryOpts } = query

    const page = cursor ?? 1

    const buildWhereClause = async (): Promise<Where> => {
      const conditions: Where = {}

      for (const [key, value] of Object.entries(queryOpts)) {
        if (value !== undefined) {
          conditions[key] = { equals: value }
        }
      }

      if (excludeId) {
        conditions.id = { not_equals: excludeId }
      }

      if (category) {
        // Сначала найдем категорию по имени или слагу
        const foundCategory = await ctx.payload.find({
          collection: 'categories',
          where: {
            or: [{ title: { equals: category } }, { slug: { equals: category } }],
          },
          limit: 1,
        })

        if (foundCategory.docs.length > 0) {
          conditions.category = { equals: foundCategory.docs[0].id }
        }

        return conditions
      }

      if (search) {
        conditions.or = [
          { title: { contains: search } },
          // { descr: { contains: search } },
          { 'category.title': { contains: search } },
          { tags: { contains: search } },
        ]
      }
      return conditions
    }

    const buildSortOptions = (): Sort => {
      if (!sort || sort.length === 0) return ['-createdAt']

      return sort.map(({ field, direction }) => (direction === 'desc' ? `-${field}` : field))
    }

    const result = await ctx.payload.find({
      collection: 'products',
      limit: limit || 10,
      page,
      sort: buildSortOptions(),
      where: await buildWhereClause(),
      depth: 2, // Глубина популяции relations
      // overrideAccess: false,
    })

    console.log('RESULT QUERY', result)

    const processedDocs = result.docs.map((doc) => ({
      ...doc,
      priceId: undefined,
      stripeId: undefined,
    }))

    return {
      data: processedDocs,
      total: result.totalDocs,
      nextCursor: result.hasNextPage ? page + 1 : undefined,
      prevCursor: result.hasPrevPage ? page - 1 : undefined,
      hasMore: result.hasNextPage,
      pageInfo: {
        totalPages: result.totalPages,
        currentPage: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
      },
    }
  }),

  byId: publicProcedure.input(byIdValidator).query(async ({ input, ctx }) => {
    const product = await ctx.payload.find({
      collection: 'products',
      where: {
        id: { equals: input.id },
      },
      limit: 1,
    })

    return product.docs[0]
  }),

  bySlug: publicProcedure.input(bySlugValidator).query(async ({ input, ctx }) => {
    const product = await ctx.payload.find({
      collection: 'products',
      where: {
        slug: { equals: input.slug },
      },
      limit: 1,
    })

    if (product.docs.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      })
    }

    return product.docs[0]
  }),
})
