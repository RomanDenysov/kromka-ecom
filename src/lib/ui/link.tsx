'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface PrefetchImage {
  srcset: string | null | undefined
  sizes: string | null | undefined
  src: string | null | undefined
  alt: string | null | undefined
  loading: string | null | undefined
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

  const url = new URL(href, window.location.href)
  const imageResponse = await fetch(`/api/prefetch-images${url.pathname}`, {
    priority: 'low',
  })

  if (!imageResponse.ok && process.env.NODE_ENV === 'development') {
    throw new Error('Failed to prefetch images')
  }

  const { images } = await imageResponse.json()
  return images as PrefetchImage[]
}

function prefetchImage(image: PrefetchImage) {
  const srcset = image.srcset
  if (!srcset || image.loading === 'lazy' || seen.has(srcset)) {
    return
  }

  const img = new Image()
  img.decoding = 'async'
  img.fetchPriority = 'low'

  if (image.sizes) {
    img.sizes = image.sizes
  }
  if (image.src) {
    img.src = image.src
  }
  if (image.alt) {
    img.alt = image.alt
  }

  seen.add(srcset)
  img.srcset = srcset
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
  }, [props.href, props.prefetch])

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
      onMouseDown={(e) => {
        const url = new URL(String(props.href), window.location.href)
        if (
          url.origin === window.location.origin &&
          e.button === 0 &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey
        ) {
          e.preventDefault()
          router.push(String(props.href))
        }
      }}
      {...props}
    >
      {children}
    </NextLink>
  )
}) as typeof NextLink
