import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { CtaSection } from '~/features/cta-section/ui'
import { HeroSection } from '~/features/hero-section'
import { MarketingBanner } from '~/features/marketing-banner/ui'
import { ProductsReel, ProductsReelLoading } from '~/features/products-reel/ui'
import { Container } from '~/lib/ui/container'
import { FeaturesSection } from '~/lib/ui/features-section'
import { createMetadata } from '~/lib/utils/metadata'
import { api } from '~/trpc/server'

const meta = {
  title: 'Veľká noc z Kromky',
  // description: 'Pekáreň Kromka je remeselná pekáreň s dlhoročnou tradíciou. Naše pečivo a chlieb vyrábame s láskou, používame kvalitné suroviny a tradičné postupy. Prinášame vám čerstvé pekárenské výrobky priamo z našej pece každý deň.',
  description: 'Aj tento rok bude veľkonočný stôl plný lakociniek. Nachystáme vám čerstvý chlieb, tradičnú pasku a ďalšie veľkonočné špecialíty z remeselnej pekárne Kromka, bez ktorých by sviatky neboli úplné.',
  image: 'images/velka-noc.jpeg',
}

export const metadata: Metadata = createMetadata(meta)

export default function HomePage() {

  const query = { limit: 8, category: ['Naše pečivo', 'Z našej produkcie'] }

  void api.products.infiniteProducts.prefetchInfinite({ query })

  return (
    <Container className="pb-5 md:pb-8 space-y-5 md:space-y-10">
      <HeroSection />
      <MarketingBanner
        href="/products"
        title="Užite si Veľkú noc z Kromky!"
        description="Aj tento rok bude veľkonočný stôl plný lakociniek. Nachystáme vám chlieb, pasku a ďalšie veľkonočné jedlá, bez ktorých by to nebolo ono."
        image="/images/velka-noc.jpeg"
      />
      <FeaturesSection />
      <Suspense fallback={<ProductsReelLoading query={query} />}>
        <ErrorBoundary fallback={<ProductsReelLoading query={query} />}>
          <ProductsReel
            href
            title={'Náš chlieb a lakocinky'}
            query={query}
          />
        </ErrorBoundary>
      </Suspense>
      <CtaSection />
    </Container>
  )
}
