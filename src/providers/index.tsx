import { TRPCReactProvider } from '~/trpc/react'
import SheetsProvider from './sheet-provider'
import CookieBannerProvider from './cookie-banner-provider'
import { Toaster } from '~/lib/ui/components/sonner'
import { SessionProvider } from 'next-auth/react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <SheetsProvider />
        <CookieBannerProvider />
        <Toaster position="top-center" closeButton richColors />
        {children}
      </SessionProvider>
    </TRPCReactProvider>
  )
}
