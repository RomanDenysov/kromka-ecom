import { Container } from '~/lib/ui/container'

export default function ShopLayout({
  children,
  breadcrumb,
}: Readonly<{ children: React.ReactNode; breadcrumb: React.ReactNode }>) {
  return (
    <>
      {/* <Container className="py-5">{breadcrumb}</Container> */}
      {children}
    </>
  )
}
