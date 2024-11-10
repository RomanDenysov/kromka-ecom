import { Store } from '@payload-types'
import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'

type Props = {
  store: Store
}

const StoresItem = ({ store }: Props) => {
  const image = typeof store.image !== 'string' ? store.image.url! : store.image
  return (
    <div className="p-1.5 group">
      <div className="rounded-lg relative overflow-hidden">
        <Image
          src={image}
          alt={store.title}
          width={300}
          height={700}
          className="rounded-lg z-0 group-hover:blur-[1px] group-hover:scale-[1.02] transition brightness-90 object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 rounded-lg w-full z-10 px-2 pb-2">
          <div className="bg-accent/70 transition group-hover:bg-accent/80 border border-border rounded-lg size-full px-4 py-2">
            <h4 className="text-lg lg:text-xl font-bold line-clamp-2 text-center text-primary">
              {store.title}
            </h4>
            <div className="flex items-center justify-center gap-x-0.5 text-muted-foreground">
              <MapPinIcon size={16} />
              <span className="text-base text-center text-muted-foreground">{store.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoresItem
