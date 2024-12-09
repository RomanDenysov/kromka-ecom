import { BlogCard, HeroCard, ShopCard } from '~/features/hero-grid/ui'

const HeroGrid = () => {
  return (
    <section className="grid grid-flow-row grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {/* BLOG CARD */}
      <BlogCard className="col-span-2 border" />
      {/* SHOP CARD */}
      <ShopCard className="col-span-2 border row-span-2 order-first md:order-none" />

      {/* POSTS CARDS */}
      <HeroCard
        className="col-span-1 row-span-1 border"
        title="SPOLUPRÁCA"
        alternativeTitle="Zistiť viac"
        href="/"
        image="/images/spolupraca-banner.webp"
      />

      <HeroCard
        className="col-span-1 row-span-1 border"
        title="O KROMKE"
        alternativeTitle="Náš príbeh"
        href="/about"
        image="/images/about-2.webp"
      />
    </section>
  )
}

export default HeroGrid
