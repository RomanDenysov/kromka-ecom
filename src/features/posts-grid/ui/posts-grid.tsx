import { ClockIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '~/lib/ui/components/badge'
import { Card, CardContent } from '~/lib/ui/components/card'
import { Heading } from '~/lib/ui/heading'
import { Link } from '~/lib/ui/link'

const PostsGrid = () => {
  return (
    <section className="space-y-6">
      <Heading title="Posledné články" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col overflow-hidden">
            <Link href={'#'} className="flex-grow">
              <div className="relative aspect-video overflow-hidden ">
                <Image
                  src={'/images/asset-1.webp'}
                  alt={'Blog post'}
                  fill
                  className="absolute inset-0 z-0 object-cover transition-transform hover:scale-105 object-center"
                />
              </div>
              <CardContent className="p-4">
                {/* TODO: Add post tags */}
                <Badge variant={'outline'} className="mb-2">
                  Kava
                </Badge>
                <h3 className="text-lg font-semibold line-clamp-2">Prečo je naša káva výnimočná</h3>
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
        ))}
      </div>
    </section>
  )
}

export default PostsGrid
