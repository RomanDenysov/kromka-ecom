import type { Metadata } from 'next'
import { Suspense } from 'react'
import CategoriesFilter from '~/features/shop/categories/ui/categories-filter'
import { ProductsList } from '~/features/shop/products-list/ui'
import { Container } from '~/lib/ui/container'
import { HydrateClient, api } from '~/trpc/server'

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  // TODO: update metadata for products page
  return {
    title: 'Naše Produkty',
    description: '',
    openGraph: {
      title: 'Naše Produkty',
      description: '',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Naše Produkty',
      description: '',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Naše Produkty',
        },
      ],
    },
  }
}

export default async function ShopPage({ searchParams }: Props) {
  const categorySlug = (await searchParams).category as string | undefined

  const selectedCategoriesSlug = categorySlug
    ? categorySlug
        .split(',')
        .filter((cat): cat is string => typeof cat === 'string' && cat.length > 0)
    : []

  void api.products.infiniteProducts.prefetchInfinite({
    query: { limit: 12, sort: ['-order'], category: selectedCategoriesSlug },
  })

  return (
    <>
      <Container className="pt-4 mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-left font-bold text-2xl md:text-3xl tracking-tight">
            {'Naše Produkty'}
          </h1>
        </div>
      </Container>
      <CategoriesFilter />
      <Container className="py-5">
        <HydrateClient>
          <Suspense fallback={null}>
            {/* <ProductsReel
            title={'Naše Produkty'}
            subtitle={'Naše najlepšie Obchody'}
            query={{
              limit: 12,
              sort: ['-order'],
              category: selectedCategoriesSlug,
              }}
              total={true}
              className="py-0"
              showLoadMore
              /> */}
            <ProductsList />
          </Suspense>
        </HydrateClient>
      </Container>
    </>
  )
}
