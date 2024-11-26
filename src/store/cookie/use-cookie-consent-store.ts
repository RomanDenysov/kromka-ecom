import { getCookie, setCookie } from 'cookies-next'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CookiePreferences = {
  necessary: boolean
  functional: boolean
  performance: boolean
}

type CookieConsentState = {
  preferences: CookiePreferences
  isVisible: boolean
  profileId: string | null
  setIsVisible: (isVisible: boolean) => void
  setPreference: (key: keyof CookiePreferences, value: boolean) => void
  savePreferences: () => void
  hasConsented: () => boolean
  resetBanner: () => void
  setProfile: (profileId: string | null) => void
}

const COOKIE_NAME = 'krmk_cookie'
const PROFILE_COOKIE_NAME = 'krmk_profile'

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set, get) => ({
      preferences: {
        necessary: true,
        functional: false,
        performance: false,
      },
      isVisible: true,
      profileId: null,
      setPreference: (key, value) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        }))
      },
      savePreferences: () => {
        const preferences = get().preferences
        set({ isVisible: false })
        setCookie(COOKIE_NAME, JSON.stringify(preferences), {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: '/',
        })
      },
      hasConsented: () => {
        return Object.values(get().preferences).some((value) => value === true)
      },
      setIsVisible: (isVisible) => set({ isVisible }),
      resetBanner: () => set({ isVisible: true }),
      setProfile: (profileId) => {
        set({ profileId })
        setCookie(PROFILE_COOKIE_NAME, profileId, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: '/',
        })
      },
    }),
    {
      name: 'krmk',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

const initializeBannerVisibility = async () => {
  const cookieConsent = await getCookie(COOKIE_NAME)
  const profileId = await getCookie(PROFILE_COOKIE_NAME)
  if (cookieConsent) {
    useCookieConsentStore.setState({
      isVisible: false,
      preferences: JSON.parse(cookieConsent),
    })
  }

  if (profileId) {
    useCookieConsentStore.setState({ profileId: profileId as string })
  }

  if (cookieConsent && profileId) {
    useCookieConsentStore.setState({ isVisible: false })
  } else {
    useCookieConsentStore.setState({ isVisible: true })
  }
}

initializeBannerVisibility()
