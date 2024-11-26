'use client'

import { CheckIcon, ChevronsUpDown, StoreIcon } from 'lucide-react'
import { memo, useCallback, useEffect } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '~/lib/ui/components/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/lib/ui/components/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/lib/ui/components/popover'
import { Skeleton } from '~/lib/ui/components/skeleton'
import { api } from '~/trpc/react'
import { Store } from '@payload-types'
import { useCurrentStore } from '~/store/store/use-current-store'

type Props = {
  width?: string
  onStoreChange?: (store: Store) => void
  className?: string
}

const StoreSelector = memo(({ width, onStoreChange, className }: Props) => {
  const { data: stores, isLoading } = api.stores.getStores.useQuery()
  const store = useCurrentStore((state) => state.store)
  const setStore = useCurrentStore((state) => state.setStore)
  // const [open, setOpen] = useState<boolean>(false)
  // const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    if (store) {
      setStore(store)
      onStoreChange?.(store)
    }
  }, [store, setStore])

  const handleSelect = useCallback(
    (selectedValue: string) => {
      const selectedStore = stores?.find((s) => s.id === selectedValue)
      if (selectedStore) {
        setStore(selectedStore)
        onStoreChange?.(selectedStore)
      }
    },
    [stores, setStore, onStoreChange],
  )

  if (isLoading || !stores) {
    return <StoreSelectorPlaceholder width={width} />
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={'lg'}
          role="combobox"
          aria-haspopup="listbox"
          aria-label="Store selector"
          variant={'outline'}
          className={cn('w-[200px] px-2.5 items-center justify-between', width, className)}
        >
          <StoreIcon size={20} className="text-muted-foreground" />
          {store?.title || 'Vyberte si obchod...'}
          <ChevronsUpDown size={16} className="ml-auto shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0 text-sm tracking-tight')} align="start">
        <Command className="w-[200px]">
          <CommandInput placeholder="Hladaj..." />
          <CommandList>
            <CommandEmpty>Nenašlo sa nič vyhovujúceho vášmu hľadaní.</CommandEmpty>
            <CommandGroup heading="Naše obchody">
              {stores.map((s) => (
                <CommandItem
                  key={s.slug}
                  className="text-sm tracking-tight"
                  onSelect={() => handleSelect(s.id)}
                  value={s.title}
                >
                  <StoreIcon size={16} className="mr-2 text-muted-foreground" />
                  {s.title}
                  <CheckIcon
                    size={16}
                    className={cn(
                      'ml-auto text-muted-foreground',
                      store?.id === s.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})

const StoreSelectorPlaceholder = ({ width }: Props) => {
  return (
    <Skeleton
      className={cn('flex h-10 w-[200px] items-center justify-between rounded-md px-3 py-2', width)}
    >
      <Skeleton className="h-4 w-4 rounded-md bg-primary/20" />
      <Skeleton className="h-4 w-2/3 rounded-md bg-primary/20" />
      <Skeleton className="h-4 w-4 rounded-md bg-primary/20" />
    </Skeleton>
  )
}

export default StoreSelector
