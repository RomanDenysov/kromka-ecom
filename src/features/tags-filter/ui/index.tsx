'use client'

import { Tag } from '@payload-types'
import { TagIcon, XIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDebounce } from 'react-use'
import { Button } from '~/lib/ui/components/button'
import { ScrollArea, ScrollBar } from '~/lib/ui/components/scroll-area'
import { Container } from '~/lib/ui/container'
import { Hint } from '~/lib/ui/hint'
import { cn } from '~/lib/utils'

export function TagsFilter(props: { tags: Tag[] }) {
  const [activeTag, setActiveTag] = useState<string[]>([])
  const { tags } = props

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

  const isTagSelected = activeTag.length > 0

  useDebounce(
    () => {
      if (isTagSelected) {
        router.push(`${pathname}?${createQueryString('tags', activeTag.join(','))}`)
      } else {
        router.push(pathname)
      }
    },
    500,
    [activeTag, router, pathname, createQueryString],
  )

  const toggleTag = (tag: string) => {
    if (activeTag.includes(tag)) {
      setActiveTag((prev) => prev.filter((item) => item !== tag))
    } else {
      setActiveTag((prev) => [...prev, tag])
    }
  }

  return (
    <div className="sticky top-16 py-2 bg-background w-full z-40">
      <Container className="flex items-center justify-start gap-2">
        <Hint tooltip={isTagSelected ? 'Resetovať tagy' : 'Vybrat tagy'}>
          <Button
            type="button"
            variant={'ghost'}
            size={'sm-icon'}
            aria-label={isTagSelected ? 'Resetovať tagy' : 'Vybrat tagy'}
            onClick={() => setActiveTag([])}
            className="text-primary font-semibold [&_svg]:size-5"
          >
            {isTagSelected ? <XIcon /> : <TagIcon />}
          </Button>
        </Hint>
        <ScrollArea className="w-full whitespace-nowrap flex-grow py-1">
          <div className="flex flex-nowrap gap-2">
            {tags.map((tag) => (
              <Button
                key={tag.id}
                variant={activeTag.includes(tag.title) ? 'default' : 'outline'}
                size={'sm'}
                onClick={() => toggleTag(tag.title)}
                className={cn('px-2.5 font-semibold capitalize')}
              >
                {tag.title}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Container>
    </div>
  )
}
