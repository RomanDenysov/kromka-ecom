import { BlogCarousel } from '~/features/blog-carousel/ui'
import { PostsGrid } from '~/features/posts-grid/ui'
import { TagsFilter } from '~/features/tags-filter/ui'
import { Link } from '~/lib/ui/link'
import { api } from '~/trpc/server'

export default async function BlogPage() {
  const posts = await api.posts.getPosts()
  const tags = await api.posts.getTags()

  return (
    <>
      {/* Carousel section */}
      <BlogCarousel posts={posts.slice(0, 4)} />
      {/* Tags Filter */}
      <TagsFilter tags={tags} />
      {/* Blog Posts Grid */}
      <PostsGrid posts={posts} />

      {/* <h1>Blog</h1>
      <div className="grid place-content-center">
        <div>
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} className="">
              {post.title}
            </Link>
          ))}
        </div>
      </div> */}
    </>
  )
}
