'use client'

import { BookIcon, ShoppingBagIcon } from 'lucide-react'
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/lib/ui/components/command'

import { useState } from 'react'
import { useDebounce } from '~/hooks/use-debounce'
import { CommandDialog } from '~/lib/ui/components/command'
import { DialogTitle } from '~/lib/ui/components/dialog'
import { formatPrice } from '~/lib/utils'

import { api } from '~/trpc/react'
import { useSearchModal } from '../hooks/use-searh-modal'

export const dynamic = 'force-dynamic'

export function SearchModal() {
  const isOpen = useSearchModal((state) => state.isOpen)
  const onClose = useSearchModal((state) => state.onClose)

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  const { data: products, isLoading } = api.products.search.useQuery(
    { searchTerm: debouncedSearch, limit: 5 },
    {
      enabled: debouncedSearch.length > 2,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  )

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Hľadať</DialogTitle>
      <CommandInput placeholder="Hľadať" value={searchTerm} onValueChange={setSearchTerm} />
      <CommandList>
        <CommandEmpty>Nenašli ste čo hľadáte?</CommandEmpty>
        <CommandGroup
          heading={`Produkty ${products && products.length ? `(${products.length})` : ''}`}
        >
          {products && products.length > 0
            ? products.map((product) => (
                <CommandItem key={product.id}>
                  <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{product.title}</span>
                  <span className="ml-auto font-mono text-xs">{formatPrice(product.price)}</span>
                </CommandItem>
              ))
            : searchTerm.length > 0 && <CommandItem disabled>Žiadne výsledky</CommandItem>}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
