'use client'

import { Card, CardContent, CardFooter, CardHeader } from '~/lib/ui/components/card'
import { StoreSelector } from '~/features/store-selector/ui'
import { useCurrentStore } from '~/store/store/use-current-store'
import { Separator } from '~/lib/ui/components/separator'
import { buttonVariants } from '~/lib/ui/components/button'
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '~/lib/utils'

const StoreCard = () => {
  const store = useCurrentStore((state) => state.store)
  const setStore = useCurrentStore((state) => state.setStore)

  if (!store) {
    return (
      <Card>
        <CardHeader className="px-4 pb-4">
          <StoreSelector onStoreChange={setStore} />
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="px-4 pb-4 pt-4">
        <StoreSelector onStoreChange={setStore} />
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="border rounded-lg p-2 flex flex-col items-center space-y-2">
          <h4 className="text-sm font-bold truncate">{store.title}</h4>
          <Separator />
          <div className="flex flex-col space-y-1 items-center">
            <span className="text-sm font-normal">pn-pi: {store.workingHours.week}</span>
            <span className="text-sm font-normal">sob: {store.workingHours.saturday}</span>
            <span className="text-sm font-normal">ned: {store.workingHours.sunday}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 items-center justify-center pb-4">
        <div className="border rounded-lg w-full flex items-center justify-between px-2 py-1">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={store.addressUrl}
            className={cn(buttonVariants({ size: 'icon', variant: 'ghost' }))}
          >
            <MapPinIcon />
          </Link>
          <Link
            href={`tel:${store.contacts.phone}`}
            className={cn(buttonVariants({ size: 'icon', variant: 'ghost' }))}
          >
            <PhoneIcon />
          </Link>
          <Link
            href={`mailto:${store.contacts.email}`}
            className={cn(buttonVariants({ size: 'icon', variant: 'ghost' }))}
          >
            <MailIcon />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default StoreCard
