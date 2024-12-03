'use client'

import { ChevronRightIcon } from '@radix-ui/react-icons'
import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '~/lib/ui/components/button'
import { cn } from '~/lib/utils'

const carouselItems = [
  { title: 'Nové sezónne pečivo', image: '/images/asset-2.webp' },
  { title: 'Tajomstvo našej kávy', image: '/images/asset-2.webp' },
  { title: 'Workshopy pečenia', image: '/images/asset-2.webp' },
]

const BlogCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + carouselItems.length) % carouselItems.length)
  }

  return (
    <section>
      <div className="relative overflow-hidden rounded-lg aspect-video">
        {carouselItems.map((item, index) => (
          <div
            key={item.title + index.toString()}
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              index === currentSlide ? 'opacity-100 z-20' : 'opacity-0',
            )}
          >
            <Image
              loading="eager"
              decoding="sync"
              quality={70}
              src={item.image}
              alt={item.title}
              fill
              className="absolute inset-0 z-0 object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
                {item.title}
              </h2>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white z-20"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white z-20"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

export default BlogCarousel
