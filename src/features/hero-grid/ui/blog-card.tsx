'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Link } from '~/lib/ui/link'
import { TextMorph } from '~/lib/ui/motion/text-morph'
import { cn } from '~/lib/utils'

type Props = {
  className?: string
}

const BlogCard = ({ className }: Props) => {
  const [text, setText] = useState('KROMKA BLOG')

  return (
    <Link
      href={'/blog'}
      onMouseEnter={() => setText('Čítať')}
      onMouseLeave={() => setText('KROMKA BLOG')}
      className={cn(
        'group relative shadow-sm rounded-lg grid aspect-video sm:content-center content-end justify-items-start overflow-hidden transition-all md:aspect-square',
        className,
      )}
    >
      <Image
        loading="eager"
        decoding="sync"
        quality={70}
        src={'/images/blog-pic.jpg'}
        alt={'pekaren kromka blog banner'}
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

export default BlogCard