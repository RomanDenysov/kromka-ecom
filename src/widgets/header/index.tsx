import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import CartButton from '~/features/cart-sheet/ui/cart-button'
import { UserButton } from '~/features/user-button/ui'
import { Button } from '~/lib/ui/components/button'
import { Separator } from '~/lib/ui/components/separator'
import { Container } from '~/lib/ui/container'
import { Icons } from '~/lib/ui/icons'
import { HeaderSearchButton } from './header-search-button'
// import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'
import { Navbar } from './navbar'

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-background w-full">
      <Container className="flex min-h-16 py-2 flex-row items-center gap-4 border-b md:grid md:grid-cols-3">
        <div className="hidden flex-row items-start justify-start md:flex">
          <Navbar />
        </div>
        <div className="flex w-12 shrink items-end justify-end md:hidden">
          <MobileNav />
          {/* <DesktopNav /> */}
        </div>

        <div className="flex md:justify-center">
          <Link href="/" className="group">
            <Icons.kromka className="h-5 transition-opacity group-hover:opacity-80 lg:h-6 xl:h-7" />
          </Link>
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <HeaderSearchButton />
          <Separator orientation="vertical" className="h-6 w-px" />
          <UserButton />
          <Separator orientation="vertical" className="h-6 w-px" />
          <CartButton />
        </div>
      </Container>
    </header>
  )
}
