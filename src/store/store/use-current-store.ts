import { Store } from '@payload-types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  store: Store | null
  setStore: (store: Store) => void
}

export const useCurrentStore = create<State>()(
  persist(
    (set) => ({
      store: null,
      setStore: (store: Store) => set({ store }),
    }),
    {
      name: 'krmk_store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
