import { ConfirmOrderCard } from '~/features/confirm-order-card/ui'
import { Container } from '~/lib/ui/container'
import { api } from '~/trpc/server'

type Param = string | string[] | undefined

type Props = {
  params: Promise<{
    category: string
  }>
  searchParams: Promise<{
    [key: string]: Param
  }>
}
export default async function CheckoutConfirmPage({ params, searchParams }: Props) {
  const { order } = await searchParams
  const decodedOrderId = decodeURIComponent(order as string)
  const orderData = await api.orders.byId({ id: decodedOrderId })

  return (
    <Container className="py-8 md:py-16 space-y-12">
      <ConfirmOrderCard orderId={decodedOrderId} />
    </Container>
  )
}
