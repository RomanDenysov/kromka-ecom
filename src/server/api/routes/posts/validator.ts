import { z } from 'zod'

export const bySlugValidator = z.object({
  slug: z.string(),
})

export const sortSchema = z
  .array(
    z.object({
      field: z.string(),
      direction: z.enum(['asc', 'desc']),
    }),
  )
  .optional()

export const queryParamsSchema = z.object({
  sort: sortSchema,
  limit: z.number().min(1).max(50).optional(),
  search: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  isFeatured: z.boolean().optional(),
})

export const infinitePostsInputSchema = z.object({
  query: queryParamsSchema,
  cursor: z.number().optional(),
  excludeId: z.string().optional(),
})
