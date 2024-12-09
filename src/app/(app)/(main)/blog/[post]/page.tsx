import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'
import { Badge } from '~/lib/ui/components/badge'
import { Container } from '~/lib/ui/container'
import RichText from '~/lib/ui/rich-text'
import { Tag } from '~/server/payload/payload-types'
import { api } from '~/trpc/server'
import PostInfo from './_components/post-info'
import { TagIcon } from 'lucide-react'

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
    <Container className="py-8 md:py-16 max-w-5xl mx-auto space-y-12">
      <AspectRatio ratio={16 / 9} className="bg-muted relative rounded-lg shadow border">
        <Image
          src={'/placeholder.png'}
          alt={post.title}
          fill
          className="object-cover z-0 object-center rounded-lg shadow border"
          decoding="sync"
          loading="eager"
          priority={true}
        />
        <div className="absolute bg-black/30 inset-0 z-10 grid place-content-center">
          <div className="z-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black line-clamp-2 text-center">
              {post.title}
            </h1>
          </div>
        </div>
      </AspectRatio>
      <PostInfo post={post} />
      <div className="flex flex-wrap gap-2 mb-8">
        <TagIcon size={16} />
        {post.tags &&
          post.tags.map((tag) => {
            const postTag = tag as Tag
            return (
              <Badge key={postTag.id} variant="secondary">
                {postTag.title}
              </Badge>
            )
          })}
      </div>
      <Suspense>
        <RichText
          className="col-span-3 col-start-1 grid-rows-[1fr] lg:grid lg:grid-cols-subgrid"
          content={post.content}
          enableGutter={false}
        />
      </Suspense>
    </Container>
  )
}
