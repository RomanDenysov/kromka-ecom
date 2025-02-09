import { create } from 'zustand'

type CheckoutStepType = 'cart' | 'details' | 'confirmation'

interface CheckoutState {
  currentStep: CheckoutStepType
  error: string | null
  isSubmitting: boolean

  setStep: (step: CheckoutStepType) => void
  setError: (error: string | null) => void
  setIsSubmitting: (isSubmitting: boolean) => void
  reset: () => void
}

const initialState = {
  currentStep: 'cart' as const,
  error: null,
  isSubmitting: false,
}

export const checkoutStore = create<CheckoutState>((set) => ({
  ...initialState,
  setStep: (step) => set({ currentStep: step }),
  setError: (error) => set({ error }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  reset: () => set(initialState),
}))
