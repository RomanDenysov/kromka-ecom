import { NextRequest, NextResponse } from 'next/server'
import { parseHTML } from 'linkedom'
import { env } from '~/env'

export const dynamic = 'force-dynamic'

function getHostname() {
  if (env.NODE_ENV === 'development') {
    return 'http://localhost:3000' // Включаем протокол в hostname
  }
  return env.NEXT_PUBLIC_SERVER_URL // Убедитесь, что URL включает протокол
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ rest: string[] }> }) {
  try {
    const host = getHostname()
    if (!host) throw new NextResponse('Host not found', { status: 500 })

    const href = (await params).rest.join('/')
    if (!href) throw new NextResponse('Missing url parameter', { status: 400 })

    // Формируем URL правильно, учитывая что host уже содержит протокол
    const url = new URL(href, host).toString()

    const response = await fetch(url, {
      headers: {
        Accept: 'text/html',
      },
    })

    if (!response.ok) {
      throw new NextResponse(`Failed to fetch: ${response.statusText}`, {
        status: response.status,
      })
    }

    const body = await response.text()
    const { document } = parseHTML(body)

    const images = Array.from(document.querySelectorAll('main img'))
      .map((img) => ({
        srset: img.getAttribute('srcset') || img.getAttribute('srcSet'),
        sizes: img.getAttribute('sizes'),
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        loading: img.getAttribute('loading'),
      }))
      .filter((img) => img.src)

    return NextResponse.json({ images }, { headers: { 'Cache-Control': 'public, max-age=3600' } })
  } catch (error) {
    console.error('Prefetch error:', error)
    return NextResponse.json({ error: 'Failed to prefetch images' }, { status: 500 })
  }
}
