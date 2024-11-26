import { Suspense } from 'react'
import { ProductsReel } from '~/features/products-reel/ui'
import { api } from '~/trpc/server'

type Props = {
  params: Promise<{
    category: string
  }>
}

export default async function ShopCategoryPage({ params }: Props) {
  const { category: categoryslug } = await params
  const category = await api.categories.bySlug({ slug: categoryslug })

  if (!category) return null

  return (
    <Suspense>
      <ProductsReel className="py-0" title={category.title} query={{ category: category.id }} />
    </Suspense>
  )
}
