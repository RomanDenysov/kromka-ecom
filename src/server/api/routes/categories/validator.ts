import { z } from 'zod'

export const byIdValidator = z.object({
  id: z.string(),
})

export const bySlugValidator = z.object({
  slug: z.string(),
})
