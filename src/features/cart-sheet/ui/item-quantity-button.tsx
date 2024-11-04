'use client'

import type { Product } from '@payload-types'
import { Minus, Plus } from 'lucide-react'
import { useCart } from '~/store/cart/use-cart'

type Props = {
	product: Product
	quantity: number
}

export const ItemQuantityButton = ({product, quantity}: Props) => {
	const removeItem = useCart((state) => state.removeItem)
	const addItem = useCart((state) => state.addItem)

	const removeItemHandler = () => {
		if (quantity === 1) removeItem(product.id)
		else addItem({product, quantity: -1})
	}

	return (
		<div className='flex h-[28px] w-[76px] items-center justify-between rounded-md border border-border bg-background shadow-sm'>
			<button
				type='button'
				onClick={removeItemHandler}
				className='grid size-full flex-1 place-content-center rounded-l-md hover:bg-secondary'>
				<Minus className='size-5 sm:size-4' />
			</button>
			<span className='grid flex-1 place-content-center font-semibold text-lg tracking-tight sm:text-base'>
				{quantity}
			</span>
			<button
				type='button'
				onClick={() => addItem({product, quantity: 1})}
				className='grid size-full flex-1 place-content-center rounded-r-md hover:bg-secondary'>
				<Plus className='size-5 sm:size-4' />
			</button>
		</div>
	)
}
