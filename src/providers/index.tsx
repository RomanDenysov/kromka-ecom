import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Provider as WBProvider } from 'react-wrap-balancer'

import { SearchModal } from '~/features/search-modal/ui'
import { Toaster } from '~/lib/ui/components/sonner'
import { TRPCReactProvider } from '~/trpc/react'
import { CookieBanner } from '~/widgets/cookie-banner/cookie-banner'
import { PostHogProvider } from './posthog-provider'
import SheetsProvider from './sheet-provider'

const DynamicThemeProvider = dynamic(
  () => import('./theme-provider').then((mod) => mod.ThemeProvider)
  // {
  //   ssr: false,
  // }
);

export const Providers = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <TRPCReactProvider>
      <WBProvider>
        <PostHogProvider>
          <DynamicThemeProvider
            attribute="class"
            disableTransitionOnChange
            defaultTheme="light"
            enableSystem
          >
            <Suspense fallback={null}>
              <SheetsProvider />
            </Suspense>

            <Suspense fallback={null}>
              <SearchModal />
            </Suspense>

            <Suspense fallback={null}>
              <CookieBanner />
            </Suspense>

            <Toaster position="top-center" richColors />
            {children}
          </DynamicThemeProvider>
        </PostHogProvider>
      </WBProvider>
    </TRPCReactProvider>
  )
}
