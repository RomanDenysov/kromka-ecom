'use client'

import type { Media, Product } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import { FastAddButton } from '~/features/products-reel/ui'
import { Skeleton } from '~/lib/ui/components/skeleton'
import { cn, formatPrice } from '~/lib/utils'

export const ProductCard = memo((props: { product: Product; index: number }) => {
    const { product, index } = props
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75)
        return () => clearTimeout(timer)
    }, [index])

    if (!isVisible) {
        return <ProductCardSkeleton />
    }

    const productImageUrl = (product.images[0].image as Media).url

    return (
        <Link
            prefetch={true}
            href={`/products/${product.slug}`}
            className={cn(
                'block group opacity-0 transition-opacity duration-300',
                isVisible && 'opacity-100',
            )}
            aria-label={`View ${product.title}`}
        >
            <div className="aspect-square bg-muted rounded-md p-3 shadow-md border size-full relative overflow-hidden">
                <Image
                    src={productImageUrl ?? '/placeholder.png'}
                    alt={`${product.title} - Product Image`}
                    fill
                    className="object-cover object-center absolute inset-0 rounded-md z-0 transition-transform duration-300 md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-[1]" />
                <div className="flex flex-col justify-between size-full gap-2 ">
                    <h4 className="text-sm md:text-base font-semibold z-20 text-secondary line-clamp-2">
                        {product.title}
                    </h4>
                    <div className="flex items-center justify-between">
                        <div className="h-[28px] flex items-center justify-center">
                            <span className="text-base  font-bold z-20 text-white">
                                {formatPrice(product.price)}
                            </span>
                        </div>
                        <FastAddButton product={product} />
                    </div>
                </div>
            </div>
        </Link>
    )
})

ProductCard.displayName = 'ProductCard'

export function ProductCardSkeleton() {
    return (
        <div
            className="aspect-square bg-muted rounded-md shadow-md border overflow-hidden"
            role="status"
            aria-label="Loading product"
        >
            <Skeleton className="w-full h-full" />
        </div>
    )
}
