import { api, HydrateClient } from '~/trpc/server'
import { Footer } from '~/widgets/footer'
import { Header } from '~/widgets/header'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  void api.stores.getStores.prefetch()
  void api.products.infiniteProducts.prefetchInfinite({
    query: { limit: 12 },
  })
  void api.categories.getAll.prefetch()

  return (
    <>
      {/* <HydrateClient> */}
      <Header />
      <main className="relative mx-auto min-h-screen">{children}</main>
      <Footer />
      {/* </HydrateClient> */}
    </>
  )
}
