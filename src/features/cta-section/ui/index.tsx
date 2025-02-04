import { MailIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'
import { buttonVariants } from '~/lib/ui/components/button'

import { cn } from '~/lib/utils'

export function CtaSection() {
  return (
    <section className="group relative overflow-hidden border shadow rounded-md">
      <AspectRatio ratio={21 / 9} className="relative">
        <Image
          src={'/images/asset-1.webp'}
          alt={'alt text'}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px]">
          <div className="absolute z-20 inset-0 flex flex-col items-center justify-center">
            <div className="max-w-2xl mx-auto text-center px-4 space-y-4 mb-2 md:mb-6">
              <h2 className="text-xl md:text-3xl font-bold text-white">
                <Balancer>{'Radi sa spájame s tými, ktorí majú na jedlo podobný pohľad'}</Balancer>
              </h2>
              <p className="hidden md:block text-gray-200 text-base font-medium">
                Pečieme kváskový chlieb, koláče, ponúkame dobrú kávu, a do našich predajní vyberáme
                samé lakocinky. Nájdete nás v Prešove aj v Košiciach, zastavte sa!
              </p>
            </div>

            <div className="max-w-2xl flex items-center justify-center gap-4">
              <Link
                href="mailto:kromka@kavejo.sk"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'text-base [&_svg]:size-5 gap-3 bg-transparent text-white',
                )}
              >
                Napíšte nám <MailIcon className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </AspectRatio>
    </section>
  )
}
