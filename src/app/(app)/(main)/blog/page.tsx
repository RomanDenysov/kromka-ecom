import { Suspense } from 'react'
import { PostsGrid } from '~/features/posts-grid/ui'
import { TagsFilter } from '~/features/tags-filter/ui'
import { Container } from '~/lib/ui/container'
import { api } from '~/trpc/server'

export default async function BlogPage() {
  const posts = await api.posts.getPosts()
  const tags = await api.posts.getTags()

  return (
    <>
      <Container className="pt-4 mb-4 flex items-center justify-between">
        <h1 className="text-left font-bold text-2xl md:text-3xl tracking-tight">
          {'Náš Kromka blog'}
        </h1>
      </Container>
      {/* <BlogCarousel posts={posts.slice(0, 4)} /> */}
      <Suspense fallback={null}>
        <TagsFilter tags={tags} />
      </Suspense>
      <Container className="py-5">
        <Suspense fallback={null}>
          <PostsGrid posts={posts} />
        </Suspense>
        {/* <CtaSection /> */}
      </Container>
    </>
  )
}
