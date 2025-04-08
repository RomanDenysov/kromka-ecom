import localFont from 'next/font/local'
import type { Metadata } from 'next/types'
import { absoluteUrl, cn } from '~/lib/utils'
import { Providers } from '~/providers'
import '~/lib/styles/globals.css'
import { env } from '~/env'
import { siteConfig } from '~/lib/config/site'

const GreedCondensed = localFont({
  src: '../fonts/GreedCondensedBold.woff2',
  variable: '--font-greed-condensed',
})

const fonts = cn(
  GreedCondensed.variable,
  'font-sans antialiased touch-manipulation tracking-tight',
)

// export const revalidate = 86400 // 24 hours
export const experimental_ppr = true

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: ['pekaren', 'vyroba', 'chleba', 'chlieb', 'pecivo'],
//   // authors: [
//   //   {
//   //     name: 'reliverse',
//   //     url: 'https://reliverse.org',
//   //   },
//   // ],
//   creator: 'romand',
//   openGraph: {
//     type: 'website',
//     locale: 'sk_SK',
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: siteConfig.name,
//     description: siteConfig.description,
//     images: [`${siteConfig.url}/og.png`],
//     creator: '',
//   },
//   icons: {
//     icon: '/icon.png',
//   },
//   manifest: absoluteUrl('/site.webmanifest'),
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="sk"
      className={cn(fonts, 'relative size-full bg-background scroll-smooth')}
      suppressHydrationWarning
    >
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
