import { NextRequest, NextResponse } from 'next/server'
import { parseHTML } from 'linkedom'
import { env } from '~/env'

export const dynamic = 'force-static'

function getHostname() {
  if (env.NODE_ENV === 'development') {
    return 'localhost:3000'
  }
  return env.NEXT_PUBLIC_SERVER_URL
}

export async function GET(_: NextRequest, { params }: { params: { rest: string[] } }) {
  const schema = env.NODE_ENV === 'development' ? 'http' : 'https'
  const host = getHostname()

  if (!host) {
    return new Response('Failed to get hostname from env', { status: 500 })
  }

  const href = params.rest.join('/')
  if (!href) {
    return new Response('Missing url parameter', { status: 400 })
  }

  const url = `${schema}://${host}/${href}`
  const response = await fetch(url)

  if (!response.ok) {
    return new Response('Failed to fetch', { status: response.status })
  }

  const body = await response.text()
  const { document } = parseHTML(body)
  const images = Array.from(document.querySelectorAll('main img'))
    .map((img) => ({
      srcset: img.getAttribute('srcset') || img.getAttribute('srcSet'),
      sizes: img.getAttribute('sizes'),
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      loading: img.getAttribute('loading'),
    }))
    .filter((img) => img.src)

  return NextResponse.json(
    { images },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    },
  )
}
