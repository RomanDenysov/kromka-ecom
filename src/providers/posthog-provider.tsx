"use client"

import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { Suspense, useEffect } from "react"
import { useCookieConsentStore } from "~/store/cookie/use-cookie-store"
import { api } from "~/trpc/react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const cookieConsent = useCookieConsentStore((state) => state.cookieConsent)
  const { data: user } = api.users.me.useQuery()

  useEffect(() => {
    if (cookieConsent) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: "/ingest",
        ui_host: "https://eu.posthog.com",
        persistence: cookieConsent ? 'localStorage+cookie' : 'memory',
        capture_pageview: false, // We capture pageviews manually
        capture_pageleave: true, // Enable pageleave capture
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            posthog.debug()
          }
        }
      })
    }
    if (user) {
      posthog.identify(user.email, {
        email: user.email,
        name: user.name || undefined,
        phone: user.phone || undefined,
      })
    }
  }, [cookieConsent, user])

  if (!cookieConsent) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const cookieConsent = useCookieConsentStore((state) => state.cookieConsent)

  useEffect(() => {
    if (pathname && posthog && cookieConsent) {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) {
        url += "?" + search
      }
      posthog.capture("$pageview", { "$current_url": url })
    }
  }, [pathname, searchParams, posthog, cookieConsent])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
