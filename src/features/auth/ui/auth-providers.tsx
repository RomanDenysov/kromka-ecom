'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'
import { LoaderButton } from '~/lib/ui//loader-button'

export const AuthProviders = () => {
  const [loading, setLoading] = useState(false)

  const handleProviderClick = (provider: 'google' | 'facebook') => {
    setLoading(true)
    signIn(provider, { redirectTo: '/' }).finally(() => setLoading(false))
  }

  const doesntWorkHandling = () => toast.warning('Autorizácia pomocou Google dočasne nefunguje ')

  return (
    <div className="flex flex-shrink size-full">
      <LoaderButton className="w-full" onClick={doesntWorkHandling} isLoading={loading}>
        {!loading && <FcGoogle />}
        Pokračovať z Google
      </LoaderButton>
    </div>
  )
}
