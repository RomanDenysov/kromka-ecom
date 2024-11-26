'use client'

import { Link } from '~/lib/ui/link'
import { Post } from '@payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from '~/lib/ui/components/skeleton'
import Image from 'next/image'

type Props = {
  post: Post | null
  index: number
}

const PostsListing = ({ post, index }: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)
    return () => clearTimeout(timer)
  }, [index])

  if (!post || !isVisible) return <PostPlaceholder />

  const bannerImage = typeof post.banner !== 'string' ? post.banner.url! : post.banner

  return (
    <div className="group/main invisible h-full w-full cursor-pointer">
      <div className="flex w-full flex-col">
        <Link
          href={{
            pathname: `/blog/${post.slug}`,
          }}
          className="aspect-square rounded-lg bg-accent relative"
        >
          <Image
            loading="eager"
            decoding="sync"
            quality={65}
            src={bannerImage}
            alt={post.title}
            fill
            className="size-full absolute inset-0 rounded-lg object-cover object-center shadow-md"
          />
          <h4 className="absolute truncate text-nowrap font-medium text-primary text-sm hover:overflow-visible hover:text-clip">
            {post.title}
          </h4>
        </Link>
      </div>
    </div>
  )
}

const PostPlaceholder = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-accent">
        <Skeleton className="size-full z-0" />
        <Skeleton className="absolute inset-x-2 bottom-2 z-10" />
      </div>
    </div>
  )
}

PostsListing.displayName = 'PostsListing'

export default PostsListing
