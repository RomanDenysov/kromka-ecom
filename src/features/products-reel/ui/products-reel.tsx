'use client'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ProductListing } from '~/features/products-reel/ui/product-listing'
import { Heading } from '~/lib/ui/heading'
import type { ProductsQueryType } from '~/server/api/routers/products/models'
import { cn } from '~/shared/lib/utils'
import { api } from '~/trpc/react'

type Props = {
	className?: string
	href?: string
	title?: string
	subtitle?: string
	limit?: number
	filteredOptions?: string
	query: ProductsQueryType
	excludeProductId?: number
}

const FALLBACK_LIMIT = 8

const MemoizedProductListing = React.memo(ProductListing)

const ProductsReel = ({
	className,
	href,
	title,
	subtitle,
	limit = FALLBACK_LIMIT,
	filteredOptions,
	query,
	excludeProductId,
}: Props) => {
	const {
		data,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isError,
	} = api.products.getInfiniteProducts.useInfiniteQuery(
		{
			limit,
			query: {...query, categorySlug: filteredOptions},
			excludeProductId,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextPage,
		},
	)

	React.useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - 500 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage])

	const products = data?.pages.flatMap((page) => page.items)

	if (!products || products.length === 0) return null
	const renderProducts = () => {
		if (isLoading) {
			return (
				// Если данные загружаются, отображаем плейсхолдеры
				Array.from({length: limit}).map((_, index) => (
					<MemoizedProductListing
						key={`placeholder-${index.toFixed()}`}
						product={null}
						index={index}
					/>
				))
			)
		}

		return products.map((product, index) => (
			<MemoizedProductListing
				key={`product-${product?.id || index.toFixed()}`}
				index={index}
				product={product}
			/>
		))
	}

	return (
		<article className={cn('py-10', className)} aria-label='Product showcase'>
			{/* TITLE PART */}
			<div className='mb-4 md:flex md:flex-grow md:items-center md:justify-between'>
				{title && (
					<Heading title={title} subtitle={subtitle} className='w-full' />
				)}

				{href ? (
					<Link
						href={href}
						className='hidden items-center justify-end gap-x-1 font-medium text-red-600 text-sm hover:text-red-500 hover:underline md:inline-flex'
						aria-label='Načítať produkty'>
						Nakupovat
						<span aria-hidden='true'>
							<ChevronRightIcon size={16} />
						</span>
					</Link>
				) : null}
			</div>

			{/* PRODUCT LINKS PART */}
			<div className='relative'>
				<div className='mt-6 flex w-full items-center'>
					<div className='grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
						{renderProducts()}
					</div>
				</div>
			</div>
		</article>
	)
}

export default ProductsReel
