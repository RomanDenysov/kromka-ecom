import { Suspense } from 'react'
import { CtaSection } from '~/features/cta-section/ui'
import { EndSellingDialog } from '~/features/end-selling-dialog/ui'
import { HeroGrid } from '~/features/hero-grid/ui'
import { HeroSection } from '~/features/hero-section'
import { HomeActionsSection } from '~/features/home-actions-section/ui'
import { PostsReel } from '~/features/posts-reel/ui'
import { ProductsReel } from '~/features/products-reel/ui'
import { Container } from '~/lib/ui/container'
import { FeaturesSection } from '~/lib/ui/features-section'

export default async function HomePage() {
  return (
    <Container className="py-5 md:py-8 z-10 space-y-5 md:space-y-10">
      {/* <EndSellingDialog /> */}
      <HeroSection />
      <FeaturesSection />
      {/* <HeroGrid /> */}

      {/* PRODUCTS REEL */}
      <Suspense>
        <ProductsReel
          href={'/products'}
          title={'Náš chlieb a lakocinky'}
          query={{ limit: 8, category: ['Naše pečivo', 'Z našej produkcie'] }}
        />
      </Suspense>

      {/* NEWEST POST & B2B */}
      {/* <HomeActionsSection /> */}

      {/* PRODUCTS REEL */}
      {/* <ProductsReel href={'/products'} title={'New products'} query={{ limit: 8 }} /> */}

      {/* POSTS REEL */}
      {/* <PostsReel href="/blog" title="Posledne posty" /> */}
      {/* SUBSCRIBE SECTIONS */}
      <CtaSection />
    </Container>
  )
}
