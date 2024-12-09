import { zodResolver } from '@hookform/resolvers/zod'
import type { Profile, User } from '@payload-types'
import { isBefore, parse, startOfDay } from 'date-fns'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCurrentStore } from '~/store/store/use-current-store'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

const checkoutSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z
    .string()
    .min(10, {
      message: 'Vaše telefónne číslo musí obsahovať aspoň 10 znakov.',
    })
    .regex(phoneRegex, 'Zadajte svoje telefónne číslo vo formáte +421912345678 alebo 0912345678'),
  terms: z
    .boolean()
    .refine(
      (v) => v === true,
      'Aby ste mohli pokračovať, musíte súhlasiť s obchodnými podmienkami.',
    ),
  store: z.string().min(1, { message: 'Vyberte si predajňu pre vyzdvihnutie objednávky' }),
  date: z
    .date({
      required_error: 'Prosím, zvoľte dátum',
      invalid_type_error: 'Toto nie je dátum!',
    })
    .min(new Date()),
  method: z.enum(['store', 'card']).default('store'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

type CheckoutFormProps = {
  user?: Partial<User> | null
  profile?: Profile | null
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  options?: any
}

export const availableDates = ['2024-12-13', '2024-12-14', '2024-12-22', '2024-12-23']

export default function useCheckoutForm({ user, profile }: CheckoutFormProps) {
  const currentStore = useCurrentStore((state) => state.store)

  const validDates = useMemo(() => {
    const today = startOfDay(new Date())
    return availableDates.filter((dateString) => {
      const date = parse(dateString, 'yyyy-MM-dd', new Date())
      return !isBefore(date, today)
    })
  }, [])

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      store: currentStore?.id || '',
      terms: false,
      date: parse(validDates[0], 'yyyy-MM-dd', new Date()),
      method: 'store' as const,
    },
  })

  useEffect(() => {
    if (user || profile) {
      form.reset({
        email: user?.email ?? profile?.contacts?.email ?? '',
        name: user?.name || profile?.contacts?.name || '',
        phone: profile?.contacts?.phone || '',
        store: currentStore?.id || '',
        terms: profile?.options?.terms || false,
        method: 'store' as const,
      })
    }
  }, [user, profile, currentStore?.id, form.reset])

  useEffect(() => {
    if (currentStore?.id) {
      form.setValue('store', currentStore.id, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }, [currentStore, form.setValue])

  return form
}
