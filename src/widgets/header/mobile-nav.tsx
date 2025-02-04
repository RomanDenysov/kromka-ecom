'use client'

import { AlignJustifyIcon, MenuIcon, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMountedState } from 'react-use'
import { NAV_LINKS } from '~/lib/config/navigation'
import { Button } from '~/lib/ui/components/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/lib/ui/components/sheet'
import { Icons } from '~/lib/ui/icons'
import { cn } from '~/lib/utils'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const isMounted = useMountedState()
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  if (!isMounted) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="[&_svg]:size-6"
        >
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="px-4">
        <SheetHeader className="grid w-full place-content-center">
          <SheetTitle>
            <Icons.kromka className="h-4 w-auto fill-primary text-primary" />
            <span className="sr-only">Kromka Logo</span>
          </SheetTitle>
          <SheetDescription>
            <span className="sr-only">Mobile navigation</span>
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-y-2 py-10">
          {NAV_LINKS.map((link) => (
            <Button
              onClick={() => handleClick(link.href)}
              key={link.href}
              variant={'ghost'}
              className={cn(
                'w-full justify-start text-lg tracking-tight',
                link.href === pathname && 'bg-accent text-accent-foreground',
              )}
            >
              <link.icon size={20} className="mr-2 text-muted-foreground" />
              {link.label}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
