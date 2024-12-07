import { z } from 'zod'

export const userSchemaValidator = z.object({
  name: z.string().min(2, {
    message: 'Meno musí mať aspoň 2 znaky.',
  }),
  phone: z
    .string()
    .min(10, {
      message: 'Telefónne číslo musí mať aspoň 10 číslic.',
    })
    .max(15, {
      message: 'Telefónne číslo nesmie byť dlhšie ako 15 číslic.',
    }),
})
