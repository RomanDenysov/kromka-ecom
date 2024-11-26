import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import RichText from '~/lib/ui/rich-text'
import { api } from '~/trpc/server'

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

  return (
    <article>
      <Suspense>
        <RichText
          className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
          content={post.content}
          enableGutter={false}
        />
      </Suspense>
    </article>
  )
}
