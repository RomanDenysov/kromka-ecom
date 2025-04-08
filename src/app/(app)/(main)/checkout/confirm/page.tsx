import { Metadata } from 'next/types'
import { ConfirmOrderCard } from '~/features/confirm-order-card/ui'
import { Container } from '~/lib/ui/container'
import { createMetadata } from '~/lib/utils/metadata'
import { api } from '~/trpc/server'

type Param = string | string[] | undefined

type Props = {
  readonly searchParams: Promise<{
    [key: string]: Param
  }>
}

const meta = {
  title: 'Dokončenie objednávky | Košík',
  description: 'Prehľad objednávky, ktorú ste si objednali',
  image: '/images/end-banner.webp',
}

export const metadata: Metadata = createMetadata(meta)

export default async function CheckoutConfirmPage({ searchParams }: Props) {
  const { order } = await searchParams
  const decodedOrderId = decodeURIComponent(order as string)
  const orderData = await api.orders.byId({ id: decodedOrderId })

  return (
    <Container className="py-8 md:py-16 space-y-12">
      <ConfirmOrderCard orderId={decodedOrderId} initialData={orderData} />
    </Container>
  )
}
