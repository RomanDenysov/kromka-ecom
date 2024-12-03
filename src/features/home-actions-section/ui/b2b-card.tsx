import Image from 'next/image'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'
import { cn } from '~/lib/utils'

type Props = {
  className?: string
}

const B2BCard = ({ className }: Props) => {
  return (
    <div className={cn('relative aspect-auto rounded-lg overflow-hidden', className)}>
      <Image
        src={'/images/asset-1.webp'}
        alt={'alt text'}
        fill
        className="rounded-lg object-cover object-center"
      />
    </div>
  )
}

export default B2BCard
