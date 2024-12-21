import Image from 'next/image'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'

const EndSellingDialog = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <AspectRatio ratio={16 / 9} className="flex flex-row">
        <div className="flex-1 grid place-content-center">
          <div className="px-2 space-y-2">
            <h1 className="text-lg sm:text-2xl leading-4 font-black text-center">
              Vianočný eshop zatvárame dnes 21.12. o polnoci!
            </h1>
            <p className="font-medium text-center leading-3 text-xs sm:text-base">
              Svoje objednávky a malé lakocinky navyše nájdete u nás v Kromke v pondelok{' '}
              <b>23. decembra</b>.
              <br />
              Pekné Vianoce z Kromky!
            </p>
          </div>
        </div>
        <div className="relative flex-1 size-full">
          <Image
            alt=""
            src={'/images/end-banner.webp'}
            fill
            className="object-cover object-center rounded-r-lg"
          />
        </div>
      </AspectRatio>
    </div>
  )
}

export default EndSellingDialog
