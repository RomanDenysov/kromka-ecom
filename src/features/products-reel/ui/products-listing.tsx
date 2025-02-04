'use client'

import Link from 'next/link'
import React, { memo, useEffect, useState } from 'react'
import { FastAddButton } from '~/features/products-reel/ui'
import { Skeleton } from '~/lib/ui/components/skeleton'
import { ImageSlider } from '~/lib/ui/image-slider'
import { cn, formatPrice } from '~/lib/utils'
import type { Product } from '~/server/payload/payload-types'

type Props = {
  product: Product | null
  index: number
}

const ProductsListing = memo(({ product, index }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)
    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  console.log(product.price)

  const validUrls = product.images
    .map(({ image }) => typeof image !== 'string' && image.url)
    .filter(Boolean) as string[]

  if (isVisible || product) {
    return (
      <article
        className={cn('group/main invisible h-full w-full cursor-pointer', {
          'fade-in-5 visible animate-in': isVisible,
        })}
      >
        <div className="flex w-full flex-col">
          <Link
            href={{
              pathname: `/products/${product.slug}`,
            }}
          >
            <ImageSlider urls={validUrls} />
          </Link>

          <span className="mt-2 mb-0.5 overflow-hidden text-ellipsis text-nowrap text-primary/90 text-sm font-semibold hover:overflow-visible hover:text-clip">
            {product.title}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-muted-foreground">
              {formatPrice(product.price)}
            </span>
            <FastAddButton product={product} />
          </div>
        </div>
      </article>
    )
  }
})

const ProductPlaceholder = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
        <Skeleton className="size-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-2/3 rounded-lg" />
      <div className="flex items-center justify-between">
        <Skeleton className="mt-2 h-4 w-16 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-12 rounded-lg" />
      </div>
    </div>
  )
}

ProductsListing.displayName = 'ProductsListing'

export default ProductsListing
