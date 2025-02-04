import { Footer } from '~/widgets/footer'
import { Header } from '~/widgets/header'

type Props = {
  readonly children: React.ReactNode
}

export default async function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="relative mx-auto min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
