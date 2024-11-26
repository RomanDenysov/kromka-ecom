import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '~/lib/ui/components/button'
import { Card, CardContent } from '~/lib/ui/components/card'
import { cn } from '~/lib/utils'
import { BlogCard, ShopCard } from '~/features/hero-grid/ui'

const HeroGrid = () => {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {/* BLOG CARD */}
      <BlogCard className="col-span-2" />
      {/* SHOP CARD */}
      <ShopCard className="col-span-2 row-span-2 order-first md:order-none" />

      {/* POSTS CARDS */}
      <Card className="relative col-span-1 row-span-1 grid aspect-square place-content-center overflow-hidden">
        <Image
          loading="eager"
          decoding="sync"
          quality={75}
          src={'/images/asset-3.jpg'}
          alt={'alt text'}
          fill
          priority
          className="absolute z-0 object-cover object-center"
        />

        <CardContent className="z-10 size-full">
          <Link
            href={'/blog'}
            className={cn(buttonVariants({ variant: 'outline' }), 'text-primary-foreground')}
          >
            SPOLUPRÁCA
          </Link>
        </CardContent>
      </Card>

      <Card className="relative col-span-1 row-span-1 grid aspect-square place-content-center overflow-hidden">
        <Image
          loading="eager"
          decoding="sync"
          quality={75}
          src={'/images/asset-1.jpg'}
          alt={'alt text'}
          fill
          className="object-cover object-center"
        />
        <CardContent className="z-10 size-full">
          <Link
            href={'/blog'}
            className={cn(buttonVariants({ variant: 'outline' }), 'text-primary-foreground')}
          >
            O NÁS
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default HeroGrid
