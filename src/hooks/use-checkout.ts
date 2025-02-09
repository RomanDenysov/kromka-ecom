import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCart } from '~/store/cart/use-cart'
import { checkoutStore } from '~/store/chechkout'
import { useCurrentStore } from '~/store/store/use-current-store'
import { api } from '~/trpc/react'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

const checkoutSchema = z.object({
  email: z.string().email({ message: 'Zadajte platnú emailovu adresu' }),
  name: z.string().min(1, { message: 'Meno musí mať aspoň 1 znak' }),
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
  date: z.date({
    required_error: 'Prosím, zvoľte dátum',
    invalid_type_error: 'Toto nie je dátum!',
  }),
  // .min(new Date()),
  // method: z.enum(['store', 'card']).default('store'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

export function useCheckout() {
  const router = useRouter()
  const currentStore = useCurrentStore((state) => state.store)
  const itemsInCart = useCart((state) => state.items)
  const clearCart = useCart((state) => state.clearCart)

  const isSubmitting = checkoutStore((state) => state.isSubmitting)
  const setIsSubmitting = checkoutStore((state) => state.setIsSubmitting)
  const error = checkoutStore((state) => state.error)
  const setError = checkoutStore((state) => state.setError)

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      store: currentStore?.id || '',
      terms: false,
      date: undefined,
    },
  })

  useEffect(() => {
    if (currentStore?.id) {
      form.setValue('store', currentStore.id, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }, [currentStore, form])

  // Mutations
  const checkoutMutation = api.checkout.checkout.useMutation({
    onSuccess: ({ url }) => {
      setIsSubmitting(false)
      clearCart()
      router.push(url)
      form.reset()
      router.refresh()
    },
    onError: (error) => {
      setError(error.message)
      setIsSubmitting(false)
      router.refresh()
    },
  })

  const handleSubmit = useCallback(
    async (data: CheckoutFormData) => {
      if (itemsInCart.length === 0) {
        setError('Your cart is empty')
        return
      }

      setIsSubmitting(true)
      setError(null)

      await checkoutMutation.mutateAsync({
        products: itemsInCart.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
        options: {
          email: data.email,
          name: data.name,
          phone: data.phone,
          store: data.store,
          terms: data.terms,
          date: data.date,
        },
      })
    },
    [itemsInCart, checkoutMutation, setError, setIsSubmitting],
  )

  return {
    // State
    error,
    isSubmitting,
    // Form
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
