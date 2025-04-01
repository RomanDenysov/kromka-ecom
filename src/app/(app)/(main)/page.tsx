import { Suspense } from 'react'
import { CtaSection } from '~/features/cta-section/ui'
import { HeroSection } from '~/features/hero-section'
import { MarketingBanner } from '~/features/marketing-banner/ui'
import { ProductsReel } from '~/features/products-reel/ui'
import { Container } from '~/lib/ui/container'
import { FeaturesSection } from '~/lib/ui/features-section'
export default function HomePage() {
  return (
    <Container className="pb-5 md:pb-8 space-y-5 md:space-y-10">
      {/* <EndSellingDialog /> */}
      <HeroSection />
      <MarketingBanner
        href="/products"
        title="Užite si Veľkú noc z Kromky!"
        description="Aj tento rok bude veľkonočný stôl plný lakociniek. Nachystáme vám chlieb, pasku a ďalšie veľkonočné jedlá, bez ktorých by to nebolo ono."
        image="/images/velka-noc.jpeg"
      />
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
