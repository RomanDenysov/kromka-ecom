import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { ItemQuantityButton } from '~/features/checkout/ui'
import { useConfirm } from '~/hooks/use-confirm'
import { formatPrice } from '~/lib/utils'
import type { Product } from '~/server/payload/payload-types'
import { useCart } from '~/store/cart/use-cart'

type Props = {
  product: Product
  quantity: number
}

const CartItemImage = memo(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ({ image, title, slug }: { image: any; title: string; slug: string }) => {
    if (image && typeof image !== 'string' && image?.url) {
      return (
        <Link href={`/shop/${slug}`}>
          <Image
            loading="eager"
            decoding="sync"
            quality={65}
            src={image.url ?? '/placeholder.png'}
            alt={title}
            fill
            className="size-full rounded-md object-cover object-center shadow-md"
          />
        </Link>
      )
    }

    return (
      <div className="flex h-full items-center justify-center bg-secondary">
        <ImageIcon size={40} aria-hidden="true" className="text-muted-foreground" />
      </div>
    )
  },
)

CartItemImage.displayName = 'CartItemImage'

const CartItem = ({ product, quantity }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Odstrániť produkt',
    `Chcete odstrániť ${product?.title} z košíka?`,
  )
  const removeItem = useCart((state) => state.removeItem)

  const handleRemoveItem = async () => {
    const confirmed = await confirm()
    if (confirmed) {
      removeItem(product.id)
    }
  }

  if (!product) return null

  const { image } = product.images[0] ?? { image: null }

  return (
    <>
      <ConfirmDialog />
      <div className="flex border-t py-2 sm:py-4">
        <div className="flex-shrink-0">
          <div className="relative size-36 shadow-md sm:size-48">
            <CartItemImage image={image} title={product.title} slug={product.slug ?? ''} />
          </div>
        </div>

        <div className="ml-4 flex h-36 w-full flex-col justify-between sm:ml-6 sm:h-48">
          <div className="relative grid size-full content-between pr-0.5 sm:grid-cols-2 sm:gap-x-6">
            <div className="">
              <h5 className="mb-1 line-clamp-2 sm:mb-2">{product.title}</h5>

              <h4 className="mb-1 text-muted-foreground sm:mb-2">{formatPrice(product.price)}</h4>

              {/* TODO: Add current inventory status */}
            </div>

            <div className="absolute top-0 right-0.5 flex">
              <button
                type="button"
                // TODO: Add remove from cart confirmation later by useConfirm hook
                onClick={handleRemoveItem}
                className="rounded-md hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:ring-offset-white"
              >
                <X className="size-6 flex-shrink-0" />
              </button>
            </div>

            <div className="col-span-2 mb-0,5">
              <ItemQuantityButton product={product} quantity={quantity} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(CartItem)
