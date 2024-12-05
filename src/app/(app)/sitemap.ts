import { MetadataRoute } from 'next/types'
import { env } from '~/env'

const host = (() => {
  if (env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000') {
    return env.NEXT_PUBLIC_SERVER_URL
  }

  // if (env.VERCEL_URL) {
  //   return `https://${env.VERCEL_URL}`
  // }

  const port = env.PORT || 3000

  return `http://localhost:${port}`
})()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: host,
      lastModified: new Date(),
    },
  ]
}
