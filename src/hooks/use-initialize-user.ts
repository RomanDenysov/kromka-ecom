'use client'

import { useCallback, useEffect } from 'react'
import { useUser } from '~/store/user/use-user'
import { api } from '~/trpc/react'

export const useInitializeUser = () => {
  const setUser = useUser((state) => state.setUser)
  const { data: user, isLoading } = api.users.me.useQuery()

  // Memoize the user initialization to prevent unnecessary rerenders
  const initializeUser = useCallback(() => {
    if (!isLoading && user) {
      setUser(user)
    }
  }, [user, setUser])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])
}
