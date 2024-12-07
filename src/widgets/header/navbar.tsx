'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '~/lib/config/navigation'
import { buttonVariants } from '~/lib/ui/components/button'
import { cn } from '~/lib/utils'

export const Navbar = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <div className="hidden items-center justify-start gap-x-1 md:inline-flex lg:gap-x-2">
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          prefetch={true}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'px-2 text-primary text-sm',
            isActive(href) && 'bg-accent/60',
            isHome && href === '/' && 'hidden',
          )}
          aria-current={isActive(href) ? 'page' : undefined}
          href={href}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
