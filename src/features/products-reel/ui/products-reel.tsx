'use client'

import { ChevronRightIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { ProductsListing } from '~/features/products-reel/ui'
import { Heading } from '~/lib/ui/heading'
import { LoaderButton } from '~/lib/ui/loader-button'
import { cn, generateProductQuantityStr } from '~/lib/utils'
import { api } from '~/trpc/react'
import type { ProductsQueryType } from '../types'

type Props = {
  className?: string
  href?: string
  title?: string
  subtitle?: string
  total?: boolean
  query: ProductsQueryType
  showLoadMore?: boolean
}

const ProductsReel = ({
  className,
  href,
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
      <div className="size-full grid place-content-center py-40">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground/70" />
      </div>
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
            href={href}
            className="hidden items-center justify-end gap-x-1 font-medium text-red-600 text-sm hover:text-red-500 hover:underline md:inline-flex"
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
              <ProductsListing
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
}

export default ProductsReel
