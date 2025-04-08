import merge from 'lodash/merge'
import type { Metadata } from 'next'
import { absoluteUrl, prodUrl } from './absolute-url'

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string
  description: string
  image?: string
  canonicalUrl?: string
}

const applicationName = 'Pekáreň Kromka'
const author: Metadata['authors'] = {
  name: 'Pekáreň Kromka',
  url: 'https://pekarenkromka.sk',
}

const publisher = 'Pekáreň Kromka'
const twitterHandle = '@PekarenKromka'

export const createMetadata = ({
  title,
  description,
  image,
  canonicalUrl,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title.slice(0, 50)} | ${applicationName}`
  const parsedDescription = description.slice(0, 155)

  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description: parsedDescription,
    applicationName,
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description: parsedDescription,
      type: 'website',
      siteName: applicationName,
      locale: 'sk_SK',
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
      title: parsedTitle,
      description: parsedDescription,
    },
    icons: {
      icon: [
        { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
        { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
        { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
        { url: '/icons/icon-168x168.png', sizes: '168x168', type: 'image/png' },
        { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
      other: [
        {
          rel: 'apple-touch-icon',
          url: '/icons/icon-192x192.png',
        },
      ],
    },
    manifest: absoluteUrl('/site.webmanifest'),
  }

  const metadata: Metadata = merge(defaultMetadata, properties)

  if (image) {
    const imageUrl = image.startsWith('http') ? image : `${prodUrl}${image}`

    if (metadata.openGraph) {
      metadata.openGraph.images = [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    }

    if (metadata.twitter) {
      metadata.twitter.images = [imageUrl]
    }
  }

  if (canonicalUrl) {
    const canonicalFormatedUrl = canonicalUrl.startsWith('http')
      ? canonicalUrl
      : `${prodUrl}${canonicalUrl}`

    metadata.alternates = {
      canonical: canonicalFormatedUrl,
    }

    if (canonicalUrl && metadata.openGraph) {
      metadata.openGraph.url = canonicalFormatedUrl
    }
  }

  return metadata
}
