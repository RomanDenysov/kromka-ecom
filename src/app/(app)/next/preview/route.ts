import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { CollectionSlug, getPayload } from 'payload'

export async function GET(
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  },
): Promise<Response> {
  try {
    const payload = await getPayload({ config: configPromise })
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const collection = searchParams.get('collection') as CollectionSlug
    const slug = searchParams.get('slug')

    console.log('Preview request:', {
      path,
      collection,
      slug,
      searchParams: Object.fromEntries(searchParams),
    })

    if (!path || !collection || !slug) {
      return new Response('Missing required parameters', { status: 400 })
    }

    // Проверяем существование документа
    const docs = await payload.find({
      collection,
      draft: true,
      limit: 1,
      pagination: false,
      depth: 0,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (!docs.docs.length) {
      console.log('Document not found:', {
        collection,
        slug,
        searchResults: docs,
      })
      return new Response('Document not found', { status: 404 })
    }

    // Включаем режим черновика
    const draft = await draftMode()
    draft.enable()

    // Формируем правильный путь редиректа
    const redirectPath =
      collection === 'posts' && !path.startsWith('/blog') ? path.replace('/posts', '/blog') : path

    console.log('Redirecting to:', redirectPath)

    // Возвращаем редирект как Response
    return new Response(null, {
      status: 307,
      headers: {
        Location: redirectPath,
      },
    })
  } catch (error) {
    console.error('Preview error:', error)
    payload.logger.error({ err: error }, 'Error in preview route')
    return new Response('Error processing preview', { status: 500 })
  }
}
