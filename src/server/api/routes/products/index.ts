import type { Sort, Where } from 'payload'
import { createTRPCRouter, publicProcedure } from '../../trpc'
import { byIdValidator, infiniteQueryValidator } from './validator'
import { bySlugValidator } from '../categories/validator'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const productsRouter = createTRPCRouter({
  getInitialProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(12),
        categories: z.array(z.string()),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, categories } = input

      const buildWhereClause = async (category: string): Promise<Where> => {
        const foundCategory = await ctx.payload.find({
          collection: 'categories',
          where: {
            slug: { equals: category },
          },
          limit: 1,
        })

        if (foundCategory.docs.length === 0) {
          return {}
        }

        return {
          category: { equals: foundCategory.docs[0].id },
        }
      }

      const productsPromises = categories.map(async (category) => {
        const whereClause = await buildWhereClause(category)
        const result = await ctx.payload.find({
          collection: 'products',
          where: whereClause,
          limit: limit,
          sort: '-createdAt',
          depth: 1,
        })

        return {
          category,
          products: result.docs,
        }
      })

      const productsPerCategory = await Promise.all(productsPromises)
      const allProducts = productsPerCategory.flatMap(({ products }) => products)
      const shuffledProducts = allProducts.sort(() => 0.5 - Math.random())
      const limitedProducts = shuffledProducts.slice(0, limit)
      return limitedProducts
    }),
  infiniteProducts: publicProcedure.input(infiniteQueryValidator).query(async ({ input, ctx }) => {
    const { query, cursor } = input
    const { sort, limit, search, excludeId, category, ...queryOpts } = query

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

      if (cursor?.createdAt && sort?.[0]) {
        const isDescending = sort[0].startsWith('-')
        conditions.createdAt = {
          [isDescending ? 'less_than' : 'greater_than']: cursor.createdAt,
        }
      }

      if (category) {
        if (Array.isArray(category)) {
          const categoryPromises = category.map(async (cat) => {
            const foundCategory = await ctx.payload.find({
              collection: 'categories',
              where: {
                or: [{ title: { equals: cat } }, { slug: { equals: cat } }],
              },
              limit: 1,
            })
            return foundCategory.docs[0]?.id
          })
          const categoryIds = (await Promise.all(categoryPromises)).filter(Boolean)
          if (categoryIds.length > 0) {
            conditions.category = { in: categoryIds }
          }
        } else {
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
        }
      }

      if (search) {
        conditions.or = [
          { title: { contains: search } },
          { 'category.title': { contains: search } },
          { tags: { contains: search } },
        ]
      }
      return conditions
    }

    const buildSortOptions = (): Sort => {
      if (!sort || sort.length === 0) return ['-createdAt']
      return sort
    }

    const result = await ctx.payload.find({
      collection: 'products',
      limit: limit + 1,
      sort: buildSortOptions(),
      where: await buildWhereClause(),
      depth: 2,
    })

    const hasMore = result.docs.length > limit
    const docs = result.docs.slice(0, limit)
    const lastDoc = docs[docs.length - 1]
    const nextCursor = hasMore ? { createdAt: lastDoc.createdAt, id: lastDoc.id } : undefined

    return {
      data: docs.map((doc) => ({
        ...doc,
        priceId: undefined,
        stripeId: undefined,
      })),
      nextCursor,
      total: result.totalDocs,
      hasMore,
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
