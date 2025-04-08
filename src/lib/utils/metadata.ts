import merge from 'lodash/merge'
import type { Metadata } from 'next'

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
  }

  const metadata: Metadata = merge(defaultMetadata, properties)

  if (image) {
    if (metadata.openGraph) {
      metadata.openGraph.images = [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    }

    if (metadata.twitter) {
      metadata.twitter.images = [image]
    }
  }

  if (canonicalUrl) {
    metadata.alternates = {
      canonical: canonicalUrl,
    }
  }

  return metadata
}
