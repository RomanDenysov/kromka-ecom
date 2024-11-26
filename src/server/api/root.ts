import {
  categoriesRouter,
  checkoutRouter,
  productsRouter,
  storesRouter,
  usersRouter,
  profilesRouter,
  postsRouter,
} from './routes'
import { createCallerFactory, createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  products: productsRouter,
  users: usersRouter,
  categories: categoriesRouter,
  checkout: checkoutRouter,
  stores: storesRouter,
  profiles: profilesRouter,
  posts: postsRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
