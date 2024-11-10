import { Suspense } from 'react'
import CategoriesGrid from '~/features/shop/categories/ui/categories-grid'
import { Container } from '~/lib/ui/container'
import { api } from '~/trpc/server'

type Param = string | string[] | undefined

type Props = {
  params: Promise<{
    store: string
  }>
  searchParams: Promise<{
    [key: string]: Param
  }>
}

export default async function StorePage({ params, searchParams }: Props) {
  const { store } = await params
  const categories = await api.categories.getAll()

  return (
    <Container className="py-5 md:py-10 space-y-5">
      <Suspense>
        <CategoriesGrid storeSlug={store} categories={categories} />
      </Suspense>
    </Container>
  )
}
