import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getUser } from '~/lib/actions/user'
import { User } from '@payload-types'
import { api } from '~/trpc/react'

type State = {
  user: Partial<User> | null
  setUser: (user: Partial<User>) => void
  clearUser: () => void
}

export const useUser = create<State>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'krmk',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
