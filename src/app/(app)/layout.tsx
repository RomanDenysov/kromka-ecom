import type { Metadata } from 'next/types'
import { cn } from '~/lib/utils'
import localFont from 'next/font/local'
import { Providers } from '~/providers'
import '~/lib/styles/globals.css'

const GreedCondensed = localFont({
  src: '../fonts/GreedCondensedBold.woff2',
  variable: '--font-greed-condensed',
})

export const metadata: Metadata = {
  title: 'Pekaren Kromka',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={cn(
        'relative size-full bg-background tracking-tight antialiased',
        GreedCondensed.variable,
      )}
      lang="sk"
      suppressHydrationWarning
    >
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
