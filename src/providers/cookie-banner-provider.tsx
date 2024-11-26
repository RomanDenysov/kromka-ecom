'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useCookieConsentStore } from '~/store/cookie/use-cookie-consent-store'

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
  const [showBanner, setShowBanner] = useState(true)
  const isVisible = useCookieConsentStore((state) => state.isVisible)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  if (!showBanner || !isVisible) return null

  return <CookieConsentBanner />
}

export default CookieBannerProvider
