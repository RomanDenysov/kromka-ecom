import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductsReel } from '~/features/products-reel/ui'
import { SingleProduct } from '~/features/products/single-product/ui'
import { Container } from '~/lib/ui/container'
import { api } from '~/trpc/server'

type Props = {
  params: Promise<{
    product: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { product: productParam } = await props.params
  const urlDecodedProduct = decodeURIComponent(productParam)

  const product = await api.products.bySlug({ slug: urlDecodedProduct })

  if (!product) return notFound()

  return {
    openGraph: {
      title: product.title,
      description: product.descr,
    },
  }
}

// type Param = string | string[] | undefined

export default async function Page({ params }: Props) {
  const { product: productParam } = await params
  const urlDecodedProduct = decodeURIComponent(productParam)
  const product = await api.products.bySlug({ slug: urlDecodedProduct })

  const [categoryId, categoryTitle] =
    typeof product.category !== 'string'
      ? [product.category.id, product.category.title]
      : [product.category]

  if (!product) return notFound()

  return (
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
  )
}
