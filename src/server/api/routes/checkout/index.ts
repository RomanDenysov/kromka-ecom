import { createTRPCRouter, publicProcedure } from '../../trpc'
import { CheckoutService } from './service'
import { checkoutValidator, orderIdValidator } from './validator'

export const checkoutRouter = createTRPCRouter({
  checkout: publicProcedure.input(checkoutValidator).mutation(async ({ input, ctx }) => {
    const { products, options } = input

    const user = ctx?.session?.user
      ? {
          id: ctx?.session?.user.id,
          email: ctx?.session?.user.email,
          name: ctx?.session?.user.name,
        }
      : undefined

    return CheckoutService.processCheckout(products, options, user)
  }),

  checkStatus: publicProcedure.input(orderIdValidator).query(async ({ input }) => {
    return CheckoutService.checkOrderStatus(input.orderId)
  }),
})
