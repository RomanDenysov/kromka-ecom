'use server'

import { parseHTML } from 'linkedom'
import { getHostname, getSchema } from '~/lib/utils'

export async function fetchImages(href: string) {
  const schema = getSchema()
  const host = getHostname()

  if (!host) {
    throw new Error('Failed to get hostname from env')
  }

  if (!href) {
    throw new Error('Missing url parameter')
  }
  const url = `${schema}://${host}/${href}`
  const response = await fetch(url, {
    cache: 'force-cache',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`)
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

  return { images }
}
