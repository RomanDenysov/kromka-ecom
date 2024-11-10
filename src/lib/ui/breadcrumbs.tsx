'use client'

import { useParams, usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './components/breadcrumb'

const Breadcrumbs = () => {
  const pathname = usePathname()
  const params = useParams()

  const breadcrumbs = genarateBreadcrumbs(pathname, params)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={breadcrumb.href}>
            <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function genarateBreadcrumbs(pathname: string, params: Record<string, string | string[]>) {
  const paths = pathname.split('/').filter(Boolean)
  let currentPath = ''

  return paths.map((path, index) => {
    currentPath += `/${path}`
    let label = path

    // Обработка параметров с дефисами
    if (Object.keys(params).some((param) => params[param] === path)) {
      // Если текущий сегмент соответствует значению в params, используем его как есть
      label = path
    } else if (path.includes('-')) {
      // Если сегмент содержит дефисы, преобразуем его в более читаемый формат
      label = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    } else {
      // В остальных случаях просто делаем первую букву заглавной
      label = path.charAt(0).toUpperCase() + path.slice(1)
    }

    // Специальная обработка для сегмента 'shop'
    if (path === 'shop' && index === 0) {
      label = 'Магазины'
    }

    return { href: currentPath, label }
  })
}

export default Breadcrumbs
