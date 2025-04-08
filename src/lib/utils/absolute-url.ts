import { env } from '~/env'

// Client-side URL helper
export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`
  }
  return `${env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${path}`
}

// Server-side URL helper
function getBaseUrl() {
  if (env.NEXT_PUBLIC_SERVER_URL) {
    // Ensure we have a clean base URL without protocol
    const cleanServerUrl = env.NEXT_PUBLIC_SERVER_URL.replace(/^https?:\/\//, '')
    // Detect protocol (defaulting to https in production)
    const protocol = env.NEXT_PUBLIC_SERVER_URL.startsWith('https') ? 'https' : 'http'

    return new URL(`${protocol}://${cleanServerUrl}`)
  }
  return new URL('http://localhost:3000')
}

// Export for server-side only usage (sitemap, robots, etc)
export const prodUrl = getBaseUrl()
