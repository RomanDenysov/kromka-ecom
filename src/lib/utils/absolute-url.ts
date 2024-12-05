import { env } from '~/env'

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${path}`
}
