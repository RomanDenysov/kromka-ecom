'use client'

import { Link } from '~/lib/ui/link'
import Image from 'next/image'
import { cn } from '~/lib/utils'
import { TextMorph } from '~/lib/ui/motion/text-morph'
import { useState } from 'react'

type Props = {
  className?: string
}

const ShopCard = ({ className }: Props) => {
  const [text, setText] = useState('CHLEBA, LAKOCINKY A KÁVA')
  return (
    <Link
      onMouseEnter={() => setText('Nakupovať v Kromke')}
      onMouseLeave={() => setText('CHLEBA, LAKOCINKY A KÁVA')}
      href={'/shop'}
      className={cn(
        'group relative rounded-lg shadow-sm grid aspect-video size-full sm:content-center justify-items-start content-end overflow-hidden transition-all',
        className,
      )}
    >
      <Image
        loading="eager"
        decoding="sync"
        quality={70}
        src={'/images/shop-pic.jpg'}
        alt={'alt text'}
        fill
        priority
        className="absolute z-0 object-cover object-center brightness-90 transition-all sm:group-hover:scale-[1.02] sm:group-hover:blur-[2px]"
      />
      <div className="p-4 sm:p-6 z-10 space-y-1 sm:space-y-2.5">
        <TextMorph className="font-black uppercase text-3xl sm:text-4xl xl:text-5xl text-primary-foreground">
          {text}
        </TextMorph>
      </div>
    </Link>
  )
}

export default ShopCard