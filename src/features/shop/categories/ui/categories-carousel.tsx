'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '~/lib/ui/components/button'
import { ScrollArea, ScrollBar } from '~/lib/ui/components/scroll-area'
import { cn } from '~/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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

  useEffect(() => {
    if (activeCategory.length > 0) {
      router.push(pathname + '?' + createQueryString('category', activeCategory.join(',')))
    } else {
      router.push(pathname)
    }
  }, [activeCategory, router, pathname, createQueryString])

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
        <div className="flex rounded-lg px-1 items-center justify-start border">
          <Button
            type="button"
            variant={'outline'}
            onClick={() => setActiveCategory([])}
            className="mr-2 px-2.5 text-primary font-semibold"
          >
            {activeCategory.length > 0 ? 'Reset' : 'All'}
          </Button>
          <ScrollArea className="w-full whitespace-nowrap flex-grow py-1">
            <div className="flex flex-nowrap">
              {categories.map((category, index) => (
                <Button
                  type="button"
                  variant={'outline'}
                  key={category.title + index.toString()}
                  onClick={() => toggleCategory(category.slug!)}
                  className={cn(
                    'px-2.5 mr-2 last:mr-0 text-primary font-semibold',
                    activeCategory.includes(category.slug!) && 'bg-accent',
                  )}
                >
                  {category.title}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  )
}

export default CategoriesCarousel
