import Image from 'next/image'
import Link from 'next/link'
import { cn } from '../utils'

export function FeaturesSection() {
  return (
    <section>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-left font-bold text-3xl tracking-tight">{'Čo pre vás mame'}</h2>
          <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight md:text-xl font-medium text-muted-foreground">
            {'Vytvorte si svoje Kromka konto a objavte všetky naše chutné produkty'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            image="/images/asset-1.webp"
            href="/products"
            title="E-shop"
            description="Prehliadajte si náš široký sortiment produktov online"
            className="lg:col-span-2 lg:aspect-auto"
          />
          <FeatureCard
            image="/images/asset-2.webp"
            href="/blog"
            title="Blog"
            description="Články, novinky a zaujímavosti zo sveta pekárstva"
          />
          <FeatureCard
            image="/images/asset-3.webp"
            href="/b2b"
            title="B2B Riešenia"
            description="Špeciálne ponuky a služby pre firmy a podnikateľov"
          />
          <FeatureCard
            image="/images/asset-4.webp"
            href="/spolupraca"
            title="Spolupráca"
            description="Staňte sa naším obchodným partnerom alebo dodávateľom"
            className="lg:col-span-2 lg:aspect-auto"
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard(props: {
  href: string
  title: string
  description: string
  image: string
  className?: string
}) {
  const { href, title, description, image, className } = props
  return (
    <Link
      prefetch
      href={href}
      className={cn(
        'flex aspect-square group flex-col justify-between rounded-md overflow-hidden bg-muted p-6 relative shadow-lg',
        className,
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="absolute inset-0 object-cover object-center z-0 md:group-hover:scale-105 transition-all duration-300"
      />
      {/* Gradient overlay for top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-[1]" />
      <h3 className="z-10 text-2xl font-bold text-secondary">{title}</h3>
      <p className="z-10 text-muted max-w-xl text-left font-medium text-lg leading-relaxed tracking-tight md:text-xl">
        {description}
      </p>
    </Link>
  )
}
