import { Suspense } from 'react'
import { CtaSection } from '~/features/cta-section/ui'
import { HeroSection } from '~/features/hero-section'
import { ProductsReel } from '~/features/products-reel/ui'
import { Container } from '~/lib/ui/container'
import { FeaturesSection } from '~/lib/ui/features-section'

export default function HomePage() {
  return (
    <Container className="pb-5 md:pb-8 space-y-5 md:space-y-10">
      {/* <EndSellingDialog /> */}
      <HeroSection />
      <FeaturesSection />
      {/* <HeroGrid /> */}
      {/* <Suspense>
        <ProductsList />
      </Suspense> */}
      <Suspense fallback={null}>
        <ProductsReel
          href
          title={'Náš chlieb a lakocinky'}
          query={{ limit: 8, category: ['Naše pečivo', 'Z našej produkcie'] }}
        />
      </Suspense>

      {/* <HomeActionsSection /> */}

      {/* <ProductsReel href={'/products'} title={'New products'} query={{ limit: 8 }} /> */}

      {/* <PostsReel href="/blog" title="Posledne posty" /> */}
      <CtaSection />
    </Container>
  )
}
