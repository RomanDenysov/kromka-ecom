import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next/types'
import { cn } from '~/lib/utils'
import { Providers } from '~/providers'
import './styles/globals.css'

export const metadata: Metadata = {
	title: '',
	description: ''
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='sk'>
			<head />
			<body
				className={cn(
					'relative size-full bg-background font-sans tracking-tighti antialiased',
					GeistMono.variable,
					GeistSans.variable
				)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
