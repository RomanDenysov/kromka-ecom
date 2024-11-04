import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "~/lib/ui/components/button"
import { Card, CardContent } from "~/lib/ui/components/card"
import { cn } from "~/lib/utils"

const HeroGrid = () => {
  return (
    <div className="grid grid-cols-2 grid-flow-row md:grid-cols-4 gap-3 md:gap-5">
      <Card className="col-span-2 aspect-video md:aspect-square relative overflow-hidden grid place-content-center">
        <Image
          src={'/images/asset 1.jpg'}
          alt={'alt text'}
          fill
          priority
          quality={100}
          className="z-0 absolute object-cover object-center"
        />
        <CardContent className="z-10 size-full">
          <h2 className="text-2xl font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Link href={'/blog'} className={cn(buttonVariants({ variant: 'outline' }))}>
            Link
          </Link>
        </CardContent>
      </Card>
      <Card className="grid place-content-center col-span-2 order-first md:order-none aspect-video row-span-2 relative overflow-hidden size-full">
        <Image
          src={'/images/asset 2.jpg'}
          alt={'alt text'}
          fill
          priority
          quality={100}
          className="z-0 absolute object-cover object-center"
        />
        <CardContent className="z-10 size-full">
          <h2 className="text-2xl font-bold text-primary-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Link href={'/blog'} className={cn(buttonVariants({ variant: 'outline' }))}>
            Link
          </Link>
        </CardContent>
      </Card>
      <Card className="grid place-content-center col-span-1 row-span-1 aspect-square relative overflow-hidden">

        <Image
          src={'/images/asset 3.jpg'}
          alt={'alt text'}
          fill
          priority
          quality={100}
          className="z-0 absolute object-cover object-center"
        />

        <CardContent className="z-10 size-full">
          <h2 className="text-2xl font-bold text-primary-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Link href={'/blog'} className={cn(buttonVariants({ variant: 'outline' }), 'text-primary-foreground')}>
            Link
          </Link>
        </CardContent>
      </Card>

      <Card className="grid place-content-center col-span-1 row-span-1 aspect-square relative overflow-hidden">
        <Image
          src={'/images/asset 1.jpg'}
          alt={'alt text'}
          fill
          className="object-cover object-center"
        />
        <CardContent className="z-10 size-full">
          <h2 className="text-2xl font-bold text-primary-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Link href={'/blog'} className={cn(buttonVariants({ variant: 'outline' }), 'text-primary-foreground')}>
            Link
          </Link>
        </CardContent>
      </Card>
    </div >
  )
}

export default HeroGrid
