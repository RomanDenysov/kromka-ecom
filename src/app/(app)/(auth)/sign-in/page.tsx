import AuthCard from '~/features/auth/ui/auth-card'
import { Container } from '~/lib/ui/container'

export default function SignInPage() {
  return (
    <section className="grid place-content-center size-full min-h-screen bg-center bg-cover bg-kromka_vyklad">
      <Container>
        <AuthCard />
      </Container>
    </section>
  )
}
