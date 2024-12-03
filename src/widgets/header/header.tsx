import { Link } from '~/lib/ui/link'
import CartButton from '~/features/cart-sheet/ui/cart-button'
import { UserButton } from '~/features/user-button/ui'
import { Separator } from '~/lib/ui/components/separator'
import { Container } from '~/lib/ui/container'
import { Icons } from '~/lib/ui/icons'
import { MobileNav } from './mobile-nav'
import { Navbar } from './navbar'
import { Suspense } from 'react'

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-background">
      <Container className="relative flex h-16 items-center justify-between gap-x-2 border-border border-b">
        <div className="flex flex-1 items-center justify-start">
          <MobileNav />
          <Navbar />
        </div>

        <div className="grid flex-1 place-content-center">
          <Link href="/">
            <Icons.kromka className="h-5 w-auto fill-accent-foreground md:h-7" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Suspense>
            <UserButton />
          </Suspense>
          <Separator orientation="vertical" className="h-6 w-px" />
          <CartButton />
        </div>
      </Container>
    </header>
  )
}
