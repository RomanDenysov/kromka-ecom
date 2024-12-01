import { Suspense } from 'react'
import { FeaturedProductsCarousel } from '~/features/featured-products-carousel/ui'

export default async function StorePage() {
  return (
    <Suspense>
      <FeaturedProductsCarousel />
    </Suspense>
  )
}
