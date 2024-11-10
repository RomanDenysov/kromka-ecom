import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '~/lib/ui/components/button'
import { Card, CardContent } from '~/lib/ui/components/card'
import { cn } from '~/lib/utils'

const HeroGrid = () => {
  return (
    <div className="grid  grid-cols-2 grid-flow-row md:grid-cols-4 gap-3 md:gap-5">
      {/* BLOG CARD */}
      <Card className="col-span-2 group transition-all aspect-video md:aspect-square relative overflow-hidden grid place-content-center">
        <Image
          loading="eager"
          decoding="sync"
          quality={75}
          src={'/images/asset 1.jpg'}
          alt={'alt text'}
          fill
          priority
          className="z-0 transition brightness-90  group-hover:blur-[2px] group-hover:scale-[1.02] absolute object-cover object-center"
        />
        <CardContent className="z-10 size-full">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Link
            href={'/blog'}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'mt-2 px-2.5 border-2 font-semibold text-primary-foreground bg-transparent text-base md:text-lg group-hover:bg-accent transition group-hover:text-primary',
            )}
          >
            Citat
          </Link>
        </CardContent>
      </Card>
      {/* SHOP CARD */}
      <Card className="grid group transition-all place-content-center col-span-2 order-first md:order-none aspect-video row-span-2 relative overflow-hidden size-full">
        <Image
          loading="eager"
          decoding="sync"
          quality={75}
          src={'/images/asset 2.jpg'}
          alt={'alt text'}
          fill
          priority
          className="z-0 transition brightness-90  group-hover:blur-[2px] group-hover:scale-[1.02] absolute object-cover object-center"
        />
        <CardContent className="z-10 size-full">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Link
            href={'/shop'}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'mt-2 px-2.5 border-2 font-semibold text-primary-foreground bg-transparent text-base md:text-lg group-hover:bg-accent transition group-hover:text-primary',
            )}
          >
            Nakupovat
          </Link>
        </CardContent>
      </Card>

      {/* POSTS CARDS */}
      <Card className="grid place-content-center col-span-1 row-span-1 aspect-square relative overflow-hidden">
        <Image
          loading="eager"
          decoding="sync"
          quality={75}
          src={'/images/asset 3.jpg'}
          alt={'alt text'}
          fill
          priority
          className="z-0 absolute object-cover object-center"
        />

        <CardContent className="z-10 size-full">
          <h2 className="text-2xl font-bold text-primary-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Link
            href={'/blog'}
            className={cn(buttonVariants({ variant: 'outline' }), 'text-primary-foreground')}
          >
            Link
          </Link>
        </CardContent>
      </Card>

      <Card className="grid place-content-center col-span-1 row-span-1 aspect-square relative overflow-hidden">
        <Image
          loading="eager"
          decoding="sync"
          quality={75}
          src={'/images/asset 1.jpg'}
          alt={'alt text'}
          fill
          className="object-cover object-center"
        />
        <CardContent className="z-10 size-full">
          <h2 className="text-2xl font-bold text-primary-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Link
            href={'/blog'}
            className={cn(buttonVariants({ variant: 'outline' }), 'text-primary-foreground')}
          >
            Link
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default HeroGrid
