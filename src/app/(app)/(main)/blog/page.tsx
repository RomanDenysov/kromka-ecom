import { BlogCarousel } from '~/features/blog-carousel/ui'
import { PostsGrid } from '~/features/posts-grid/ui'
import { TagsFilter } from '~/features/tags-filter/ui'
import { api } from '~/trpc/server'
import { SubscribeSection } from '~/features/subscribe-section/ui'
import { Container } from '~/lib/ui/container'

export default async function BlogPage() {
  const posts = await api.posts.getPosts()
  const tags = await api.posts.getTags()

  return (
    <Container className="py-8 md:py-16 max-w-5xl mx-auto space-y-12">
      {/* Carousel section */}
      <BlogCarousel posts={posts.slice(0, 4)} />
      {/* Tags Filter */}
      <TagsFilter tags={tags} />
      {/* Blog Posts Grid */}
      <PostsGrid posts={posts} />

      <SubscribeSection />
    </Container>
  )
}
