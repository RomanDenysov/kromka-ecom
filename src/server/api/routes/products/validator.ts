import { z } from "zod";

export const queryValidator = z.object({
	category: z.number().optional(),
	search: z.string().max(100).optional(),
	sort: z.string().optional(),
	limit: z.number().default(10).optional(),
})

export const infiniteQueryValidator = z.object({
	limit: z.number().min(1).max(100).optional(),
	cursor: z.number().optional(),
	query: queryValidator,
	excludeProductId: z.number().optional(),
})
