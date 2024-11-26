import Image from 'next/image'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'

export default function SubscribeSection() {
  return (
    <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
      <Image
        src={'/images/asset-1.jpg'}
        alt={'alt text'}
        fill
        className="rounded-lg object-cover object-center"
      />
    </AspectRatio>
  )
}
