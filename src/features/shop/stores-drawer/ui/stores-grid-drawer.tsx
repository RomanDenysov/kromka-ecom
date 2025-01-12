'use client'

import { useEffect } from 'react'
import { useMountedState } from 'react-use'
import { StoresItem } from '~/features/shop/stores-drawer/ui'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '~/lib/ui/components/drawer'
import { useCurrentStore } from '~/store/store/use-current-store'
import { api } from '~/trpc/react'
import { useStoresDrawer } from '../hooks/use-stores-drawer'

const StoresGridDrawer = () => {
  const isMounted = useMountedState()
  const { data: stores, isLoading: isLoadingQuery } = api.stores.getStores.useQuery()
  const isOpen = useStoresDrawer((state) => state.isOpen)
  const onClose = useStoresDrawer((state) => state.onClose)
  const onOpen = useStoresDrawer((state) => state.onOpen)
  const store = useCurrentStore((state) => state.store)
  const isLoadingStore = useCurrentStore((state) => state.isLoading)

  const isLoading = isLoadingStore || isLoadingQuery

  useEffect(() => {
    if (!store && !isLoading) onOpen()
  }, [store, onOpen, isLoading])

  if (!stores || !isMounted) return null

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-5xl text-center">
          <DrawerHeader>
            <DrawerTitle>Naše Obchody</DrawerTitle>
            <DrawerDescription>
              Vyberte si obchod, v ktorom chcete nakupovať. Môžete ho kedykoľvek zmeniť v dolnej
              časti stránky.
            </DrawerDescription>
          </DrawerHeader>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 px-4 pb-2 h-full">
            {stores?.map((store) => <StoresItem store={store} key={store.id} />)}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default StoresGridDrawer
