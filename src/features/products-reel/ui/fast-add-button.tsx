'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import type React from 'react'
import { Button } from '~/lib/ui/components/button'
import type { Product } from '@payload-types'
import { useCart } from '~/store/cart/use-cart'

type Props = {
  product: Product
}

const FastAddButton = ({ product }: Props) => {
  const items = useCart((state) => state.items)
  const addItem = useCart((state) => state.addItem)
  const removeItem = useCart((state) => state.removeItem)

  const currentQuantity = items.find((item) => item.product.id === product.id)?.quantity || 0

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentQuantity >= 0) {
      addItem({ product, quantity: +1 })
    }
  }

  const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentQuantity > 1) {
      addItem({ product, quantity: -1 })
    } else {
      removeItem(product.id)
    }
  }

  if (currentQuantity > 0) {
    return (
      <div className="z-30 flex h-[28px] w-[76px] items-center justify-between rounded-md border border-border bg-background shadow-sm ">
        <button
          type="button"
          onClick={(e) => handleRemoveItem(e)}
          disabled={currentQuantity === 0}
          className="grid size-full flex-1 place-content-center rounded-l-md hover:bg-secondary"
          aria-label="decrease button"
        >
          <MinusIcon size={16} className="text-muted-foreground" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className="pointer-events-none grid flex-1 select-none place-content-center"
        >
          <span className="text-muted-foreground text-sm">{currentQuantity}</span>
        </button>
        <button
          type="button"
          onClick={(e) => handleAddItem(e)}
          disabled={currentQuantity === 0}
          className="grid size-full flex-1 place-content-center rounded-r-md hover:bg-secondary"
          aria-label="decrease button"
        >
          <PlusIcon size={16} className="text-muted-foreground" />
        </button>
      </div>
    )
  }

  return (
    <div className="z-30">
      <Button
        variant={'outline'}
        onClick={(e) => handleAddItem(e)}
        className="h-[28px] w-[76px] px-2.5 py-0 text-xs"
      >
        Pridať
        <PlusIcon size={16} className="ml-1" />
      </Button>
    </div>
  )
}
export default FastAddButton
