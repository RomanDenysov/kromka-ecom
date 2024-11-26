import { TRPCReactProvider } from '~/trpc/react'
import SheetsProvider from './sheet-provider'
import CookieBannerProvider from './cookie-banner-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <SheetsProvider />
      <CookieBannerProvider />
      {children}
    </TRPCReactProvider>
  )
}
