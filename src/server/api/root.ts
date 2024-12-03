import {
  categoriesRouter,
  checkoutRouter,
  productsRouter,
  storesRouter,
  usersRouter,
  profilesRouter,
  postsRouter,
  ordersRouter,
} from './routes'
import { createCallerFactory, createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  products: productsRouter,
  users: usersRouter,
  categories: categoriesRouter,
  checkout: checkoutRouter,
  stores: storesRouter,
  profiles: profilesRouter,
  orders: ordersRouter,
  posts: postsRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
