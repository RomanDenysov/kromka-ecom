'use client'

import useCheckoutForm from '~/features/checkout/hooks/use-checkout-form'
import { api } from '~/trpc/react'
import { Form } from '~/lib/ui/components/form'
import { cn } from '~/lib/utils'
import { useCart, CartItem } from '~/store/cart/use-cart'
import { CheckoutOptions, CheckoutProduct } from '~/server/api/routes/checkout/validator'
import { useRouter } from 'next/navigation'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function CheckoutForm({ children, className }: Props) {
  const { data: user } = api.users.getUser.useQuery()
  const router = useRouter()
  const items = useCart((state) => state.items)

  const products = items.map((item: CartItem) => ({
    product: item.product.id,
    quantity: item.quantity,
  }))

  const form = useCheckoutForm({ user })
  const checkoutMutation = api.checkout.checkout.useMutation({
    onSuccess: ({ url }) => {
      form.reset()
      if (url) {
        router.push(url)
      } else router.refresh()
    },
  })

  const onSubmit = (data: CheckoutOptions) => {
    checkoutMutation.mutateAsync({ products, options: data })
  }

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
