'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { fetchImages } from '../actions/images'

interface PrefetchImage {
  srcset: string
  sizes: string
  src: string
  alt: string
  loading: string
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const seen = new Set<string>()
const imageCache = new Map<string, PrefetchImage[]>()

async function prefetchImages(href: string) {
  if (!href.startsWith('/') || href.startsWith('/order') || href === '/') {
    return []
  }
  try {
    const { images } = await fetchImages(href)
    return images as PrefetchImage[]
  } catch (error) {
    console.error('Failed to prefetch images:', error)
    return []
  }
}

export const Link: typeof NextLink = (({ children, ...props }) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const router = useRouter()
  let prefetchTimeout: NodeJS.Timeout | null = null

  useEffect(() => {
    if (props.prefetch === false) return

    const linkElement = linkRef.current
    if (!linkElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          prefetchTimeout = setTimeout(async () => {
            router.prefetch(String(props.href))
            await sleep(0)

            if (!imageCache.has(String(props.href))) {
              void prefetchImages(String(props.href)).then((images) => {
                imageCache.set(String(props.href), images)
              }, console.error)
            }

            observer.unobserve(entry.target)
          }, 300)
        } else if (prefetchTimeout) {
          clearTimeout(prefetchTimeout)
          prefetchTimeout = null
        }
      },
      { rootMargin: '0px', threshold: 0.1 },
    )

    observer.observe(linkElement)

    return () => {
      observer.disconnect()
      if (prefetchTimeout) {
        clearTimeout(prefetchTimeout)
      }
    }
  }, [props.href, props.prefetch, router])

  return (
    <NextLink
      ref={linkRef}
      prefetch={false}
      onMouseEnter={() => {
        router.prefetch(String(props.href))
        const images = imageCache.get(String(props.href)) || []
        for (const image of images) {
          prefetchImage(image)
        }
      }}
      {...props}
    >
      {children}
    </NextLink>
  )
}) as typeof NextLink

function prefetchImage(image: PrefetchImage) {
  if (image.loading === 'lazy' || seen.has(image.srcset)) {
    return
  }
  const img = new Image()
  img.decoding = 'async'
  img.fetchPriority = 'low'
  img.sizes = image.sizes
  seen.add(image.srcset)
  img.srcset = image.srcset
  img.src = image.src
  img.alt = image.alt
}
