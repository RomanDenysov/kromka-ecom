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

type Props = {
  children: React.ReactNode
  className?: string
}

export default function CheckoutForm({ children, className }: Props) {
  const { data: user } = api.users.getUser.useQuery()
  const router = useRouter()
  const items = useCart((state) => state.items)
  const { setLoading, setError, reset: resetCheckout } = useCheckoutStore()
  const completeCheckout = useCheckoutComplete()

  const products = useMemo(
    () =>
      items.map((item: CartItem) => ({
        product: item.product.id,
        quantity: item.quantity,
      })),
    [items],
  )

  const form = useCheckoutForm({ user })

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
      checkoutMutation.mutateAsync({ products, options: data })
    },
    [products, checkoutMutation],
  )

  return (
    <Form {...form}>
      <form
        id="checkout-form"
        className={cn('space-y-5', className)}
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
      >
        {children}
      </form>
    </Form>
  )
}
