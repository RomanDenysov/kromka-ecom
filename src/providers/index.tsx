import { TRPCReactProvider } from '~/trpc/react'
import SheetsProvider from './sheet-provider'
import CookieBannerProvider from './cookie-banner-provider'
import { Toaster } from '~/lib/ui/components/sonner'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SheetsProvider />
          <CookieBannerProvider />
          <Toaster position="top-center" richColors />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </TRPCReactProvider>
  )
}
