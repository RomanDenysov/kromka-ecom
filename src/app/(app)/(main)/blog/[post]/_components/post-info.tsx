'use client'

import type { Post } from '@payload-types'
import { CalendarIcon, ClockIcon, HeartIcon, Share2Icon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/lib/ui/components/avatar'
import { Button } from '~/lib/ui/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/lib/ui/components/tooltip'
import ShareButton from '~/lib/ui/share-button'
import { getNameInitials } from '~/lib/utils'

const PostInfo = ({ post }: { post: Post }) => {
  const [postAuthor, postAuthorAvatar] =
    typeof post.authors?.[0] !== 'string'
      ? [post.authors?.[0]?.name, post.authors?.[0]?.image]
      : [null, null]

  const author = {
    name: postAuthor,
    avatar: postAuthorAvatar,
  }

  const handleLike = () => {
    console.log('Liked post')
  }

  const likes = 5
  const hasLiked = false

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar className="rounded-full border size-10 bg-white">
          <AvatarImage
            src={author.avatar || '/user-icon.png'}
            className="object-cover rounded-full"
            alt={author.name || 'Post Author'}
          />
          <AvatarFallback delayMs={600}>{getNameInitials(author.name || '')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{author.name}</p>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {/* TODO: Add post publish date */}
            {new Date(post.createdAt).toLocaleDateString('sk-SK')}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-500">
          <ClockIcon className="mr-1 h-4 w-4" />
          {/* TODO: Add post reading time */}
          {/* 3 min read */}
          {post.readingTime} min čítania
        </div>
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleLike}>
                <HeartIcon
                  className={`mr-2 h-4 w-4 ${hasLiked ? 'fill-current text-red-500' : ''}`}
                />
                {likes}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{hasLiked ? 'Unlike' : 'Like'} this post</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ShareButton post={post} /> */}
      </div>
    </div>
  )
}

export default PostInfo
