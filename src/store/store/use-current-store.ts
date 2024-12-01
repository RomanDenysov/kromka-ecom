import { Store } from '@payload-types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  store: Store | null
  setStore: (store: Store) => void
  isLoading: boolean
  clearStore: () => void
  setIsLoading: (isLoading: boolean) => void
}

export const useCurrentStore = create<State>()(
  persist(
    (set) => ({
      store: null,
      isLoading: true,
      setStore: (store: Store) => set({ store, isLoading: false }),
      clearStore: () => set({ store: null }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: 'krmk',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(false)
      },
    },
  ),
)
