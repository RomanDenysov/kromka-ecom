import { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductsReel } from '~/features/products-reel/ui'
import { CategoriesCarousel } from '~/features/shop/categories/ui'
import { StoresGridDrawer } from '~/features/shop/stores-drawer/ui'
import { Container } from '~/lib/ui/container'
import { api, HydrateClient } from '~/trpc/server'

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return {
    title: 'Naše Produkty',
    description: 'Naše najlepšie Obchody',
    openGraph: {
      title: 'Naše Produkty',
      description: 'Naše vybrate produkty',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Naše Produkty',
      description: 'Naše najlepšie Obchody',
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

  console.log('CATEGORY', categorySlug)

  const selectedCategoriesSlug = categorySlug
    ? categorySlug
        .split(',')
        .filter((cat): cat is string => typeof cat === 'string' && cat.length > 0)
    : []

  void api.categories.getAll.prefetch()
  void api.products.infiniteProducts.prefetchInfinite({
    query: { limit: 12, category: selectedCategoriesSlug },
  })

  return (
    <Container className="py-5 md:py-8 space-y-5">
      <StoresGridDrawer />
      <HydrateClient>
        <Suspense>
          <CategoriesCarousel />
        </Suspense>
        <Suspense>
          <ProductsReel
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
          />
        </Suspense>
      </HydrateClient>
    </Container>
  )
}
