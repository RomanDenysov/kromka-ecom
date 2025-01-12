import { Suspense } from 'react'
import { CategoriesCarousel } from '~/features/shop/categories/ui'
import { StoresGridDrawer } from '~/features/shop/stores-drawer/ui'
import { HydrateClient, api } from '~/trpc/server'

type Props = {
  readonly children: React.ReactNode
}

export default async function ShopLayout({ children }: Props) {
  void api.categories.getAll.prefetch()

  return (
    <>
      <StoresGridDrawer />
      <HydrateClient>
        <CategoriesCarousel />
      </HydrateClient>
      {children}
    </>
  )
}
