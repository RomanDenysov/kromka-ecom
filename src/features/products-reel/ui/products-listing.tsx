
'use client'

import Link from 'next/link'
import React from 'react'
import { Skeleton } from '~/lib/ui/components/skeleton'
import type { Product } from '~/server/payload/payload-types'
import { cn, formatPrice } from '~/shared/lib/utils'
import { FastAddButton } from './fast-add-button'

type Props = {
	product: Product | null
	index: number
}

export const ProductsListing = React.memo(({product, index}: Props) => {
	const [isVisible, setIsVisible] = React.useState<boolean>(false)

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, index * 75)
		return () => clearTimeout(timer)
	}, [index])

	if (!product || !isVisible) return <ProductPlaceholder />

	const validUrls = product.images
		.map(({image}) => typeof image !== 'number' && image.url)
		.filter(Boolean) as string[]

	const categorySlug =
		(typeof product.category !== 'number' && product.category.slug) || ''

	if (isVisible || product) {
		return (
			<article
				className={cn('group/main invisible h-full w-full cursor-pointer', {
					'fade-in-5 visible animate-in': isVisible,
				})}>
				<div className='flex w-full flex-col'>
					<Link
						href={{
							pathname: `/products/${product.slug}`,
							query: {
								c: categorySlug,
							},
						}}>
						<ImageSlider urls={validUrls} />
					</Link>

					<h4
						className='mt-4 mb-1 overflow-hidden text-ellipsis text-nowrap font-medium text-gray-700 text-sm hover:overflow-visible hover:text-clip'>
						{product.title}
					</h4>
					<div className='flex items-end justify-between'>
						<h5 className='text-base text-gray-500'>
							{formatPrice(product.price)}
						</h5>
						<FastAddButton product={product} />
					</div>
				</div>
			</article>
		)
	}
})

ProductsListing.displayName = 'ProductsListing'

const ProductPlaceholder = () => {
	return (
		<div className='flex w-full flex-col'>
			<div className='relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100'>
				<Skeleton className='size-full' />
			</div>
			<Skeleton className='mt-4 h-4 w-2/3 rounded-lg' />
			<div className='flex items-center justify-between'>
				<Skeleton className='mt-2 h-4 w-16 rounded-lg' />
				<Skeleton className='mt-2 h-4 w-12 rounded-lg' />
			</div>
		</div>
	)
}
