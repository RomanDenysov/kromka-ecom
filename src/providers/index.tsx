import { TRPCReactProvider } from '~/trpc/react'
import SheetsProvider from './sheet-provider'
import CookieBannerProvider from './cookie-banner-provider'
import { Toaster } from '~/lib/ui/components/sonner'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <SheetsProvider />
      <CookieBannerProvider />
      <Toaster position="top-center" closeButton richColors />
      {children}
    </TRPCReactProvider>
  )
}
