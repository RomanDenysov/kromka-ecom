import { Footer } from '~/widgets/footer'
import { Header } from '~/widgets/header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative mx-auto min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
