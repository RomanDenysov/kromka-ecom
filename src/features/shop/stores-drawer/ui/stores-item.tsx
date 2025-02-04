'use client'

import type { Store } from '@payload-types'
import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'
import { Button } from '~/lib/ui/components/button'
import { useCurrentStore } from '~/store/store/use-current-store'
import { useStoresDrawer } from '../hooks/use-stores-drawer'

type Props = {
  store: Store
}

const StoresItem = ({ store }: Props) => {
  const setStore = useCurrentStore((state) => state.setStore)
  const onClose = useStoresDrawer((state) => state.onClose)

  const handleClick = () => {
    setStore(store)
    setTimeout(onClose, 300)
  }

  const image = typeof store.image !== 'string' ? store.image.url! : store.image
  return (
    <div className="aspect-video max-h-40 border shadow-md relative rounded-lg overflow-hidden">
      <div className="flex-grow flex items-center size-full justify-between">
        <div className="aspect-square h-40 relative">
          <Image
            quality={70}
            src={'/placeholder.png'}
            alt={store.title}
            fill
            className="absolute inset-0 rounded transition brightness-90 object-cover object-center"
          />
        </div>

        <div className="flex-grow p-2 flex flex-col justify-between size-full">
          <h4 className="text-base lg:text-xl font-semibold text-balance sm:font-bold line-clamp-2 text-center text-primary w-[90%]">
            {store.title}
          </h4>
          <a
            href={store.addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex hover:underline hover:text-primary transition items-center justify-center gap-x-1 text-muted-foreground"
          >
            <MapPinIcon size={16} />
            <span className="text-sm text-center text-muted-foreground">{store.address}</span>
          </a>
          <Button onClick={handleClick} className="w-full" size="sm" variant="outline">
            Vybrať obchod
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StoresItem
