import { Metadata } from 'next/types'
import AuthCard from '~/features/auth/ui/auth-card'
import { Container } from '~/lib/ui/container'
import { createMetadata } from '~/lib/utils/metadata'

const meta = {
  title: 'Prihlásenie',
  description: 'Prihláste sa do vášho zákazníckeho účtu v Pekárni Kromka. Získajte prístup k histórii vašich objednávok, sledujte vaše nákupy, uložte si obľúbené produkty a využívajte špeciálne ponuky pre registrovaných zákazníkov.'
}

export const metadata: Metadata = createMetadata(meta)

export default function SignInPage() {
  return (
    <section className="grid place-content-center size-full min-h-screen bg-center bg-cover bg-kromka_vyklad">
      <Container>
        <AuthCard />
      </Container>
    </section>
  )
}
