'use client'

import { ChevronRightIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '~/lib/ui/components/button'
import { Link } from '~/lib/ui/link'
import { cn } from '~/lib/utils'

const policyNav = [
  {
    label: 'Obchodné podmienky',
    href: '/terms',
    subitems: [
      { label: 'Základné ustanovenia', href: '/terms#zakladne-ustanovenia' },
      { label: 'Používateľský účet', href: '/terms#pouzivatelsky-ucet' },
      { label: 'Práva a povinnosti používateľa', href: '/terms#prava-povinnosti' },
      { label: 'Platobné podmienky', href: '/terms#platobne-podmienky' },
      { label: 'Záverečné ustanovenia', href: '/terms#zaverecne-ustanovenia' },
    ],
  },
  {
    label: 'Ochrana osobných údajov',
    href: '/privacy',
    subitems: [
      { label: 'Základné informácie', href: '/privacy#zakladne-informacie' },
      { label: 'Rozsah spracovania', href: '/privacy#rozsah-spracovania' },
      { label: 'Účel spracovania', href: '/privacy#ucel-spracovania' },
      { label: 'Doba uchovávania', href: '/privacy#doba-uchovavania' },
      { label: 'Práva dotknutej osoby', href: '/privacy#prava-dotknutej-osoby' },
    ],
  },
  {
    label: 'Cookie Policy',
    href: '/cookies',
    subitems: [
      { label: 'Čo sú súbory cookies', href: '/cookies#co-su-cookies' },
      { label: 'Prečo používame cookies', href: '/cookies#preco-pouzivame' },
      { label: 'Typy cookies', href: '/cookies#typy-cookies' },
      { label: 'Správa nastavení', href: '/cookies#sprava-nastaveni' },
    ],
  },
]

const LegalNavigation = () => {
  const pathname = usePathname()
  return (
    <nav className="space-y-1 px-4 pt-2">
      {policyNav.map(({ label, href, subitems }) => {
        const isActive = pathname === href

        return (
          <div key={href} className="space-y-1">
            <Link
              href={href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start font-medium',
                isActive && 'bg-muted',
              )}
            >
              {label}
              <ChevronRightIcon className={cn(isActive && 'rotate-90 transition-transform')} />
            </Link>
            {isActive && subitems && (
              <div className="pl-4 space-y-1">
                {subitems.map((subitem) => (
                  <Link
                    key={subitem.href}
                    href={subitem.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'w-full justify-start text-sm text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default LegalNavigation
