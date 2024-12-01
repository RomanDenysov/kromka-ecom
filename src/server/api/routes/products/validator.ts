import { z } from 'zod'

const sortField = z.enum(['price', 'createdAt', 'title', 'order'])
const sortDirection = z.enum(['asc', 'desc']).default('desc')

const sortConfig = z.object({
  field: sortField,
  direction: sortDirection,
})

const statusValidator = z.enum(['published', 'draft', 'archived', 'sold']).optional()

export const queryValidator = z.object({
  category: z.union([z.string(), z.array(z.string())]).optional(),
  categorySlug: z.union([z.string(), z.array(z.string())]).optional(),
  search: z.string().max(100).optional(),
  sort: z.array(sortConfig).optional(),
  limit: z.number().default(10).optional(),

  status: statusValidator,
  isFeatured: z.boolean().optional(),

  excludeId: z.string().optional(),
})

export const infiniteQueryValidator = z.object({
  limit: z.number().min(1).max(100).optional(),
  cursor: z.number().optional(),
  query: queryValidator,
})

export const bySlugValidator = z.object({
  slug: z.string(),
})

export const byIdValidator = z.object({
  id: z.string(),
})
