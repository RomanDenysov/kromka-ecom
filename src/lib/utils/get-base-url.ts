import { cache } from 'react'
import { env } from '~/env'

export const getBaseUrl = cache(() => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  if (env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  return env.NEXT_PUBLIC_SERVER_URL
})()
