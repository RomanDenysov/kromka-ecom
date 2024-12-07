'use client'

import { ChevronRightIcon } from 'lucide-react'
import { useCallback } from 'react'
import { Heading } from '~/lib/ui/heading'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import { api } from '~/trpc/react'
import PostsListing from './posts-listing'

type Props = {
  title?: string
  subtitle?: string
  href?: string
  className?: string
}

const PostsReel = ({ title, subtitle, href, className }: Props) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    api.posts.infinitePosts.useInfiniteQuery(
      {
        query: {
          limit: 10,
          status: 'published',
          sort: [{ field: 'createdAt', direction: 'desc' }],
        },
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
      },
    )
  const posts = data?.pages.flatMap((page) => page.items) ?? []

  console.log('POSTS', posts)

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (!posts || posts.length === 0) return null

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <article className={cn('py-10', className)} aria-label="Posts reel">
      <div className="mb-4 md: flex md:flex-grow md:items-center md:justify-between">
        {title && <Heading title={title} subtitle={subtitle} className="w-full" />}
        {href ? (
          <Link
            href={href}
            className="hidden capitalize items-center justify-end gap-x-1 font-medium text-red-600 text-sm hover:text-red-500 hover:underline md:inline-flex"
            aria-label="Načítať blog"
          >
            čítať
            <span aria-hidden="true">
              <ChevronRightIcon size={16} />
            </span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex w-full items-center">
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
              <PostsListing key={post.id} index={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostsReel
