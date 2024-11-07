'use client'

import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '~/lib/ui/components/button'
import { formatPrice } from '~/lib/utils'
import type { Product } from '~/server/payload/payload-types'
import { useCart } from '~/store/cart/use-cart'
import { ItemQuantityButton } from './item-quantity-button'

type Props = {
  product: Product
  quantity: number
}

export const CartSheetItem = ({ product, quantity = 0 }: Props) => {
  const removeItem = useCart((state) => state.removeItem)

  const handleRemoveItem = () => {
    removeItem(product.id)
  }

  const { image } = product.images[0] ?? { image: null }

  const renderImage = () => {
    if (image && typeof image !== 'string' && image?.url) {
      return (
        <Image
          src={image.url}
          alt={product.title}
          fill
          className="absolute object-cover object-center shadow-md"
        />
      )
    }
    return (
      <div className="flex h-full items-center justify-center bg-secondary">
        <ImageIcon size={36} aria-hidden="true" className="text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-3 border-gray-200 border-t py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-full items-center space-x-4">
          <div className="relative aspect-square size-24 min-w-fit overflow-hidden rounded shadow-md">
            {renderImage()}
          </div>

          <div className="mb-auto">
            <span className="line-clamp-1 font-medium text-sm tracking-tight">{product.title}</span>
            <span className="mr-auto line-clamp-1 font-semibold text-sm tracking-tight">
              {formatPrice(product.price)}
            </span>

            <div className="mt-6 self-end">
              <ItemQuantityButton product={product} quantity={quantity} />
            </div>
          </div>
        </div>

        <div className="flex h-full max-h-full flex-col items-center space-y-14">
          <Button
            onClick={handleRemoveItem}
            size={'icon'}
            variant={'ghost'}
            className="ml-auto h-full w-full self-start"
          >
            <X size={20} className="text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}
