'use client'

import { Link } from '~/lib/ui/link'
import { cn } from '~/lib/utils'
import Image from 'next/image'
import { TextMorph } from '~/lib/ui/motion/text-morph'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
  href: string
  title: string
  alternativeTitle: string
  image: string
}

const ActionCard = ({ className, href, title, alternativeTitle, image }: Props) => {
  const [text, setText] = useState(title)

  return (
    <Link
      href={href}
      onMouseEnter={() => setText(alternativeTitle)}
      onMouseLeave={() => setText(title)}
      className={cn(
        'overflow-hidden shadow-sm group aspect-auto relative rounded-lg transition-all',
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
        <TextMorph className="font-black truncate uppercase text-lg sm:text-2xl text-primary-foreground">
          {text}
        </TextMorph>
      </div>
    </Link>
  )
}

export default ActionCard
