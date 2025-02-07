import { Post, Tag } from '@payload-types'
import { formatDate } from 'date-fns'
import { ClockIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '~/lib/ui/components/badge'
import { cn } from '~/lib/utils'

export function PostCard(props: { post: Post; index: number; className?: string }) {
  const { post, index, className } = props
  const postBanner =
    typeof post.banner !== 'string' ? (post.banner.url as string) : '/placeholder.png'

  return (
    <Link prefetch={true} href={`/blog/${post.slug}`} className={cn('group', className)}>
      <div className="relative aspect-square overflow-hidden rounded-md size-full">
        <Image
          src={postBanner}
          alt={post.title}
          fill
          className="absolute inset-0 z-0 object-cover object-center transition-transform duration-300 md:group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
        <div className="absolute z-10 inset-0 from-black/95 via-black/70 to-black/10 bg-gradient-to-t"></div>
        <div className="size-full flex flex-col items-start justify-end p-4 z-20">
          {/* TODO: Add post tags */}
          <div className="flex flex-wrap mb-2">
            {(post.tags as Tag[]).map((tag) => (
              <Badge key={tag.id} variant="outline" className="mr-1.5 z-20 text-white">
                {tag.title}
              </Badge>
            ))}
          </div>

          <h3 className="text-lg z-20 font-semibold text-white line-clamp-2">{post.title}</h3>
          <div className="flex z-20 w-full items-center justify-between mt-2">
            <span className="text-white z-20 flex-grow">
              {formatDate(post.publishedAt!, 'dd.MM.yyyy')}
            </span>

            <span className="flex items-center gap-2 text-sm text-white/80">
              <ClockIcon className="size-5" />
              {post.readingTime} min čítania
            </span>
            {/* <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                        <ThumbsUpIcon className="w-4 h-4" />
                        <span>{5}</span>
                      </button>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquareIcon className="w-4 h-4" />
                        <span>{5}</span>
                      </div>
                    </div> */}
          </div>
        </div>
      </div>
    </Link>
  )
}
