import { SubscribeSection } from '~/features/subscribe-section/ui'
import { Container } from '~/lib/ui/container'

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container className="py-5 md:py-8 space-y-5 md:space-y-10">
      {children}
      <SubscribeSection />
    </Container>
  )
}
