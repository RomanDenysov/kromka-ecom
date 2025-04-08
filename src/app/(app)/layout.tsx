import localFont from 'next/font/local'
import { cn } from '~/lib/utils'
import { Providers } from '~/providers'
import '~/lib/styles/globals.css'

const GreedCondensed = localFont({
  src: '../fonts/GreedCondensedBold.woff2',
  variable: '--font-greed-condensed',
})

const fonts = cn(
  GreedCondensed.variable,
  'font-sans antialiased touch-manipulation tracking-tight',
)

export const revalidate = 86400
export const experimental_ppr = true

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
