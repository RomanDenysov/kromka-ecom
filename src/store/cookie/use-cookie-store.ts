import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CookieConsentState = {
  cookieConsent: boolean
  setCookieConsent: () => void
}

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set, get) => ({
      cookieConsent: false,
      setCookieConsent: () => set({ cookieConsent: true }),
    }),
    {
      name: 'krmk',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

