import { Suspense } from 'react'
import { ProductsReel } from '~/features/products-reel/ui'
import { Container } from '~/lib/ui/container'
import { api } from '~/trpc/server'

type Param = string | string[] | undefined

type Props = {
  params: Promise<{
    category: string
  }>
  searchParams: Promise<{
    [key: string]: Param
  }>
}

export default async function ShopCategoryPage({ params, searchParams }: Props) {
  const { category: categoryslug } = await params
  const category = await api.categories.bySlug({ slug: categoryslug })

  return (
    <Container className="py-5 md:py-10">
      <Suspense fallback={null}>
        <ProductsReel className="py-0" title={category.title} query={{ category: category.id }} />
      </Suspense>
    </Container>
  )
}
