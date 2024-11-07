'use client'

import { memo } from 'react'
import { useCart } from '~/store/cart/use-cart'
import { CartItem } from '~/features/checkout/ui'

const CartList = memo(() => {
  const items = useCart((state) => state.items)

  return (
    <>
      <span className="sr-only">Položky vo vašom nákupnom košíku</span>
      {items.length === 0 ? (
        <div className="max-size-full grid size-full place-content-center rounded-lg border border-border border-dashed py-20">
          <h1 className="flex items-center text-center font-black text-3xl text-muted-foreground tracking-tight md:text-4xl">
            Váš košík je prázdny
          </h1>
        </div>
      ) : (
        <ul>
          {items.map(({ product, quantity }) => (
            <CartItem key={`product-${product.id}`} product={product} quantity={quantity} />
          ))}
        </ul>
      )}
    </>
  )
})

export default CartList
