import { createId } from '@paralleldrive/cuid2'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type VisitorState = {
  visitorId: string | null
  setVisitorId: () => void
}

export const useVisitorStore = create<VisitorState>()(
  persist(
    (set) => ({
      visitorId: null,
      setVisitorId: () => set({ visitorId: createId() }),
    }),
    {
      name: 'krmk_visitor',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
