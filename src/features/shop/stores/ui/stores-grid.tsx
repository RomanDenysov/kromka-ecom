import { Heading } from '~/lib/ui/heading'
import AnimatedBackground from '~/lib/ui/motion/animated-background'
import { Store } from '@payload-types'
import { StoreItemWrapper, StoresItem } from '~/features/shop/stores/ui'
import { Link } from '~/lib/ui/link'

type Props = {
  stores: Store[]
}

const StoresGrid = ({ stores }: Props) => {
  return (
    <>
      <Heading title="Naše Obchody" subtitle="Naše najlepšie Obchody" />

      <div className="sm:grid sm:grid-cols-2 gap-5 mx-auto">
        <AnimatedBackground
          className="rounded-lg bg-accent"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          enableHover
        >
          {stores?.map((store) => (
            <Link href={`/shop/${store.slug}`} data-id={store.id} key={store.id}>
              <StoreItemWrapper store={store}>
                <StoresItem store={store} />
              </StoreItemWrapper>
            </Link>
          ))}
        </AnimatedBackground>
      </div>
    </>
  )
}

export default StoresGrid
