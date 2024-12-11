'use client'
import { Button } from '~/lib/ui/components/button'
import { useCurrentStore } from '~/store/store/use-current-store'
import { useStoresDrawer } from '../hooks/use-stores-drawer'

const CallStoresDrawerButton = () => {
  const store = useCurrentStore((state) => state.store)
  const onOpen = useStoresDrawer((state) => state.onOpen)

  return <Button onClick={onOpen}>{store?.title}</Button>
}

export default CallStoresDrawerButton
