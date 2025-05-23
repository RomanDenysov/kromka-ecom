import { FacebookIcon, InstagramIcon, MailIcon, PinIcon } from 'lucide-react'
import Image from 'next/image'
import { Metadata } from 'next/types'
import { Alert, AlertDescription } from '~/lib/ui/components/alert'
import { Button } from '~/lib/ui/components/button'
import { Card } from '~/lib/ui/components/card'
import { Container } from '~/lib/ui/container'
import { prodUrl } from '~/lib/utils'
import { JsonLd, WebSite, WithContext, createOrganizationSchema, createSchemaUrl } from '~/lib/utils/json-ld'
import { createMetadata } from '~/lib/utils/metadata'

const locations = [
  {
    city: 'Prešov',
    addresses: ['ul. 17. novembra 104', 'Galéria na Hlavnej 53'],
  },
  {
    city: 'Košice',
    addresses: [
      'Kuzmányho 1, vedľa kaviarne Nico',
      'Masarykova 6, aj s malou terasou v tieni stromov',
    ],
  },
]

const meta = {
  title: 'O nás',
  description:
    'Pekáreň Kromka - remeselná pekáreň založená v roku 2020 v Prešove. Ponúkame čerstvé kváskové pečivo, koláče a kávu. Nájdete nás v Prešove a Košiciach.',
  image: 'images/about-1.webp',
  canonicalUrl: 'about',
}

const jsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: meta.title,
  description: meta.description,
  image: `${prodUrl}${meta.image}`,
  url: createSchemaUrl(new URL('/about', prodUrl)),
  publisher: createOrganizationSchema(prodUrl)
}

export const metadata: Metadata = createMetadata(meta)

export default function Page() {
  return (
    <>
      <JsonLd code={jsonLd} />
      <Container className="py-8 md:py-16 max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Náš príbeh</h1>
          <p className="text-xl text-muted-foreground">
            Chleba, lakocinky a káva. Tri základné piliére remeselnej pekárne Kromka.
          </p>
        </div>

        {/* Main Story Card */}
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h2 className="text-3xl italic font-bold mb-4">"Láska ku kvásku"</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                práve to bol dôvod, prečo sme v roku 2020 otvorili našu prvú pobočku na ulici 17.
                novembra v Prešove. Je tam dodnes, a naši zákazníci k nám pravidelne chodia po svoj
                kváskový bochník, čerstvé rožky, koláče, pečené buchty.
              </p>
            </div>
            <div className="relative h-64 md:h-full min-h-[300px]">
              <Image
                src="/images/about-3.webp"
                fill
                alt="Kromka 'O nas'"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Card>

        {/* Growth Story */}
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-full min-h-[300px]">
              <Image
                src="/images/spolupraca-banner-alt.webp"
                fill
                alt="Kromka cafes"
                className="object-cover object-center"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Pečieme každý deň a naše pečivo už ochutnáte aj v ďalších podnikoch, u susedov v Nico
                caffé či v talianskom bistre Ciao, ale aj v rôznych iných podnikoch nielen v Prešove.
                Svoje pobočky sme otvorili aj v Košiciach, a najnovšie vám v nich urobíme aj kávu.
              </p>
            </div>
          </div>
        </Card>

        {/* Locations */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Kde nás nájdete?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((location) => (
              <Card key={location.city} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{location.city}</h3>
                <ul className="space-y-2">
                  {location.addresses.map((address) => (
                    <li key={address}>
                      <a
                        href={''}
                        target="_blank"
                        rel="norefferer nofollow"
                        className="text-muted-foreground flex items-center justify-start transition-colors hover:text-accent-foreground"
                      >
                        <PinIcon size={16} className="mr-2" />
                        {address}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <p className="text-lg leading-relaxed">
                Stále vymýšľame niečo nové, z našich žemlí si pripravíte ten najlepší burger, a okrem
                pečiva u nás nájdete aj výber rôznych lakociniek z lokálnych zdrojov. Ponúkneme
                poctivé párky, smotanové maslo, tvaroh, šťastné vajíčka, remeselné pivko či naturálne
                víno? Zastavte sa u nás v Kromke.
              </p>
            </div>
            <div className="relative h-64 md:h-full min-h-[300px]">
              <Image
                src="/images/about-2.webp"
                fill
                alt="Kromka products"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Alert className="bg-primary/10 border-primary">
          <AlertDescription className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-lg">
              Napíšte nám na kromka@kavejo.sk ak hľadáte prácu, brigádu alebo máte akúkoľvek otázku.
            </span>
            <Button variant="outline" className="whitespace-nowrap">
              <MailIcon className="mr-2 h-4 w-4" />
              Kontaktujte nás
            </Button>
          </AlertDescription>
        </Alert>

        {/* Social Media */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Sledujte nás!</h2>
          <div className="flex gap-4">
            <Button variant="outline" size="lg">
              <InstagramIcon className="mr-2 h-5 w-5" />
              Instagram
            </Button>
            <Button variant="outline" size="lg">
              <FacebookIcon className="mr-2 h-5 w-5" />
              Facebook
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
