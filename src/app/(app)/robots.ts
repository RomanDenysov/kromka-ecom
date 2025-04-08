import { type MetadataRoute } from 'next'
import { prodUrl } from '~/lib/utils/absolute-url'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/*', '/api/*'],
    },
    sitemap: new URL('/sitemap.xml', prodUrl.href).href,
  }
}
