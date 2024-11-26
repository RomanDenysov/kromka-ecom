import { Suspense } from 'react'
import StoresGrid from '~/features/shop/stores/ui/stores-grid'
import { api } from '~/trpc/server'

export default async function ShopPage() {
  const stores = await api.stores.getStores()
  return (
    <Suspense>
      <StoresGrid stores={stores} />
    </Suspense>
  )
}
