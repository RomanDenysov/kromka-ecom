import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Product } from '~/server/payload/payload-types'

type CartItem = {
	quantity: number
	product: Product
}

interface CartState {
	items: CartItem[]
	addItem: (item: CartItem) => void
	removeItem: (productId: string) => void
	clearCart: () => void
	syncCart: (items: CartItem[]) => void
}

export const useCart = create<CartState>()(
	persist(
		(set) => ({
			items: [],
			addItem: ({product, quantity}: CartItem) => {
				if (!product || typeof product.id !== 'number') {
					console.error('Invalid product', product)
					return
				}
				set((state) => {
					const existingItemIndex = state.items.findIndex(
						(i) => i.product.id === product.id,
					)
					if (existingItemIndex !== -1) {
						return {
							items: state.items.map((item, index) =>
								index === existingItemIndex
									? {...item, quantity: item.quantity + quantity}
									: item,
							),
						}
					}

					return {
						items: [...state.items, {product, quantity}],
					}
				})
			},

			removeItem: (productId: string) => {
				set((state) => {
					const itemToRemove = state.items.find(
						(item) => item.product.id === productId,
					)

					if (!itemToRemove) return state

					return {
						items: state.items.filter((item) => item.product.id !== productId),
					}
				})
			},

			clearCart: () => set({items: []}),

			syncCart: (items: CartItem[]) => set({items}),
		}),
		{
			name: 'krmk_cart',
			storage: createJSONStorage(() => localStorage),
		},
	),
)
