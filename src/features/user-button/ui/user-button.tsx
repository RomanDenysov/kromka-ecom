import { BookLockIcon, LogInIcon, SettingsIcon, ShoppingBag, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { AvatarStack } from '~/lib/ui/avatar-stack'
import { buttonVariants } from '~/lib/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/lib/ui/components/dropdown-menu'
import { cn } from '~/lib/utils'
import { api } from '~/trpc/server'
import { LogoutButton } from './logout-button'

// TODO: move options to config file
const BUTTON_OPTIONS = [
  { label: 'Profile', href: '', icon: UserIcon },
  { label: 'Orders', href: '/orders', icon: ShoppingBag },
  { label: 'Settings', href: '/settings', icon: SettingsIcon },
]

export async function UserButton() {
  const user = await api.users.me()
  const isAdmin = user?.role === 'admin'
  console.log('USER', user)

  if (!user) {
    return <Link
      prefetch={true}
      href={'/sign-in'}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'icon' }),
        'rounded-full size-10 [&_svg]:size-5',
      )}
    >
      <LogInIcon size={20} />
    </Link>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-fit rounded-full focus:hidden">
        <AvatarStack
          avatar={user.image}
          name={user?.name ?? ''}
          email={user?.email ?? ''}
        />
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
    </DropdownMenu >
  )
}

export default UserButton
