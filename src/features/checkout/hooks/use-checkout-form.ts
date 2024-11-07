import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'payload'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Profile } from '@payload-types'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

const checkoutSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z
    .string()
    .min(10, {
      message: 'Vaše telefónne číslo musí obsahovať aspoň 10 znakov.',
    })
    .regex(phoneRegex, 'Zadajte svoje telefónne číslo vo formáte +421912345678 alebo 0912345678')
    .optional(),
  terms: z
    .boolean()
    .refine(
      (v) => v === true,
      'Aby ste mohli pokračovať, musíte súhlasiť s obchodnými podmienkami.',
    ),
  store: z.string().min(1),
  date: z.date().default(new Date()),
  method: z.enum(['store', 'card']).default('store'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

type CheckoutFormProps = {
  user?: Partial<User>
  profile?: Profile
  options?: any
}

export default function useCheckoutForm({ user, profile }: CheckoutFormProps) {
  const defaultStore =
    typeof profile?.customerOptions?.store !== 'string'
      ? profile?.customerOptions?.store?.id
      : profile?.customerOptions?.store

  const defaultValues = {
    email: user?.email || profile?.contacts?.email || '',
    name: user?.name || profile?.contacts?.name || '',
    phone: (user?.phone as string) || profile?.contacts?.phone || '',
    store: defaultStore || '',
    terms: profile?.options.terms,
    date: new Date() || '',
    method: 'store' as const,
  }

  return useForm<CheckoutFormData>({
    defaultValues,
    resolver: zodResolver(checkoutSchema),
  })
}
