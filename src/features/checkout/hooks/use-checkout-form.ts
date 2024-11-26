import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Profile, User } from '@payload-types'
import { useEffect, useMemo } from 'react'

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
  user?: Partial<User> | null
  profile?: Profile
  options?: any
}

export default function useCheckoutForm({ user, profile }: CheckoutFormProps) {
  const defaultStore = useMemo(
    () =>
      typeof profile?.customerOptions?.store !== 'string'
        ? profile?.customerOptions?.store?.id
        : profile?.customerOptions?.store,
    [profile?.customerOptions?.store],
  )

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      store: '',
      terms: false,
      date: new Date(),
      method: 'store' as const,
    },
  })

  useEffect(() => {
    if (user || profile) {
      form.reset({
        email: user?.email ?? profile?.contacts?.email ?? '',
        name: user?.name || profile?.contacts?.name || '',
        phone: profile?.contacts?.phone || '',
        store: defaultStore || '',
        terms: profile?.options.terms || false,
        date: new Date(),
        method: 'store' as const,
      })
    }
  }, [user, profile, defaultStore, form.reset])

  return form
}
