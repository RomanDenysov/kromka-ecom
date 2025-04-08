import { Metadata } from 'next/types'
import { Suspense } from 'react'
import CartList from '~/features/checkout/cart-items-list/cart-list'

import { CartTitleCounter } from '~/features/checkout/cart-items-list/cart-title-counter'
import { CheckoutForm } from '~/features/checkout/ui/checkout-form'
import { Container } from '~/lib/ui/container'
import { createMetadata } from '~/lib/utils/metadata'


const meta = {
  title: 'Dokončenie objednávky | Košík',
  description: 'Dokončenie objednávky',
  image: `images/end-banner.webp`,
}

export const metadata: Metadata = createMetadata(meta)

export default function CheckoutPage() {
  return (
    <Container className="py-5 md:py-10 space-y-5">
      <CartTitleCounter />
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
        <section className="mb-10 size-full lg:col-span-7 lg:mb-0">
          <CartList />
        </section>
        <Suspense fallback={null}>
          <CheckoutForm className="lg:col-span-5 space-y-5 size-full" />
        </Suspense>
      </div>
    </Container>
  )
}
