import { z } from 'zod'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

const products = z.object({
  product: z.string().min(1),
  quantity: z.number().min(1).max(100),
})

export type CheckoutProduct = z.infer<typeof products>

const checkoutProducts = z.array(products)

export const checkoutSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z
    .string()
    .min(10, {
      message: 'Vaše telefónne číslo musí obsahovať aspoň 10 znakov.',
    })
    .regex(phoneRegex, 'Zadajte svoje telefónne číslo vo formáte +421912345678 alebo 0912345678')
    .optional(),
  store: z.string().min(1),
  terms: z
    .boolean()
    .refine(
      (v) => v === true,
      'Aby ste mohli pokračovať, musíte súhlasiť s obchodnými podmienkami.',
    ),
  date: z.date().default(new Date()),
  method: z.enum(['store', 'card']).default('store'),
})

export type CheckoutOptions = z.infer<typeof checkoutSchema>

export const checkoutValidator = z.object({
  products: checkoutProducts,
  options: checkoutSchema,
})

export const orderIdValidator = z.object({ orderId: z.string() })
