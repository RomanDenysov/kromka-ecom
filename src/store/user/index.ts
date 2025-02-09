import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

export const authStore = create(
  persist<State>(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
    }),
    {
      name: 'krmk_auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
