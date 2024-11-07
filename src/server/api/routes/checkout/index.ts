import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from '../../trpc'
import { checkoutValidator } from './validator'
import Stripe from 'stripe'
import { env } from '~/env'
import { stripe } from '~/lib/stripe'

export const checkoutRouter = createTRPCRouter({
  checkout: publicProcedure.input(checkoutValidator).mutation(async ({ input, ctx }) => {
    const { products, options } = input

    const productsIds = products.map(({ product }) => product)

    const { docs: items } = await ctx.payload.find({
      collection: 'products',
      where: { id: { in: productsIds } },
      depth: 2,
    })

    if (!items.length) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid products',
      })
    }

    let totalPrice = 0
    const orderProducts: {
      productId: string
      quantity: number
      priceId?: string
    }[] = []

    for (const item of items) {
      const productData = products.find(({ product }) => product === item.id)
      const quantity = productData?.quantity ?? 1
      if (typeof item.price !== 'number') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid product price',
        })
      }
      totalPrice += item.price * quantity
      orderProducts.push({
        productId: item.id,
        quantity,
        priceId: item?.priceId || '',
      })
    }

    let profile = null
    if (ctx?.session?.user) {
      const { docs: profiles } = await ctx.payload.find({
        collection: 'profiles',
        where: {
          user: { equals: ctx?.session?.user.id },
        },
      })
      profile = profiles.length > 0 ? profiles[0] : null
    }

    const order = await ctx.payload.create({
      collection: 'orders',
      data: {
        user: ctx?.session?.user?.id || null,
        profile: profile?.id || null,
        pickupStore: profile?.customerOptions?.store || options.store,
        productItems: products,
        pickupDate: options.date.toISOString(),
        method: options.method || profile?.customerOptions?.method,
        paymentStatus: 'pending',
        status: 'new',
        optionalPrice: null,
        total: totalPrice,
        _isPaid: false,
      },
    })

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = orderProducts.map(
      (product) => ({
        price: product.priceId,
        quantity: product.quantity,
        adjustable_quantity: { enabled: false },
      }),
    )

    let url = `${env.NEXT_PUBLIC_SERVER_URL}/shop/checkout`

    const paymentSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'mobilepay'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${url}/confirm?order=${order.id}`,
      cancel_url: url,
      metadata: {
        userInfo: options.email ?? ctx?.session?.user.email ?? profile?.contacts?.email,
        orderId: order.id,
      },
    })

    return {
      url: paymentSession.url,
    }
  }),
})
