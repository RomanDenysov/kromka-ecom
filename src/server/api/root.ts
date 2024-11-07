import {
  categoriesRouter,
  checkoutRouter,
  productsRouter,
  storesRouter,
  usersRouter,
} from './routes'
import { createCallerFactory, createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  products: productsRouter,
  users: usersRouter,
  categories: categoriesRouter,
  checkout: checkoutRouter,
  stores: storesRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
