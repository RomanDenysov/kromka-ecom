'use client'

import { Store } from '@payload-types'
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
    <div className="rounded-lg relative group transition overflow-hidden size-full flex flex-col items-center justify-center shadow-sm">
      <div className="relative size-full flex-1">
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
      <div className="absolute z-10 inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 transition-opacity group-hover:opacity-100 "></div>
      <div className="bg-white z-20 transition border border-border rounded-b-lg size-full p-4 space-y-4">
        <h4 className="text-lg lg:text-xl font-bold line-clamp-2 text-center text-primary">
          {store.title}
        </h4>
        <div className="flex items-center justify-center gap-x-0.5 text-muted-foreground">
          <MapPinIcon size={16} />
          <span className="text-base text-center text-muted-foreground">{store.address}</span>
        </div>
        <Button onClick={handleClick} className="w-full">
          Vybrat si obchod
        </Button>
      </div>
    </div>
  )
}

export default StoresItem
