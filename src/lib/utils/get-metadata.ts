export const getMetadata = ({
  title,
  description,
  image,
  url,
}: {
  title: string
  description: string
  image: string
  url: string
}) => {
  return {
    title,
    description,
    robots: 'follow, index',
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      images: image ? [image] : undefined,
      type: 'article',
    },
    twitter: {
      siteName: title,
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}
