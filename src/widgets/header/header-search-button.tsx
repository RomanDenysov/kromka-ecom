'use client'

import { SearchIcon } from 'lucide-react'
import { useSearchModal } from '~/features/search-modal/hooks/use-searh-modal'
import { Button } from '~/lib/ui/components/button'

export function HeaderSearchButton() {
  const onOpen = useSearchModal((state) => state.onOpen)
  return (
    <Button
      onClick={onOpen}
      variant="ghost"
      size="icon"
      className="rounded-full size-10 p-0 [&_svg]:size-5"
    >
      <SearchIcon size={24} />
    </Button>
  )
}
