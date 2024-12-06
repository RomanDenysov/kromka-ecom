import { z } from 'zod'

const statusValidator = z.enum(['published', 'draft', 'archived', 'sold']).optional()

export const queryValidator = z.object({
  category: z.union([z.string(), z.array(z.string())]).optional(),
  categorySlug: z.union([z.string(), z.array(z.string())]).optional(),
  search: z.string().max(100).optional(),
  sort: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).default(12),
  status: statusValidator,
  isFeatured: z.boolean().optional(),

  excludeId: z.string().optional(),
})

export const infiniteQueryValidator = z.object({
  // limit: z.number().min(1).max(100).optional(),
  cursor: z
    .object({
      createdAt: z.string().optional(),
      id: z.string().optional(),
    })
    .optional(),
  query: queryValidator,
})

export const bySlugValidator = z.object({
  slug: z.string(),
})

export const byIdValidator = z.object({
  id: z.string(),
})
