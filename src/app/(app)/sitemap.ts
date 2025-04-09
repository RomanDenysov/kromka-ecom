import configPromise from '@payload-config'
import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import { prodUrl } from '~/lib/utils/absolute-url'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const payload = await getPayload({ config: configPromise })

  // Static routes
  const staticRoutes = [
    '/',
    '/about',
    '/blog',
    '/products',
    '/profile',
    '/cookies',
    '/privacy',
    '/terms',
  ]

  // Fetch dynamic routes from Payload CMS
  const [products, posts] = await Promise.all([
    // Fetch products
    payload.find({
      collection: 'products',
      limit: 1000,
      depth: 0,
      where: {
        status: {
          equals: 'active',
        },
      },
    }),
    // Fetch blog posts
    payload.find({
      collection: 'posts',
      limit: 1000,
      depth: 0,
      where: {
        status: {
          equals: 'published',
        },
      },
    }),
  ])

  // Generate URLs for dynamic routes
  const productRoutes = products.docs.map((product) => ({
    url: new URL(`/products/${product.slug}`, prodUrl).href,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const postRoutes = posts.docs.map((post) => ({
    url: new URL(`/blog/${post.slug}`, prodUrl).href,
    lastModified: new Date(post.publishedAt || post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Combine all routes
  return [
    // Static routes with high priority
    ...staticRoutes.map((route) => ({
      url: new URL(route, prodUrl).href,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '/' ? 1 : 0.8,
    })),
    // Dynamic routes
    ...productRoutes,
    ...postRoutes,
  ]
}

export default sitemap
