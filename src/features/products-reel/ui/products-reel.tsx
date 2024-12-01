'use client'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import React, { memo, useEffect, useRef, useState } from 'react'
import { ProductsListing } from '~/features/products-reel/ui'
import { Heading } from '~/lib/ui/heading'
import { cn, generateProductQuantityStr } from '~/lib/utils'
import { api } from '~/trpc/react'
import { ProductsQueryType } from '../types'
import { useIntersection } from 'react-use'
import { Product } from '~/server/payload/payload-types'

type Props = {
  className?: string
  href?: string
  title?: string
  subtitle?: string
  total?: boolean
  filteredOptions?: string
  query: ProductsQueryType
  infiniteScroll?: boolean
}

const ProductsReel = ({
  className,
  href,
  title,
  subtitle,
  query,
  total = false,
  infiniteScroll = false,
}: Props) => {
  const [products, setProducts] = useState<Product[] | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    api.products.infiniteProducts.useInfiniteQuery(
      {
        query: { ...query },
        limit: infiniteScroll ? query.limit : (query.limit ?? 12),
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        // initialData: {
        //   pages: [{ data: [], nextCursor: 2 }],
        //   pageParams: [undefined],
        // },
        enabled: true,
        refetchOnWindowFocus: false,
      },
    )

  const intersection = useIntersection(loadMoreRef as React.RefObject<HTMLElement>, {
    root: null,
    rootMargin: '200px',
    threshold: 0,
  })

  useEffect(() => {
    if (infiniteScroll && intersection?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [intersection?.isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage, infiniteScroll])

  useEffect(() => {
    if (data?.pages) {
      const allProducts = data.pages.flatMap((page) => page.data as Product[])
      setProducts(allProducts)
    }
  }, [data])

  if (!products || products.length === 0) return null

  const totalPages = data?.pages[0]?.total

  return (
    <article className={cn('py-10', className)} aria-label="Product showcase">
      {/* TITLE PART */}
      <div className="mb-4 md:flex md:flex-grow md:items-center md:justify-between">
        {title && (
          <Heading
            title={title}
            subtitle={total ? generateProductQuantityStr(totalPages) : subtitle}
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

      {/* PRODUCT LINKS PART */}
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

      {infiniteScroll && hasNextPage && (
        <div ref={loadMoreRef} className="h-10 w-full">
          {isFetchingNextPage && (
            <div className="w-full text-center py-4">
              <div className="animate-pulse">Loading more...</div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default memo(ProductsReel)
