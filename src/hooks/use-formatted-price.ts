import { cache, useMemo } from 'react'
import { formatPrice } from '~/lib/utils'

export const useFormattedPrice = cache((price: number) => {
  return useMemo(() => formatPrice(price), [price])
})
