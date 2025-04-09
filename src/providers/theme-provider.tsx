'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'
import useMountedState from 'react-use/lib/useMountedState'

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  const isMounted = useMountedState()

  if (!isMounted) {
    return null
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
