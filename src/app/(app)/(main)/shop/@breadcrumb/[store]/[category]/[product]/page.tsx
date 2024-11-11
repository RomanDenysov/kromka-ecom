import { Suspense } from 'react'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/lib/ui/components/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/lib/ui/components/dropdown-menu'
import { api } from '~/trpc/server'
import Loading from './loading'

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ store: string; category: string; product: string }>
}) {
  const { store, category, product } = await params

  const [stores, itemCategory, itemProduct] = await Promise.all([
    api.stores.getStores(),
    api.categories.bySlug({ slug: category }),
    api.products.bySlug({ slug: product }),
  ])

  if (!stores || !itemCategory || !itemProduct) return null
  return (
    <Suspense fallback={<Loading />}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Domov</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {stores.map((store) => (
                  <DropdownMenuItem key={store.slug} asChild>
                    <BreadcrumbLink href={`/shop/${store.slug}`}>{store.title}</BreadcrumbLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/shop/${store}/${category}`}>
              {itemCategory.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{itemProduct.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Suspense>
  )
}
