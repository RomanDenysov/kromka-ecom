import { Suspense } from 'react'
import CategoriesGrid from '~/features/shop/categories/ui/categories-grid'
import { api } from '~/trpc/server'

type Props = {
  params: Promise<{
    store: string
  }>
}

export default async function StorePage({ params }: Props) {
  const store = (await params).store
  const categories = await api.categories.getAll()

  return (
    <Suspense>
      <CategoriesGrid storeSlug={store} categories={categories} />
    </Suspense>
  )
}
