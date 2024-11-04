import {createCallerFactory, createTRPCRouter} from './trpc'

export const appRouter = createTRPCRouter({
  products:
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
