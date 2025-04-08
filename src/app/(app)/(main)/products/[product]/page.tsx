import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductsReel } from '~/features/products-reel/ui'
import { SingleProduct } from '~/features/products/single-product/ui'
import { Container } from '~/lib/ui/container'
import { prodUrl } from '~/lib/utils'
import { JsonLd, Product, WithContext } from '~/lib/utils/json-ld'
import { createMetadata } from '~/lib/utils/metadata'
import { Media } from '~/server/payload/payload-types'
import { api } from '~/trpc/server'

type Props = {
  params: Promise<{
    product: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const { product: productParam } = await props.params
    const urlDecodedProduct = decodeURIComponent(productParam)
    const product = await api.products.bySlug({ slug: urlDecodedProduct })

    if (!product) {
      return createMetadata({
        title: 'Produkt nebol nájdený',
        description: 'Ľutujeme, ale hľadaný produkt nebol v našej pekárni nájdený.',
      })
    }

    const categoryTitle =
      typeof product.category !== 'string' ? product.category.title : '';

    const enhancedTitle = `${product.title}${categoryTitle ? ` | ${categoryTitle}` : ''}`;

    let enhancedDescription = product.descr;
    if (enhancedDescription.length < 100 && categoryTitle) {
      enhancedDescription += ` Kvalitne ${categoryTitle.toLowerCase()} z Pekárne Kromka vyrobene s láskou a podľa tradičných receptov.`;
    }

    if (enhancedDescription.length < 120) {
      enhancedDescription += ' Navštívte našu pekáreň alebo si objednajte online.';
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.descr,
      image: (product.images[0].image as Media).url,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'EUR',
        availability: product.status === 'active' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: `${prodUrl}/products/${product.slug}`,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      },
      brand: {
        '@type': 'Brand',
        name: 'Pekáreň Kromka'
      },
      category: categoryTitle,
      sku: product.id,
      url: `${prodUrl}/products/${product.slug}`
    };

    const meta = {
      title: enhancedTitle,
      description: enhancedDescription,
      image: (product.images[0]?.image as Media)?.url || '/images/kromka_breads.webp',
      canonicalUrl: `${prodUrl}/products/${product.slug}`,
    }

    return {
      ...createMetadata(meta),
      other: {
        'application/ld+json': JSON.stringify(jsonLd),
      },
    }
  } catch (error) {
    return createMetadata({
      title: 'Chyba pri načítaní produktu',
      description: 'Ľutujeme, ale nastala chyba pri načítaní produktu. Prosím, skúste to znova neskôr.',
    })
  }
}

// type Param = string | string[] | undefined

export default async function Page({ params }: Props) {
  const { product: productParam } = await params
  const urlDecodedProduct = decodeURIComponent(productParam)
  const product = await api.products.bySlug({ slug: urlDecodedProduct })

  if (!product) return notFound()

  const [categoryId, categoryTitle] =
    typeof product.category !== 'string'
      ? [product.category.id, product.category.title]
      : [product.category]

  const productJsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.descr,
    image: (product.images[0]?.image as Media)?.url || '/images/kromka_breads.webp',
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.status === 'active'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${prodUrl}/products/${product.slug}`,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    brand: {
      '@type': 'Brand',
      name: 'Pekáreň Kromka'
    },
    category: categoryTitle,
    sku: product.id,
    url: `${prodUrl}/products/${product.slug}`
  } as const;

  return (
    <>
      <JsonLd code={productJsonLd} />
      <Container className="py-8 md:py-16 space-y-12">
        <Suspense>
          <SingleProduct product={product} />
        </Suspense>
        <Suspense>
          <ProductsReel
            title={categoryTitle}
            query={{ limit: 8, category: categoryId, excludeId: product.id }}
          />
        </Suspense>
      </Container>
    </>
  )
}
