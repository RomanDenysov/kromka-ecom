import { BlogCard, HeroCard, ShopCard } from '~/features/hero-grid/ui'

const HeroGrid = () => {
  return (
    <section className="grid grid-flow-row grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {/* BLOG CARD */}
      <BlogCard className="col-span-2" />
      {/* SHOP CARD */}
      <ShopCard className="col-span-2 row-span-2 order-first md:order-none" />

      {/* POSTS CARDS */}
      <HeroCard
        className="col-span-1 row-span-1"
        title="SPOLUPRÁCA"
        alternativeTitle="Zistiť viac"
        href="/"
        image="/images/asset-4.jpg"
      />

      <HeroCard
        className="col-span-1 row-span-1"
        title="O KROMKE"
        alternativeTitle="Náš príbeh"
        href="/about"
        image="/images/asset-1.jpg"
      />
    </section>
  )
}

export default HeroGrid
