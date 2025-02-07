import type { Post } from '@payload-types'
import { PostCard } from '~/features/post-card/ui'

const PostsGrid = (props: { posts: Post[] }) => {
  const { posts } = props

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post, i) => (
        <PostCard
          post={post}
          index={i}
          key={post.id}
          className={posts.length > 3 && i === 0 ? 'col-span-2 row-span-2' : ''}
        />
      ))}
    </section>
  )
}

export default PostsGrid
