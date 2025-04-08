import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import CategoriesFilter from '~/features/shop/categories/ui/categories-filter'
import { ProductsList, ProductsListLoader } from '~/features/shop/products-list/ui'
import { Container } from '~/lib/ui/container'
import { prodUrl } from '~/lib/utils'
import { JsonLd, WebSite, WithContext, createOrganizationSchema, createSchemaUrl } from '~/lib/utils/json-ld'
import { createMetadata } from '~/lib/utils/metadata'
import { HydrateClient, api } from '~/trpc/server'

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const categorySlug = (await searchParams).category as string | undefined

  const selectedCategoriesSlug = categorySlug
    ? categorySlug
      .split(',')
      .filter((cat): cat is string => typeof cat === 'string' && cat.length > 0)
    : []

  let title = 'Naše Produkty | Chlieb, Pečivo a Sladké Dobroty'
  let description = 'Objavte širokú ponuku tradičných slovenských pekárenských výrobkov z Pekárne Kromka. Čerstvý domáci chlieb, pečivo, koláče a iné špeciality pečené s láskou a podľa tradičných receptov. Nakupujte online.'

  if (selectedCategoriesSlug.length > 0) {
    const categories = await api.categories.getAll()
    const selectedCategories = categories.filter((cat) => selectedCategoriesSlug.includes(cat.slug!))
    if (selectedCategories.length <= 2) {
      title = `Naše Produkty | ${selectedCategories.map((cat) => cat.title).join(', ')}`
    } else {
      title = `Naše Produkty | ${selectedCategories.length} kategórii`
    }

    if (selectedCategories.length === 1) {
      description = `Objavte našu ponuku ${selectedCategories[0].title.toLowerCase()}. Kvalitné pekárenské výrobky z Pekárne Kromka pečené podľa tradičných receptov s láskou. Nakupujte online.`
    }
  }

  const meta = {
    title,
    description,
    image: 'images/kromka_breads.webp',
    canonicalUrl: 'products',
  }

  return createMetadata(meta)
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

  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Naše Produkty | Chlieb, Pečivo a Sladké Dobroty',
    description: 'Objavte širokú ponuku tradičných slovenských pekárenských výrobkov z Pekárne Kromka. Čerstvý domáci chlieb, pečivo, koláče a iné špeciality pečené s láskou a podľa tradičných receptov. Nakupujte online.',
    url: createSchemaUrl(new URL('/products', prodUrl)),
    publisher: createOrganizationSchema(prodUrl)
  }

  return (
    <>
      <JsonLd code={jsonLd} />
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
          <Suspense fallback={<ProductsListLoader />}>
            <ErrorBoundary fallback={<ProductsListLoader />}>
              <ProductsList />
            </ErrorBoundary>
          </Suspense>
        </HydrateClient>
      </Container>
    </>
  )
}
