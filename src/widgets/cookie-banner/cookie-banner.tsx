'use client'

import { CookieIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useMountedState } from 'react-use'
import { Button } from '~/lib/ui/components/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { cn } from '~/lib/utils/cn'
import { useCookieConsentStore } from '~/store/cookie/use-cookie-store'
import { useVisitorStore } from '~/store/visitor'
import { acceptCookie } from './action'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const isMounted = useMountedState()
  const cookieConsent = useCookieConsentStore((state) => state.cookieConsent)
  const setCookieConsent = useCookieConsentStore((state) => state.setCookieConsent)
  // const visitorId = useVisitorStore((state) => state.visitorId)
  const setVisitorId = useVisitorStore((state) => state.setVisitorId)

  useEffect(() => {
    if (!cookieConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [cookieConsent])

  const handleAccept = async () => {
    setIsVisible(false)
    setCookieConsent()
    // if (!visitorId) {
    //   setVisitorId()
    // }
    await acceptCookie()
  }

  if (!isMounted) return null

  return (
    <Card
      className={cn(
        'fixed bottom-4 left-4 z-[200] max-w-xs space-y-0 shadow-2xl md:max-w-md',
        isVisible
          ? 'scale-100 translate-y-0 opacity-100 transition-[opacity,transform]'
          : 'scale-0 translate-y-8 opacity-0 transition-[opacity,transform]',
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle>My používame cookies</CardTitle>
        <CookieIcon />
      </CardHeader>
      <CardContent>
        <p className="text-start font-normal text-xs md:text-sm">
          My používame súbory cookie, aby sme vám zabezpečili čo najlepší zážitok z našej webovej
          stránky. Pokračovaním v používaní tejto stránky súhlasíte s používaním súborov cookie.
          <br />
          <br />
          <span className="text-xs">
            Viac informácií o tom, ako používame súbory cookie, nájdete v našej{' '}
            <Link href="/cookies" className="text-xs underline">
              zásade používania súborov cookie
            </Link>
            .
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={handleAccept}>
          Rozumiem
        </Button>
      </CardFooter>
    </Card>
  )
}
