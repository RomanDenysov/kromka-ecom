'use client'

import { Heading } from '~/lib/ui/heading'
import { useCart } from '~/store/cart/use-cart'

export const CartTitleCounter = () => {
  const items = useCart((state) => state.items)

  let infoLabel: string

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

  switch (true) {
    case items.length === 0:
      infoLabel = 'Váš košík je prázdny'
      break
    case items.length === 1:
      infoLabel = `Jeden  produkt  v košíku (${totalQuantity} ks)`
      break
    case items.length >= 2 && items.length <= 4:
      infoLabel = `${items.length} produkty v košíku (${totalQuantity} ks)`
      break
    default:
      infoLabel = `${items.length} produktov v košíku (${totalQuantity} ks)`
  }

  return <Heading title="Vaš košík" subtitle={infoLabel} />
}
