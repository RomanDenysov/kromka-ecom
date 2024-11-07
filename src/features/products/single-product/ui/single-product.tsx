'use client'

import { StoreIcon } from 'lucide-react'
import React from 'react'
import { useMedia, useMountedState } from 'react-use'
import type { Product } from '~/server/payload/payload-types'
import { formatPrice } from '~/lib/utils'
import { Badge } from '~/lib/ui/components/badge'
import { ImageSlider } from '~/lib/ui/image-slider'
import AddToCartButton from './add-to-cart-button'
import SingleProductPlaceholder from './single-product-placeholder'

type Props = {
  product: Product
}

const SingleProduct = ({ product }: Props) => {
  const isMobile = useMedia('(max-width: 768px)', false)
  const isMounted = useMountedState()
  const validUrls = React.useMemo(() => {
    return product.images
      .map(({ image }) => image && typeof image !== 'string' && image.url)
      .filter(Boolean) as string[]
  }, [product])

  console.log('product', validUrls)

  if (!product || !isMounted) return <SingleProductPlaceholder />

  const price = formatPrice(product.price)

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
      <div className="space-y-4 lg:self-start">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          {product.title}
        </h2>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{price}</h3>
        <p className="text-base lg:text-lg font-medium tracking-tight">{product.descr}</p>
        {product.opts && (
          <p className="text-base lg:text-lg font-medium tracking-tight text-muted-foreground">
            {product.opts}
          </p>
        )}
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <Badge className="flex items-center py-1 md:py-2">
            <StoreIcon size={16} className="mr-1" />
            Kromka Prešov: (8)
          </Badge>
          <Badge className="flex items-center py-1 md:py-2" variant={'destructive'}>
            <StoreIcon size={16} className="mr-1" />
            Kromka Košice: (0)
          </Badge>
        </div>
      </div>

      <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div className="aspect-square rounded-lg">
          <ImageSlider urls={validUrls} brightness={false} />
        </div>
      </div>

      <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-end">
        {isMobile ? (
          <div className="fixed inset-x-0 bottom-0 z-50 h-[68px] w-full space-y-2.5 border-gray-100 border-t bg-white px-4 py-1 sm:relative sm:bottom-auto">
            <div className="mx-auto h-1.5 w-1/5 rounded-lg bg-gray-200" />
            <AddToCartButton product={product} />
          </div>
        ) : (
          <div>
            <AddToCartButton product={product} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleProduct
