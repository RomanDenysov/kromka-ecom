import Image from 'next/image'
import { generateProductQuantityStr } from '~/lib/utils'

type Props = {
  total: number
  title: string
  image: string
}

const GridItem = ({ title, image, total }: Props) => {
  console.log('TOTAL:', total)

  return (
    <div className="group p-1 flex flex-col rounded-lg space-y-2">
      <div className="bg-accent aspect-video size-full rounded-lg relative overflow-hidden">
        <Image
          loading="eager"
          decoding="sync"
          quality={65}
          src={image}
          alt={title}
          fill
          className="brightness-90 object-cover object-center rounded-lg absolute inset-0 z-0 group-hover:scale-[1.02] group-hover:brightness-95 transition duration-300 ease-in-out"
        />
      </div>
      <div className="p-0.5">
        <h4 className="text-xl font-semibold line-clamp-2 text-primary">{title}</h4>
        <span className="text-sm text-muted-foreground">{generateProductQuantityStr(total)}</span>
      </div>
    </div>
  )
}

export default GridItem
