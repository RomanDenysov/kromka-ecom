import GridItem from './grid-item'
import { Heading } from '~/lib/ui/heading'
import AnimatedBackground from '~/lib/ui/motion/animated-background'
import { Category } from '@payload-types'
import Link from 'next/link'

type Props = {
  categories: Category[]
  storeSlug?: string
}

export default async function CategoriesGrid({ categories, storeSlug }: Props) {
  const storeSlugNavigation = storeSlug ? storeSlug : 'all'

  if (!categories) return null
  return (
    <div className="space-y-5">
      <Heading title={`Categories (${categories?.length})`} />
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 mx-auto">
        <AnimatedBackground
          className="rounded-lg bg-accent"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          enableHover
        >
          {categories?.map((category) => {
            const image = typeof category.image !== 'string' ? category.image.url! : category.image
            return (
              <Link
                data-id={category.id}
                key={category.id}
                href={{ pathname: `/shop/${storeSlugNavigation}/${category.slug}` }}
                className="flex flex-col size-auto rounded-lg"
              >
                <GridItem
                  title={category.title}
                  image={image}
                  total={category?.products?.docs?.length || 0}
                />
              </Link>
            )
          })}
        </AnimatedBackground>
      </div>
    </div>
  )
}
