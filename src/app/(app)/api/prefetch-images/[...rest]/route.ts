import { NextRequest, NextResponse } from 'next/server'
import { parseHTML } from 'linkedom'
import { env } from '~/env'

export const dynamic = 'force-dynamic'

function getHostname() {
  if (env.NODE_ENV === 'development') {
    return 'localhost:3000'
  }
  return env.NEXT_PUBLIC_SERVER_URL
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ rest: string[] }> }) {
  const schema = env.NODE_ENV === 'development' ? 'http' : 'https'
  const host = getHostname()
  if (!host) throw new NextResponse('Host not found', { status: 500 })

  const href = (await params).rest.join('/')
  if (!href) throw new NextResponse('Missing url parameter', { status: 400 })

  const url = `${schema}://${host}/${href}`
  const response = await fetch(url)
  if (!response.ok) throw new NextResponse('Failed to fetch', { status: response.status })

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
}
