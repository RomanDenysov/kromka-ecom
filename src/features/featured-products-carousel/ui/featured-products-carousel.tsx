'use client'

import Image from 'next/image'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardContent } from '~/lib/ui/components/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/lib/ui/components/carousel'

const dummyProducts = [
  {
    title: 'Product 1',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 2',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 3',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 4',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 5',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 6',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 7',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 8',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 9',
    image: '/images/asset-1.jpg',
  },
  {
    title: 'Product 10',
    image: '/images/asset-1.jpg',
  },
]

const FeaturedProductsCarousel = () => {
  return (
    // <Carousel className="w-full">
    //   <CarouselContent className="ml-1">
    //     {dummyProducts.map((product, index) => (
    //       <CarouselItem
    //         key={product.title + index.toString()}
    //         className="md:basis-1/3 lg:basis-1/5"
    //       >
    //         <Card className="relative min-h-40">
    //           <Image
    //             src={product.image}
    //             alt={product.title}
    //             fill
    //             className="rounded-lg object-cover object-center"
    //           />
    //           <CardContent>
    //             <h2 className="text-lg font-bold">{product.title}</h2>
    //           </CardContent>
    //         </Card>
    //       </CarouselItem>
    //     ))}
    //   </CarouselContent>
    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>
    //
    <></>
  )
}

export default FeaturedProductsCarousel
