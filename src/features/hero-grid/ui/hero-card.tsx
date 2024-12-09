'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '~/lib/utils'
import { useState } from 'react'
import { TextMorph } from '~/lib/ui/motion/text-morph'

type Props = {
  className?: string
  title: string
  alternativeTitle: string
  href: string
  image: string
}

const HeroCard = ({ className, title, alternativeTitle, href, image }: Props) => {
  const [text, setText] = useState(title)

  return (
    <Link
      href={href}
      onMouseEnter={() => setText(alternativeTitle)}
      onMouseLeave={() => setText(title)}
      className={cn(
        'group relative shadow rounded-lg grid aspect-square overflow-hidden transition-all',
        className,
      )}
    >
      <Image
        loading="eager"
        decoding="sync"
        quality={70}
        src={image}
        alt={`${title} banner Kromka`}
        fill
        priority
        className="absolute z-0 object-cover object-center brightness-90 transition-transform sm:group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 size-full grid place-content-center p-4 transition-all group-hover:bg-black/10 group-hover:backdrop-blur-[2px]">
        <TextMorph className="font-black truncate uppercase text-lg sm:text-2xl text-primary-foreground dark:text-primary">
          {text}
        </TextMorph>
      </div>
    </Link>
  )
}

export default HeroCard
