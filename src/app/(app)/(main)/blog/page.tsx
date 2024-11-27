import { BlogCarousel } from '~/features/blog-carousel/ui'
import { TagsFilter } from '~/features/tags-filter/ui'
import { Link } from '~/lib/ui/link'
import { api } from '~/trpc/server'

export default async function BlogPage() {
  const posts = await api.posts.getPosts()

  return (
    <>
      {/* Carousel section */}
      <BlogCarousel />
      {/* Tags Filter */}
      <TagsFilter />
      <h1>Blog</h1>
      <div className="grid place-content-center">
        <div>
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} className="">
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
