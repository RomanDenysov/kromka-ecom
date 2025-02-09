import { createTRPCRouter, publicProcedure } from '../../trpc'
import { checkOrderStatus, processCheckout } from './service'
import { checkoutValidator, orderIdValidator } from './validator'

export const checkoutRouter = createTRPCRouter({
  checkout: publicProcedure.input(checkoutValidator).mutation(async ({ input }) => {
    const { products, options } = input
    return processCheckout(products, options)
  }),

  checkStatus: publicProcedure.input(orderIdValidator).query(async ({ input }) => {
    return checkOrderStatus(input.orderId)
  }),
})
