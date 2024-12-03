'use client'

import { useCallback, useEffect } from 'react'
import { useUser } from '~/store/user/use-user'
import { api } from '~/trpc/react'

export const useInitializeUser = () => {
  const setUser = useUser((state) => state.setUser)
  const [user] = api.users.me.useSuspenseQuery()

  // Memoize the user initialization to prevent unnecessary rerenders
  const initializeUser = useCallback(() => {
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])
}
