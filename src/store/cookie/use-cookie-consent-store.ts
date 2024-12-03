import { getCookie, setCookie } from 'cookies-next'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Profile } from '@payload-types'

type CookiePreferences = {
  necessary: boolean
  functional: boolean
}

type CookieConsentState = {
  preferences: CookiePreferences
  isVisible: boolean
  profile: Profile | null
  setIsVisible: (isVisible: boolean) => void
  setPreference: (key: keyof CookiePreferences, value: boolean) => void
  savePreferences: () => void
  hasConsented: () => boolean
  resetBanner: () => void
  setProfile: (profile: Profile | null) => void
}

const COOKIE_NAME = 'krmk_cookie'
const PROFILE_COOKIE_NAME = 'krmk_profile'

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set, get) => ({
      preferences: {
        necessary: true,
        functional: false,
      },
      isVisible: true,
      profile: null,
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
      setProfile: (profile) => {
        set({ profile })
        if (profile) {
          setCookie(PROFILE_COOKIE_NAME, profile.id, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
          })
        }
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

  if (cookieConsent && profileId) {
    useCookieConsentStore.setState({ isVisible: false })
  } else {
    useCookieConsentStore.setState({ isVisible: true })
  }
}

initializeBannerVisibility()
