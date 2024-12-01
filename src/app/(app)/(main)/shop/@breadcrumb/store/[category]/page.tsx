import { Suspense } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/lib/ui/components/breadcrumb'
import { api } from '~/trpc/server'
import Loading from './loading'

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ store: string; category: string }>
}) {
  const itemStore = await api.stores.bySlug({ slug: (await params).store })
  const itemCategory = await api.categories.bySlug({ slug: (await params).category })

  if (!itemStore || !itemCategory) return null

  return (
    <Suspense fallback={<Loading />}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Domov</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/shop/${(await params).store}`}>
              {itemStore.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{itemCategory.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Suspense>
  )
}
