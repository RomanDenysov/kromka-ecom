'use client'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import React, { memo, useMemo } from 'react'
import { ProductCard, ProductCardSkeleton } from '~/features/shop/products-list/ui/product-card'
import { Skeleton } from '~/lib/ui/components/skeleton'
import { Heading } from '~/lib/ui/heading'
import { LoaderButton } from '~/lib/ui/loader-button'
import { cn, generateProductQuantityStr } from '~/lib/utils'
import { api } from '~/trpc/react'
import type { ProductsQueryType } from '../types'

type Props = {
  className?: string
  href?: boolean
  title?: string
  subtitle?: string
  total?: boolean
  query: ProductsQueryType
  showLoadMore?: boolean
}

const ProductsReel = memo(({
  className,
  href = false,
  title,
  subtitle,
  query,
  total = false,
  showLoadMore = false,
}: Props) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    api.products.infiniteProducts.useInfiniteQuery(
      {
        query: { ...query, limit: query.limit ?? 12 },
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: true,
        refetchOnWindowFocus: false,
      },
    )

  const products = useMemo(() => {
    if (!isLoading && data?.pages) {
      const allProducts = data.pages.flatMap((page) => page.products)
      return allProducts
    }
    return []
  }, [data, isLoading])

  if (isLoading) {
    return (
      <article className={cn('py-10', className)} aria-label="Product showcase loading state">
        <div className="mb-4 md:flex md:flex-grow md:items-center md:justify-between">
          <Skeleton className="h-10 w-1/3" />
        </div>
        <div className="relative">
          <div className="mt-6 flex w-full items-center">
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {Array.from({ length: query.limit ?? 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </article>
    )
  }

  if (!products || products.length === 0) {
    return null
  }

  const totalProducts = data?.pages[0]?.total

  return (
    <article className={cn('py-10', className)} aria-label="Product showcase">
      {/* TITLE PART */}
      <div className="mb-4 md:flex md:flex-grow md:items-center md:justify-between">
        {title && (
          <Heading
            title={title}
            subtitle={total ? generateProductQuantityStr(totalProducts) : subtitle}
            className="w-full"
          />
        )}
        {href ? (
          <Link
            href={'/products'}
            className="hidden items-center justify-end gap-x-1 font-medium text-sm hover:text-muted-foreground hover:underline md:inline-flex"
            aria-label="Načítať produkty"
          >
            Nakupovat
            <span aria-hidden="true">
              <ChevronRightIcon size={16} />
            </span>
          </Link>
        ) : null}
      </div>

      {/* PRODUCT GRID */}
      <div className="relative">
        <div className="mt-6 flex w-full items-center">
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {products.map((product, index) => (
              <ProductCard
                key={`product-${product?.id || index.toFixed()}`}
                index={index}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>

      {/* LOAD MORE BUTTON */}
      {showLoadMore && hasNextPage && (
        <div className="mt-8 flex justify-center">
          <LoaderButton
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            isLoading={isFetchingNextPage}
            className="w-full sm:w-auto"
          >
            Ukázať viac
          </LoaderButton>
        </div>
      )}
    </article>
  )
})

export default ProductsReel
