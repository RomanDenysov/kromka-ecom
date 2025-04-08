import { TagIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CtaSection } from '~/features/cta-section/ui'
import { Badge } from '~/lib/ui/components/badge'
import { Container } from '~/lib/ui/container'
import RichText from '~/lib/ui/rich-text'
import { prodUrl } from '~/lib/utils'
import { Article, JsonLd, WithContext, createOrganizationSchema, createSchemaUrl } from '~/lib/utils/json-ld'
import { createMetadata } from '~/lib/utils/metadata'
import type { Media, Tag } from '~/server/payload/payload-types'
import { api } from '~/trpc/server'
import PostInfo from './_components/post-info'

type Props = {
  params: Promise<{
    post: string
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params }: Props) => {
  const { post: postSlug } = await params
  const decodedPostSlug = decodeURIComponent(postSlug)
  const post = await api.posts.bySlug({ slug: decodedPostSlug })

  if (!post) return {
    title: 'Blog Pekárne Kromka',
    description: 'Blog Pekárne Kromka',
    image: '/images/end-banner.webp',
  }

  const meta = {
    title: post.title.slice(0, 60),
    // TODO: Add description to post db table collection
    description: `Prečítajte si článok ${post.title} v blogu Pekárne Kromka`,
    image: (post.banner as Media).url || '/images/end-banner.webp',
  }

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: `Prečítajte si článok ${post.title} v blogu Pekárne Kromka`,
    image: (post.banner as Media).url || '/images/end-banner.webp',
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: createOrganizationSchema(prodUrl),
    publisher: createOrganizationSchema(prodUrl),
    url: createSchemaUrl(new URL(`/blog/${post.slug}`, prodUrl)),
    articleSection: post.tags ? (post.tags as Tag[]).map(tag => tag.title).join(', ') : 'Blog'
  }

  return {
    ...createMetadata(meta),
    other: {
      'application/ld+json': JSON.stringify(jsonLd),
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { post: postSlug } = await params
  const decodedPostSlug = decodeURIComponent(postSlug)
  const post = await api.posts.bySlug({ slug: decodedPostSlug })

  if (!post) return notFound()

  const postBanner = typeof post.banner !== 'string' && post.banner.url

  const articleJsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: `Prečítajte si článok ${post.title} v blogu Pekárne Kromka`,
    image: (post.banner as Media).url || '/images/end-banner.webp',
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: createOrganizationSchema(prodUrl),
    publisher: createOrganizationSchema(prodUrl),
    url: createSchemaUrl(new URL(`/blog/${post.slug}`, prodUrl)),
    articleSection: post.tags ? (post.tags as Tag[]).map(tag => tag.title).join(', ') : 'Blog'
  }

  return (
    <>
      <JsonLd code={articleJsonLd} />
      <Container className="py-4 space-y-8 md:py-8">
        <article>
          <div className="relative aspect-video mb-8 overflow-hidden rounded grid place-content-center px-8 text-center">
            {postBanner && (
              <Image
                alt={post.title}
                loading="eager"
                decoding="sync"
                className="object-cover object-center absolute inset-0 rounded brightness-95 z-0"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={postBanner}
              />
            )}
            <h1 className="text-2xl md:text-4xl font-bold z-10 tracking-tight text-primary-foreground">
              {post.title}
            </h1>
          </div>

          <div className="mb-8">
            <PostInfo post={post} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => {
                const postTag = tag as Tag
                return (
                  <Badge key={postTag.id} variant="outline">
                    <TagIcon className="mr-1 h-3 w-3" />
                    {postTag.title}
                  </Badge>
                )
              })}
            </div>
          )}

          {post.content && (
            <div className="prose-zinc mx-auto">
              <RichText
                className="max-w-[48rem] lg:max-w-4xl mx-auto"
                data={post.content}
                enableGutter={false}
              />
            </div>
          )}
        </article>
      </Container>
    </>
  )
}
