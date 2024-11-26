import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductsReel } from '~/features/products-reel/ui'
import { SingleProduct } from '~/features/products/single-product/ui'
import { Container } from '~/lib/ui/container'
import { api } from '~/trpc/server'

type Param = string | string[] | undefined

type Props = {
  params: Promise<{
    product: string
  }>
  searchParams: Promise<{
    [key: string]: Param
  }>
}

export default async function ShopProductPage({ params, searchParams }: Props) {
  const { product: productSlug } = await params
  const product = await api.products.bySlug({ slug: productSlug })
  const [categoryId, categoryTitle] =
    typeof product.category !== 'string'
      ? [product.category.id, product.category.title]
      : [product.category]

  if (!product) return notFound()

  return (
    <div className="space-y-5">
      <Suspense>
        <SingleProduct product={product} />
      </Suspense>
      <Suspense>
        <ProductsReel
          title={categoryTitle}
          query={{ category: categoryId }}
          excludeId={product.id}
        />
      </Suspense>
    </div>
  )
}
