'use client'

import { TagIcon, XIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDebounce } from 'react-use'
import { Button } from '~/lib/ui/components/button'
import { ScrollArea, ScrollBar } from '~/lib/ui/components/scroll-area'
import { Container } from '~/lib/ui/container'
import { Hint } from '~/lib/ui/hint'
import { cn } from '~/lib/utils'
import { api } from '~/trpc/react'

const CategoriesFilter = () => {
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

  const isCategorySelected = activeCategory.length > 0

  useDebounce(
    () => {
      if (isCategorySelected) {
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
    <div className="sticky top-16 py-2 z-40 bg-background size-full">
      <Container className="flex rounded-md px-1 gap-2 items-center justify-start">
        <Hint tooltip={isCategorySelected ? 'Resetovať kategorie' : 'Vybrat kategorie'}>
          <Button
            type="button"
            variant="ghost"
            size={'sm-icon'}
            onClick={() => setActiveCategory([])}
            aria-label={isCategorySelected ? 'Resetovať kategorie' : 'Vybrat kategorie'}
            className="text-primary font-semibold [&_svg]:size-5"
          >
            {isCategorySelected ? <XIcon /> : <TagIcon />}
          </Button>
        </Hint>
        <ScrollArea className="w-full whitespace-nowrap flex-grow py-1">
          <div className="flex flex-nowrap gap-2">
            {categories.map((category, index) => (
              <Button
                size={'sm'}
                type="button"
                variant={activeCategory.includes(category.slug || '') ? 'default' : 'outline'}
                key={category.title + index.toString()}
                onClick={() => toggleCategory(category.slug || '')}
                className={cn('px-2.5 font-semibold')}
              >
                {category.title}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Container>
    </div>
  )
}

export default CategoriesFilter
