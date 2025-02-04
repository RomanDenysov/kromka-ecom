import { TRPCError } from '@trpc/server'
import type { Where } from 'payload'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../../trpc'
import { bySlugValidator } from '../categories/validator'
import { byIdValidator, infiniteQueryValidator } from './validator'

export const productsRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        searchTerm: z.string(),
        limit: z.number().optional().default(5),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { searchTerm, limit } = input

      const products = await ctx.payload.find({
        collection: 'products',
        where: {
          and: [
            { status: { equals: 'active' } },
            {
              or: [{ title: { contains: searchTerm } }, { descr: { contains: searchTerm } }],
            },
          ],
        },
        limit,
      })

      console.log('Products:', products)

      return products.docs
    }),

  infiniteProducts: publicProcedure.input(infiniteQueryValidator).query(async ({ input, ctx }) => {
    const { query, cursor } = input
    const { sort, limit, excludeId, category, ...queryOpts } = query

    const page = cursor ?? 1

    const buildWhereClause = async (): Promise<Where> => {
      const conditions: Where = {
        status: { equals: 'active' },
      }

      for (const [key, value] of Object.entries(queryOpts)) {
        if (value !== undefined) {
          conditions[key] = { equals: value }
        }
      }

      if (excludeId) {
        conditions.id = { not_equals: excludeId }
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

      return conditions
    }

    const { docs, totalDocs, hasNextPage, nextPage } = await ctx.payload.find({
      collection: 'products',
      limit: limit,
      sort: sort || ['-createdAt'],
      page,
      where: await buildWhereClause(),
      depth: 2,
    })

    return {
      products: docs,
      total: totalDocs,
      hasNextPage,
      nextCursor: hasNextPage ? nextPage : undefined,
    }
  }),

  byId: publicProcedure.input(byIdValidator).query(async ({ input, ctx }) => {
    const product = await ctx.payload.find({
      collection: 'products',
      where: {
        id: { equals: input.id },
        status: { equals: 'active' },
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
        status: { equals: 'active' },
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
