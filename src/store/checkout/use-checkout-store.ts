import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useCart } from '../cart/use-cart'
import { useCallback } from 'react'

interface CheckoutState {
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      reset: () => set({ isLoading: false, error: null }),
    }),
    {
      name: 'checkout-store',
    },
  ),
)

// Селекторы для оптимизации ререндеров
export const useCheckoutLoading = () => useCheckoutStore((state) => state.isLoading)
export const useCheckoutError = () => useCheckoutStore((state) => state.error)
export const useCanSubmit = () => {
  const isLoading = useCheckoutLoading()
  const error = useCheckoutError()
  const items = useCart((state) => state.items)

  return !isLoading && !error && items.length > 0
}
export const useCheckoutComplete = () => {
  const clearCart = useCart((state) => state.clearCart)
  const resetCheckout = useCheckoutStore((state) => state.reset)

  return useCallback(() => {
    clearCart()
    resetCheckout()
  }, [clearCart, resetCheckout])
}
