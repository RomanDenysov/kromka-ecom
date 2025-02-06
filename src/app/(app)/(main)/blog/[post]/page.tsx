import { TagIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CtaSection } from '~/features/cta-section/ui'
import { Badge } from '~/lib/ui/components/badge'
import { Container } from '~/lib/ui/container'
import RichText from '~/lib/ui/rich-text'
import type { Tag } from '~/server/payload/payload-types'
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

export default async function PostPage({ params }: Props) {
  const { post: postSlug } = await params
  const decodedPostSlug = decodeURIComponent(postSlug)
  const post = await api.posts.bySlug({ slug: decodedPostSlug })

  if (!post) return notFound()

  const postBanner = typeof post.banner !== 'string' && post.banner.url

  return (
    <Container className="py-10 space-y-10 md:py-20">
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
      <CtaSection />
    </Container>
  )
}
