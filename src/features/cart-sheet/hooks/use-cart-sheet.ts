import { create } from 'zustand'

type State = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export const useCartSheet = create<State>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}))
