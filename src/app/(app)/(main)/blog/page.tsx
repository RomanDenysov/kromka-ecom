import { Link } from '~/lib/ui/link'
import { api } from '~/trpc/server'

export default async function BlogPage() {
  const posts = await api.posts.getPosts()

  return (
    <div className="grid place-content-center">
      <h1>Blog</h1>
      <div>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} className="">
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
