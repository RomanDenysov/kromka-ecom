'use client'

import { TagIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { Button } from '~/lib/ui/components/button'
import { ScrollArea, ScrollBar } from '~/lib/ui/components/scroll-area'
import { Container } from '~/lib/ui/container'
import { cn } from '~/lib/utils'
import { api } from '~/trpc/react'

const CategoriesCarousel = () => {
  const [categories] = api.categories.getAll.useSuspenseQuery()
  const [activeCategory, setActiveCategory] = useState<string[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  useDebounce(
    () => {
      if (activeCategory.length > 0) {
        router.push(`${pathname}?${createQueryString('category', activeCategory.join(','))}`)
      } else {
        router.push(pathname)
      }
    },
    500,
    [activeCategory, router, pathname, createQueryString],
  )

  const toggleCategory = (category: string) => {
    if (activeCategory.includes(category)) {
      setActiveCategory((prev) => prev.filter((item) => item !== category))
    } else {
      setActiveCategory((prev) => [...prev, category])
    }
  }

  return (
    <section className="sticky top-16 z-40">
      <div className="bg-background size-full">
        <Container>
          <div className="flex rounded-lg px-1 gap-3 items-center justify-start">
            <TagIcon size={20} className="text-muted-foreground hidden sm:block" />
            <Button
              type="button"
              variant={'outline'}
              size={'sm'}
              onClick={() => setActiveCategory([])}
              className="px-2.5 text-primary font-semibold"
            >
              {activeCategory.length > 0 ? 'Resetovať' : 'Všetky'}
            </Button>
            <ScrollArea className="w-full whitespace-nowrap flex-grow py-1">
              <div className="flex flex-nowrap gap-3">
                {categories.map((category, index) => (
                  <Button
                    size={'sm'}
                    type="button"
                    variant={'outline'}
                    key={category.title + index.toString()}
                    onClick={() => toggleCategory(category.slug || '')}
                    className={cn(
                      'px-2.5 text-primary font-semibold',
                      activeCategory.includes(category.slug || '') && 'bg-accent',
                    )}
                  >
                    {category.title}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default CategoriesCarousel
