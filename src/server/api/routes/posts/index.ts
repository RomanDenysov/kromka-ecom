import { Sort, Where } from 'payload'
import { createTRPCRouter, publicProcedure } from '../../trpc'
import { bySlugValidator, infinitePostsInputSchema } from './validator'

export const postsRouter = createTRPCRouter({
  infinitePosts: publicProcedure.input(infinitePostsInputSchema).query(async ({ input, ctx }) => {
    const { query, cursor, excludeId } = input
    const { sort, limit = 10, search, status, isFeatured } = query
    const page = cursor ?? 1

    const buildWhereClause = (): Where => {
      const conditions: Where = {
        // Базовые условия для публичного доступа
        status: { equals: 'published' },
      }

      if (status) {
        conditions.status = { equals: status }
      }

      if (isFeatured) {
        conditions.isFeatured = { equals: isFeatured }
      }

      if (excludeId) {
        conditions.id = { not_equals: excludeId }
      }

      if (search) {
        conditions.or = [
          {
            title: {
              contains: search,
            },
          },
          {
            content: {
              contains: search,
            },
          },
        ]
      }

      return conditions
    }

    const buildSortOptions = (): Sort => {
      if (!sort?.length) return ['-createdAt']
      return sort.map(({ field, direction }) => (direction === 'desc' ? `-${field}` : field))
    }

    try {
      const result = await ctx.payload.find({
        collection: 'posts',
        limit,
        page,
        sort: buildSortOptions(),
        where: buildWhereClause(),
        depth: 2,
      })

      const processedDocs = result.docs.map((doc) => ({
        ...doc, // Удаляем баннер из результатов
      }))

      return {
        items: processedDocs,
        pageInfo: {
          totalItems: result.totalDocs,
          totalPages: result.totalPages,
          currentPage: result.page,
          itemsPerPage: limit,
          hasPreviousPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
        },
        nextCursor: result.hasNextPage ? page + 1 : undefined,
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      throw new Error('Failed to fetch posts')
    }
  }),

  bySlug: publicProcedure.input(bySlugValidator).query(async ({ input, ctx }) => {
    const { slug } = input
    const post = await ctx.payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    return post.docs[0]
  }),

  getPosts: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.payload.find({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
      },
      sort: '-createdAt',
    })

    if (!result.docs.length) {
      return []
    }
    return result.docs
  }),

  getTags: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.payload.find({
      collection: 'tags',
      // where: {
      //   posts: { equals: 'published' },
      // },
      sort: '-createdAt',
    })

    if (!result.docs.length) {
      return []
    }

    return result.docs
  }),
})
