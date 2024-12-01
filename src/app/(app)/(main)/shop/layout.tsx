import { api, HydrateClient } from '~/trpc/server'

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  void Promise.all([
    api.stores.getStores.prefetch(),
    api.products.infiniteProducts.prefetchInfinite({ query: { limit: 12 } }),
    api.categories.getAll.prefetch(),
  ])

  return <HydrateClient>{children}</HydrateClient>
}
