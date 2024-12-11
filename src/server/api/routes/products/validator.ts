import { z } from 'zod'

const statusValidator = z.enum(['published', 'draft', 'archived', 'sold']).optional()

export const queryValidator = z.object({
  category: z.union([z.string(), z.array(z.string())]).optional(),
  sort: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).default(12),
  isFeatured: z.boolean().optional(),

  excludeId: z.string().optional(),
})

export const infiniteQueryValidator = z.object({
  // limit: z.number().min(1).max(100).optional(),
  cursor: z.number().optional(),
  query: queryValidator,
})

export const bySlugValidator = z.object({
  slug: z.string(),
})

export const byIdValidator = z.object({
  id: z.string(),
})
