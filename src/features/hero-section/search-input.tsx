'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from '~/lib/ui/components/button'
import { Input } from '~/lib/ui/components/input'
import { useSearchModal } from '../search-modal/hooks/use-searh-modal'

export function SearchInput() {
  const onOpen = useSearchModal((state) => state.onOpen)
  return (
    <div className="relative w-full max-w-sm bg-card">
      <Input
        type="search"
        placeholder="Hľadať"
        className="h-12 w-full text-lg ring-1 ring-primary placeholder:text-primary/90"
        onFocus={onOpen}
      />
      <Button
        onClick={onOpen}
        size="icon"
        className="absolute top-0 right-0 h-12 w-12 rounded-l-none [&_svg]:size-5"
      >
        <SearchIcon size={32} />
      </Button>
    </div>
  )
}
