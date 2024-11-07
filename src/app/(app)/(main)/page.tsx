import { HeroGrid } from '~/features/hero-grid/ui'
import { ProductsReel } from '~/features/products-reel/ui'
import { Container } from '~/lib/ui/container'

export default function HomePage() {
  return (
    <Container className="py-5 md:py-10 space-y-5">
      <HeroGrid />

      <ProductsReel href={'/shop'} title={'New products'} query={{ limit: 8 }} />
    </Container>
  )
}
