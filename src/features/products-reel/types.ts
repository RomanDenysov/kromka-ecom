import { z } from 'zod'
import { queryValidator } from '~/server/api/routes/products/validator'

export type ProductsQueryType = z.infer<typeof queryValidator>
