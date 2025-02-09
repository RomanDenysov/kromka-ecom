'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from '~/lib/ui/components/dropdown-menu'

export const LogoutButton = () => {
  return (
    <DropdownMenuItem
      onClick={() => {
        signOut({ redirectTo: '/' })
      }}
    >
      <LogOutIcon size={20} className="mr-2" />
      Logout
    </DropdownMenuItem>
  )
}
