'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { useInitializeUser } from '~/hooks/use-initialize-user'
import { useCookieConsentStore } from '~/store/cookie/use-cookie-consent-store'
import { api } from '~/trpc/react'

const CookieConsentBanner = dynamic(
  () => import('~/widgets/cookie-consent/cookie-consent-banner'),
  {
    ssr: false,
    loading: () => (
      <div className="sr-only" aria-live="polite">
        Loading cookie consent options...
      </div>
    ),
  },
)

const CookieBannerProvider = () => {
  // Remove useState since we can derive this from other state
  const isVisible = useCookieConsentStore((state) => state.isVisible)
  const setProfile = useCookieConsentStore((state) => state.setProfile)
  const { data: profile, isLoading } = api.profiles.me.useQuery()

  useInitializeUser()

  // Memoize the profile initialization
  const handleProfile = useCallback(() => {
    if (profile) {
      setProfile(profile)
    }
  }, [profile, setProfile])

  useEffect(() => {
    handleProfile()
  }, [handleProfile])

  // Combine conditions for early return
  if (!profile || !isVisible || isLoading) {
    return null
  }

  return <CookieConsentBanner />
}

export default CookieBannerProvider
