import { z } from 'zod'

export const bySlugValidator = z.object({
  slug: z.string(),
})
