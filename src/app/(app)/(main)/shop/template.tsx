import Breadcrumbs from '~/lib/ui/breadcrumbs'
import { Container } from '~/lib/ui/container'

export default function ShopTemplate({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Container className="py-5">
        <Breadcrumbs />
      </Container>
      {children}
    </>
  )
}
