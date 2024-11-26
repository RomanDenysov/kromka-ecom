import { HeroGrid } from '~/features/hero-grid/ui'
import { HomeActionsCard } from '~/features/home-actions-card/ui'
import { PostsReel } from '~/features/posts-reel/ui'
import { ProductsReel } from '~/features/products-reel/ui'
import { SubscribeSection } from '~/features/subscribe-section/ui'
import { Container } from '~/lib/ui/container'

export default function HomePage() {
  return (
    <Container className="py-5 md:py-10 space-y-5">
      <HeroGrid />

      {/* PRODUCTS REEL */}
      <ProductsReel href={'/shop'} title={'Nase chlieba a lakocinky'} query={{ limit: 8 }} />

      {/* NEWEST POST & B2B */}
      <HomeActionsCard />

      {/* PRODUCTS REEL */}
      <ProductsReel href={'/shop'} title={'New products'} query={{ limit: 8 }} />

      {/* SUBSCRIBE SECTIONS */}
      <SubscribeSection />

      {/* POSTS REEL */}
      <PostsReel href="/blog" title="Posledne posty" />
    </Container>
  )
}
