import { Suspense } from 'react'
import { CartList, Info, Options, Summary } from '~/features/checkout/ui'
import { CartTitleCounter } from '~/features/checkout/ui/cart-title-counter'
import CheckoutForm from '~/features/checkout/ui/checkout-form'
import { Container } from '~/lib/ui/container'

export default async function CheckoutPage() {
  return (
    <Container className="py-5 md:py-10 space-y-5">
      <CartTitleCounter />
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
        <section className="mb-10 size-full lg:col-span-7 lg:mb-0">
          <CartList />
        </section>
        <Suspense fallback={null}>
          <CheckoutForm className="size-full space-y-5 lg:col-span-5">
            <Info />
            <Options />
            <Summary />
          </CheckoutForm>
        </Suspense>
      </div>
    </Container>
  )
}
