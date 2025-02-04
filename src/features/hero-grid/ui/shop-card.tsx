'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { TextMorph } from '~/lib/ui/motion/text-morph'
import { cn } from '~/lib/utils'

type Props = {
  className?: string
}

const ShopCard = ({ className }: Props) => {
  const [text, setText] = useState('CHLEBA, LAKOCINKY A KÁVA')
  return (
    <Link
      onMouseEnter={() => setText('Nakupovať v Kromke')}
      onMouseLeave={() => setText('CHLEBA, LAKOCINKY A KÁVA')}
      href={'/products'}
      prefetch={true}
      className={cn(
        'group relative rounded-lg shadow grid aspect-video size-full sm:content-center justify-items-start content-end overflow-hidden transition-all',
        className,
      )}
    >
      <Image
        loading="eager"
        decoding="sync"
        quality={70}
        src={'/images/shop-pic.webp'}
        alt={'Shop banner Pekaren Kromka'}
        fill
        priority={true}
        className="absolute z-0 object-cover object-center brightness-90 transition-transform sm:group-hover:scale-[1.02]"
      />
      <div className="absolute size-full inset-0 bg-black/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
      <div className="p-4 sm:p-6 z-10 space-y-1 sm:space-y-2.5">
        <TextMorph className="font-black uppercase text-3xl sm:text-4xl xl:text-5xl text-primary-foreground dark:text-primary">
          {text}
        </TextMorph>
      </div>
    </Link>
  )
}

export default ShopCard
