import type { CollectionSlug, PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/blog', // Изменено с '/posts' на '/blog'
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  // Базовый путь для коллекции
  const collectionPrefix = collectionPrefixMap[collection]
  if (!collectionPrefix) {
    throw new Error(`Unknown collection: ${collection}`)
  }

  // Генерируем путь для конечной страницы
  const path = `${collectionPrefix}/${slug}`

  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'http://localhost:3000',
  )

  // URL для preview endpoint
  const previewUrl = new URL('/next/preview', baseUrl)

  // Добавляем параметры
  previewUrl.searchParams.set('slug', slug)
  previewUrl.searchParams.set('collection', collection)
  previewUrl.searchParams.set('path', path)

  console.log('Generated preview URL:', previewUrl.toString())
  return previewUrl.toString()
}
