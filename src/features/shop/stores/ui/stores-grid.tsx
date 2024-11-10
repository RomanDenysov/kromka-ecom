import Link from 'next/link'
import { Heading } from '~/lib/ui/heading'
import AnimatedBackground from '~/lib/ui/motion/animated-background'
import { Store } from '@payload-types'
import StoresItem from './stores-item'

type Props = {
  stores: Store[]
}

const StoresGrid = ({ stores }: Props) => {
  return (
    <>
      <Heading title="Naše Obchody" subtitle="Naše najlepšie Obchody" />

      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 mx-auto">
        <AnimatedBackground
          className="rounded-lg bg-accent"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          enableHover
        >
          {stores?.map((store) => {
            const image = typeof store.image !== 'string' ? store.image.url! : store.image
            return (
              <Link
                data-id={store.id}
                key={store.id}
                href={{ pathname: `/shop/${store.slug}` }}
                className="flex flex-col size-auto rounded-lg"
              >
                <StoresItem store={store} />
              </Link>
            )
          })}
        </AnimatedBackground>
      </div>
    </>
  )
}

export default StoresGrid
