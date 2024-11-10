import { Fragment, ReactElement } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/lib/ui/components/breadcrumb'

export default async function BreadcrumbSlot({ params }: { params: Promise<{ all: string[] }> }) {
  const { all } = await params
  const breadcrumbItems: ReactElement[] = []
  let breadcrumbPage: ReactElement = <></>
  for (let i = 0; i < all.length; i++) {
    const route = all[i]
    const href = `/${all.at(0)}/${route}`
    if (i === all.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{route}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    } else {
      breadcrumbItems.push(
        <Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink href={href} className="capitalize">
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>,
      )
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Domov</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
