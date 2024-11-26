'use client'

import { Store } from '@payload-types'

import { useCurrentStore } from '~/store/store/use-current-store'

type Props = {
  store: Store
  children: React.ReactNode
}

const StoreItemWrapper = ({ store, children }: Props) => {
  const setStore = useCurrentStore((state) => state.setStore)

  const handleClick = () => {
    setStore(store)
  }

  return (
    <button type="button" onClick={handleClick} className="select-none">
      {children}
    </button>
  )
}
export default StoreItemWrapper
