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
    <div className="rounded-lg border sm:border-none relative group transition sm:overflow-hidden size-full flex flex-col items-center justify-center shadow-sm">
      <div className="relative hidden sm:flex size-full flex-1">
        <AspectRatio>
          <Image
            loading="eager"
            decoding="sync"
            quality={70}
            src={image}
            alt={store.title}
            fill
            className="absolute inset-0 rounded-t-lg z-0 group-hover:scale-[1.02] transition brightness-90 object-cover object-center"
          />
        </AspectRatio>
      </div>
      <div className="absolute z-10 inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 transition-opacity group-hover:opacity-100 " />
      <div className="flex flex-col items-center justify-between group-hover:bg-gradient-to-t from-white to-accent z-20 transition border border-border rounded-b-lg size-full p-2 sm:p-4 space-y-2 sm:space-y-4">
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
        <Button onClick={handleClick} className="w-full">
          Vybrať obchod
        </Button>
      </div>
    </div>
  )
}

export default StoresItem
