import { Container } from '~/lib/ui/container'

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
  console.log('ORDER', decodedOrderId)
  return (
    <Container>
      <h1>Confirm</h1>
    </Container>
  )
}
