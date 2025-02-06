'use client'

import { Media } from '@payload-types'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from '~/hooks/use-debounce'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/lib/ui/components/command'
import { DialogTitle } from '~/lib/ui/components/dialog'
import { formatPrice } from '~/lib/utils'
import { api } from '~/trpc/react'
import { useSearchModal } from '../hooks/use-searh-modal'

export const dynamic = 'force-dynamic'

export function SearchModal() {
  const router = useRouter()
  const isOpen = useSearchModal((state) => state.isOpen)
  const onClose = useSearchModal((state) => state.onClose)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  const { data: products, isLoading } = api.products.search.useQuery(
    { searchTerm: debouncedSearch, limit: 8 },
    {
      enabled: debouncedSearch.length > 2,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  )

  const handleSelect = (productSlug: string) => {
    router.push(`/products/${productSlug}`)
    onClose()
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Vyhladať produkty</DialogTitle>

      <CommandInput
        placeholder="Hľadať produkty..."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />

      <CommandList>
        {debouncedSearch.length <= 2 && (
          <CommandEmpty className="py-6 text-center text-sm">
            Začnite písať pre vyhľadávanie produktov...
          </CommandEmpty>
        )}

        {debouncedSearch.length > 2 && !isLoading && !products?.length && (
          <CommandEmpty className="py-6 text-center text-sm">
            Nenašli sa žiadne produkty pre "{debouncedSearch}"
          </CommandEmpty>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-6">
            <Loader2Icon className="h-4 w-4 animate-spin" />
            <span className="ml-2 text-sm">Vyhľadávanie...</span>
          </div>
        )}

        {products && products.length > 0 && (
          <CommandGroup heading="Produkty">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={product.title}
                onSelect={() => handleSelect(product.slug!)}
                className="cursor-pointer max-h-[72px]"
              >
                <Image
                  src={(product.images[0]?.image as Media).url ?? '/placeholder.png'}
                  alt={product.title}
                  quality={70}
                  width={60}
                  height={60}
                  className="rounded-md aspect-square object-cover object-center"
                />

                <span className="ml-2 text-base font-medium">
                  {product.title}
                </span>
                <span className='ml-auto mr-2 font-mono text-base font-semibold'>
                  {formatPrice(product.price)}
                </span>
                {/* <div className="flex flex-1 items-center gap-2">
                  <span className="flex-1"></span>
                </div>
                {product.price && (
                  <span
                    className={cn(
                      "ml-auto font-mono text-xs",
                      product.price && "text-green-600 dark:text-green-400"
                    )}
                  >
                    {formatPrice(product.price)}
                  </span>
                )} */}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}

