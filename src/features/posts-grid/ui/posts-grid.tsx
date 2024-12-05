import { ClockIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '~/lib/ui/components/badge'
import { Card, CardContent } from '~/lib/ui/components/card'
import { Heading } from '~/lib/ui/heading'
import { Link } from '~/lib/ui/link'
import { Post, Tag } from '@payload-types'

type Props = {
  posts: Post[]
}

const PostsGrid = ({ posts }: Props) => {
  return (
    <section className="space-y-6">
      <Heading title="Posledné články" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => {
          const postBanner =
            typeof post.banner !== 'string' ? (post.banner.url as string) : '/placeholder.png'

          return (
            <Card key={i} className="flex flex-col overflow-hidden">
              <Link href={`/blog/${post.slug}`} className="flex-grow">
                <div className="relative aspect-video overflow-hidden ">
                  <Image
                    src={postBanner}
                    alt={post.title}
                    fill
                    className="absolute inset-0 z-0 object-cover transition-transform hover:scale-105 object-center"
                  />
                </div>
                <CardContent className="p-4">
                  {/* TODO: Add post tags */}
                  <div className="flex flex-wrap mb-2">
                    {post.tags?.map((tag) => {
                      const postTag = tag as Tag

                      return (
                        <Badge key={postTag.id} variant="outline" className="mr-1.5">
                          {postTag.title}
                        </Badge>
                      )
                    })}
                  </div>

                  <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClockIcon className="w-4 h-4" />3 min čítania
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                        <ThumbsUpIcon className="w-4 h-4" />
                        <span>{5}</span>
                      </button>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquareIcon className="w-4 h-4" />
                        <span>{5}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default PostsGrid
