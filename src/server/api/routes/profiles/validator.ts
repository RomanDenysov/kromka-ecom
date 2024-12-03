import { z } from 'zod'

export const updateProfileSchema = z.object({
  contacts: z
    .object({
      name: z.string().min(1),
      phone: z.string().min(10),
      email: z.string().email(),
    })
    .optional(),
  customerOptions: z
    .object({
      store: z.string().min(1),
      method: z.enum(['store', 'card']),
    })
    .optional(),
  options: z
    .object({
      terms: z.boolean(),
      privacy: z.boolean().optional(),
      cookie: z.boolean().optional(),
    })
    .optional(),
  isRegistered: z.boolean().optional(),
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
