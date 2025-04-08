'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

import { api } from '~/trpc/react'
import { ProductCard, ProductCardSkeleton } from './product-card'

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
          category: selectedCategoriesSlug,
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
    return <ProductsListLoader />
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

export const ProductsListLoader = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 pb-20">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
