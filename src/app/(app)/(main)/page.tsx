import { HeroGrid } from '~/features/hero-grid/ui'
import { HomeActionsSection } from '~/features/home-actions-section/ui'
import { PostsReel } from '~/features/posts-reel/ui'
import { ProductsReel } from '~/features/products-reel/ui'
import { SubscribeSection } from '~/features/subscribe-section/ui'
import { Container } from '~/lib/ui/container'

export default function HomePage() {
  return (
    <Container className="py-5 md:py-8 space-y-5 md:space-y-10">
      <HeroGrid />

      {/* PRODUCTS REEL */}
      <ProductsReel href={'/shop'} title={'Náš chlieb a lakocinky'} query={{ limit: 8 }} />

      {/* NEWEST POST & B2B */}
      <HomeActionsSection />

      {/* PRODUCTS REEL */}
      {/* <ProductsReel href={'/shop'} title={'New products'} query={{ limit: 8 }} /> */}

      {/* POSTS REEL */}
      <PostsReel href="/blog" title="Posledne posty" />
      {/* SUBSCRIBE SECTIONS */}
      <SubscribeSection />
    </Container>
  )
}
