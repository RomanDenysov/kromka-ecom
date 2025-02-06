'use client'

import type { Media, Product } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { memo, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FastAddButton } from '~/features/products-reel/ui'
import { Skeleton } from '~/lib/ui/components/skeleton'
import { cn, formatPrice } from '~/lib/utils'
import { api } from '~/trpc/react'

export function ProductsList() {
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')

  const selectedCategoriesSlug = categorySlug
    ? categorySlug
      .split(',')
      .filter((cat): cat is string => typeof cat === 'string' && cat.length > 0)
    : []

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    api.products.infiniteProducts.useInfiniteQuery(
      {
        query: {
          limit: 12,
          sort: ['-order'],
          category: selectedCategoriesSlug
        },
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: true,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
      },
    )

  const { ref, inView } = useInView()

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.products)
  }, [data])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 pb-20">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 pb-20">
      {products?.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
      {isFetchingNextPage &&
        Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)}
      <div ref={ref} className="h-8" />
      {!hasNextPage && (
        <p className="col-span-full text-center text-muted-foreground pt-8">
          {'Už žiadne produkty'}
        </p>
      )}
    </div>
  )
}

const ProductCard = memo((props: { product: Product; index: number }) => {
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

function ProductCardSkeleton() {
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
