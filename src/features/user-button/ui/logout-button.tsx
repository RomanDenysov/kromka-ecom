'use client'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from '~/lib/ui/components/dropdown-menu'
import { useUser } from '~/store/user/use-user'

export const LogoutButton = () => {
  const clearUser = useUser((state) => state.clearUser)

  return (
    <DropdownMenuItem
      onClick={() => {
        signOut({ redirectTo: '/' }), clearUser()
      }}
    >
      <LogOutIcon size={20} className="mr-2" />
      Logout
    </DropdownMenuItem>
  )
}
