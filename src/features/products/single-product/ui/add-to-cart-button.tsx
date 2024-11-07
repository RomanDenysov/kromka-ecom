'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useMountedState, useToggle, useVibrate } from 'react-use'
import { useCart } from '~/store/cart/use-cart'
import type { Product } from '~/server/payload/payload-types'
import { cn } from '~/lib/utils'
import { Button } from '~/lib/ui/components/button'

type Props = {
  product: Product
  disabled?: boolean
}

const AddToCartButton = ({ product, disabled = false }: Props) => {
  const isMounted = useMountedState()
  const items = useCart((state) => state.items)
  const addItem = useCart((state) => state.addItem)
  const removeItem = useCart((state) => state.removeItem)
  const [vibrating, toggleVibrating] = useToggle(false)

  useVibrate(vibrating, [300, 100, 200, 100, 1000, 300], false)
  if (!isMounted) return null

  const currentQuantity = items.find((item) => item.product.id === product.id)?.quantity || 0

  const handleAddToCart = () => {
    toggleVibrating()
    if (currentQuantity >= 0) {
      addItem({ product, quantity: +1 })
    }
  }
  const handleRemoveFromCart = () => {
    if (currentQuantity > 1) {
      addItem({ product, quantity: -1 })
    } else {
      removeItem(product.id)
    }
  }

  if (currentQuantity > 0) {
    return (
      <div className="flex flex-row items-center justify-between">
        <Button
          onClick={handleRemoveFromCart}
          disabled={currentQuantity === 0}
          className="w-fit px-6 md:px-8 xl:px-10"
          size={'lg'}
          aria-label="decrease button"
        >
          <MinusIcon className="size-6" />
        </Button>

        <Button
          variant={'outline'}
          className="max-w-8 px-6"
          size={'lg'}
          aria-label="current quantity count"
        >
          <span
            className={cn(
              ' font-medium text-muted-foreground',
              currentQuantity > 99 ? 'text-base' : 'text-lg',
            )}
          >
            {currentQuantity}
          </span>
        </Button>

        <Button
          onClick={handleAddToCart}
          disabled={currentQuantity === 0}
          className="w-fit px-6 md:px-8 xl:px-10"
          size={'lg'}
          aria-label="increase button"
        >
          <PlusIcon className="size-6" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      disabled={disabled}
      className="w-full"
      size={'lg'}
      aria-label="add to cart button"
      onClick={handleAddToCart}
    >
      Pridať do košíka
    </Button>
  )
}

export default AddToCartButton
