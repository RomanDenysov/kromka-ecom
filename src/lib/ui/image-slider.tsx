'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import type SwiperType from 'swiper'
import { Pagination } from 'swiper/modules'
import { cn } from '~/lib/utils'

interface ImageSliderProps {
  urls: string[]
  brightness?: boolean
}

export const ImageSlider = ({ urls, brightness = true }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  })

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      })
    })
  }, [swiper, urls])

  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
  const inactiveStyles = 'hidden text-gray-400'

  return (
    <div className="group group relative aspect-square overflow-hidden rounded-md bg-zinc-100 shadow-md">
      <div className="absolute inset-0 z-10 opacity-0 transition group-hover:opacity-100">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            swiper?.slideNext()
          }}
          className={cn(activeStyles, 'right-3 transition', {
            [inactiveStyles]: slideConfig.isEnd,
            'text-primary-800 opacity-100 hover:bg-primary-300': !slideConfig.isEnd,
          })}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />{' '}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            swiper?.slidePrev()
          }}
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'text-primary/80 opacity-100 hover:bg-primary/30': !slideConfig.isBeginning,
          })}
          aria-label="previous image"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />{' '}
        </button>
      </div>

      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        modules={[Pagination]}
        slidesPerView={1}
        className="h-full w-full"
      >
        {urls.map((url) => (
          <SwiperSlide key={`image-${url}`} className="-z-10 relative h-full w-full">
            <Image
              loading="eager"
              decoding="sync"
              quality={65}
              width={500}
              height={500}
              className={cn(
                '-z-10 h-full w-full object-cover object-center transition delay-100 duration-200 group-hover:scale-[1.03]',
                brightness && 'group-hover:brightness-90',
              )}
              src={url}
              priority
              alt={`Product image: ${url}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
