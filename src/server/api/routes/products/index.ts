import { createTRPCRouter, publicProcedure } from "../../trpc";
import { infiniteQueryValidator } from "./validator";

export const productsRouter = createTRPCRouter({
  infiniteProducts: publicProcedure.input(infiniteQueryValidator).query(async({ input, ctx }) => {
    return ctx.payload.find({
      collection: "products",
      limit: input.limit,
    });
  }),
})
