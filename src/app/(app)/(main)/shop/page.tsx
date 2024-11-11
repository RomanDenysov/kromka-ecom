import { Suspense } from 'react'
import StoresGrid from '~/features/shop/stores/ui/stores-grid'
import { Container } from '~/lib/ui/container'
import { api } from '~/trpc/server'

export default async function ShopPage() {
  const stores = await api.stores.getStores()
  return (
    <Container className="py-5 md:py-10 space-y-5">
      <Suspense>
        <StoresGrid stores={stores} />
      </Suspense>
    </Container>
  )
}
