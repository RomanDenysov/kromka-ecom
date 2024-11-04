'use client'

import { useMountedState } from 'react-use'
import { CartSheet } from '~/features/cart-sheet/ui/cart-sheet'

export default function SheetsProvider() {
	const isMounted = useMountedState()
	if (!isMounted) return null

	return (
		<>
			<CartSheet />
		</>
	)
}
