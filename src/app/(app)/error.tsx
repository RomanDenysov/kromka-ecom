'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '~/lib/ui/components/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="size-full min-h-screen grid place-content-center">
      <h2 className="text-2xl text-center font-semibold">Niečo sa pokazilo!</h2>
      <Button
        variant={'ghost'}
        size={'lg'}
        onClick={() => {
          reset()
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }}
      >
        Vratit sa na hlavnú stránku
      </Button>
    </div>
  )
}
