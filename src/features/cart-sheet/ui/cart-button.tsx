'use client'

import { ShoppingCartIcon } from 'lucide-react'
import { Badge } from '~/lib/ui/components/badge'
import { Button } from '~/lib/ui/components/button'
import { useCart } from '~/store/cart/use-cart'
import { useCartSheet } from '../hooks/use-cart-sheet'

const CartButton = () => {
  const onOpen = useCartSheet((state) => state.onOpen)
  const items = useCart((state) => state.items)
  const totalQuantity: number = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <Button
      onClick={onOpen}
      variant={'ghost'}
      size={'icon'}
      className="relative grid [&_svg]:size-6  size-10 place-items-center rounded-full"
    >
      <ShoppingCartIcon size={24} />
      {totalQuantity >= 1 && (
        <Badge className="absolute top-0 right-0 px-0.5 py-0">{totalQuantity}</Badge>
      )}
    </Button>
  )
}

export default CartButton
