'use client'

import useCheckoutForm from '~/features/checkout/hooks/use-checkout-form'
import { api } from '~/trpc/react'
import { Form } from '~/lib/ui/components/form'
import { cn } from '~/lib/utils'
import { useCart, CartItem } from '~/store/cart/use-cart'
import { CheckoutOptions } from '~/server/api/routes/checkout/validator'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useCheckoutComplete, useCheckoutStore } from '~/store/checkout/use-checkout-store'
import { useUser } from '~/store/user/use-user'
import { useCookieConsentStore } from '~/store/cookie/use-cookie-store'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function CheckoutForm({ children, className }: Props) {
  const user = useUser((state) => state.user)
  const profile = useCookieConsentStore((state) => state.profile)
  const router = useRouter()
  const items = useCart((state) => state.items)
  const { setLoading, setError } = useCheckoutStore()
  const completeCheckout = useCheckoutComplete()

  const products = useMemo(
    () =>
      items.map((item: CartItem) => ({
        product: item.product.id,
        quantity: item.quantity,
      })),
    [items],
  )

  const form = useCheckoutForm({ user, profile })

  const checkoutMutation = api.checkout.checkout.useMutation({
    onMutate: () => {
      setLoading(true), setError(null)
    },
    onSuccess: ({ url }) => {
      form.reset()
      completeCheckout()
      if (url) {
        router.push(url)
      } else {
        router.refresh()
      }
    },
    onError: (error) => {
      setError(error.message)
      setLoading(false)
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  const onSubmit = useCallback(
    (data: CheckoutOptions) => {
      setLoading(true)
      checkoutMutation.mutate({ products, options: data })
    },
    [products, checkoutMutation],
  )

  return (
    <Form {...form}>
      <form
        id="checkout-form"
        className={cn('space-y-5', className)}
        onSubmit={form.handleSubmit((data) => onSubmit({ ...data, profileId: profile?.id || '' }))}
      >
        {children}
      </form>
    </Form>
  )
}
