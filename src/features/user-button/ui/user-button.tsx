'use client'

import { BookLockIcon, LogInIcon, SettingsIcon, ShoppingBag, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/lib/ui/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/lib/ui/components/dropdown-menu'
import { cn, getNameInitials } from '~/lib/utils'
import { LogoutButton } from './logout-button'
import { useUser } from '~/store/user/use-user'

// TODO: move options to config file
const BUTTON_OPTIONS = [
  { label: 'Profile', href: '', icon: UserIcon },
  { label: 'Orders', href: '/orders', icon: ShoppingBag },
  { label: 'Settings', href: '/settings', icon: SettingsIcon },
]

const UserButton = () => {
  const user = useUser((state) => state.user)
  const isAdmin = useMemo(() => user?.role === 'admin', [user])

  console.log('USER', user)

  const userImage = useMemo(() => user?.image || '', [user])

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <Suspense fallback={null}>
                <AvatarImage className="rounded-full" src={userImage} />
                <AvatarFallback delayMs={600} className="rounded-full bg-accent">
                  {user.name ? getNameInitials(user.name) : <UserIcon size={24} />}
                </AvatarFallback>
              </Suspense>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={5}>
            <DropdownMenuGroup>
              {BUTTON_OPTIONS.map((option) => (
                <DropdownMenuItem key={option.label} asChild>
                  <Link href={{ pathname: `/profile/${option.href}` }}>
                    <option.icon size={20} className="mr-2" />
                    {option.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <Suspense fallback={null}>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={'/admin'}>
                        <BookLockIcon size={20} className="mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </Suspense>
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          prefetch={true}
          href={'/sign-in'}
          className={cn('grid size-10 place-content-center rounded-full p-0 md:hover:bg-accent ')}
        >
          <LogInIcon size={24} />
        </Link>
      )}
    </>
  )
}

export default UserButton
