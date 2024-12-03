import Image from 'next/image'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'
import { Link } from '~/lib/ui/link'
import { cn } from '~/lib/utils'

type Props = {
  className?: string
}

const PostCard = ({ className }: Props) => {
  return (
    <Link href={'#'} className={cn('overflow-hidden aspect-auto relative rounded-lg', className)}>
      <Image
        fill
        src={'/images/asset-1.webp'}
        alt={'alt text'}
        className="rounded-lg object-cover object-center"
      />
      <div className="absolute inset-0">
        <h2 className="text-primary-foreground font-bold text-3xl flex items-center justify-center size-full px-4">
          Test
        </h2>
      </div>
    </Link>
  )
}

export default PostCard
