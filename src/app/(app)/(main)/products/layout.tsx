import { StoresGridDrawer } from '~/features/shop/stores-drawer/ui'

type Props = {
  readonly children: React.ReactNode
}

export default async function Layout({ children }: Props) {
  return (
    <>
      <StoresGridDrawer />
      {children}
    </>
  )
}
