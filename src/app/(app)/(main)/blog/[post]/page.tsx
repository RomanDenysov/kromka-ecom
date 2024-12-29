import { TagIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'
import { Badge } from '~/lib/ui/components/badge'
import { Container } from '~/lib/ui/container'
import { RichText } from '~/lib/ui/rich-text'
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
    <Container>
      <article className="prose prose-zinc mx-auto dark:prose-invert">
        <div className="relative mb-8 overflow-hidden rounded-xl">
          <AspectRatio ratio={16 / 9}>
            {postBanner && (
              <Image
                alt={post.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={postBanner}
              />
            )}
          </AspectRatio>
        </div>

        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
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
          <div className="prose-custom">
            <RichText content={post.content} />
          </div>
        )}
      </article>
    </Container>
  )
}
