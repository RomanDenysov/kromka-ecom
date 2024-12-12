import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '~/lib/ui/components/sonner'
import { TRPCReactProvider } from '~/trpc/react'
import CookieBannerProvider from './cookie-banner-provider'
import SheetsProvider from './sheet-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SheetsProvider />
          <CookieBannerProvider />
          <Toaster position="top-center" richColors />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </TRPCReactProvider>
  )
}
