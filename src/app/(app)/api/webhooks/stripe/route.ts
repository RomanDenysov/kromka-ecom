import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import stripe from 'stripe'
import Stripe from 'stripe'
import { env } from '~/env'
import { EmailService } from '~/lib/emails'
import { initPayload } from '~/server/payload/utils/payload'

async function getOrderDetails(orderId: string) {
  const payload = await initPayload()
  const order = await payload.findByID({
    collection: 'orders',
    id: orderId,
    depth: 2,
  })
  return order
}

async function updateOrderStatus(orderId: string, paymentStatus: 'paid' | 'failed') {
  const payload = await initPayload()

  await payload.update({
    collection: 'orders',
    id: orderId,
    data: {
      paymentStatus: paymentStatus === 'paid' ? 'completed' : 'cancelled',
      _isPaid: paymentStatus === 'paid',
      status: paymentStatus === 'paid' ? 'processing' : 'cancelled',
    },
  })

  if (paymentStatus === 'paid') {
    const orderDetails = await getOrderDetails(orderId)

    const store = typeof orderDetails.pickupStore !== 'string' ? orderDetails.pickupStore.title : ''
    const storeUrl =
      typeof orderDetails.pickupStore !== 'string' ? orderDetails.pickupStore.addressUrl : ''

    const profileEmail =
      typeof orderDetails.profile !== 'string'
        ? orderDetails.profile?.contacts?.email
        : typeof orderDetails.user !== 'string'
          ? orderDetails.user?.email
          : ''

    await EmailService.sendReceiptEmail({
      email: profileEmail!,
      date: new Date(orderDetails.createdAt).toISOString(),
      status: 'Zaplatené',
      orderId: orderDetails.id,
      method: orderDetails.method,
      pickupPlace: store,
      pickupPlaceUrl: storeUrl,
      // @ts-ignore
      products: orderDetails.productItems,
      total: orderDetails.total,
    })
  }
}

const eventHandlers = {
  'checkout.session.completed': async (event: Stripe.Event) => {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.metadata?.orderId) {
      await updateOrderStatus(session.metadata.orderId, 'paid')
    }
  },

  'payment_intent.succeeded': async (event: Stripe.Event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent

    if (paymentIntent.metadata?.orderId) {
      await updateOrderStatus(paymentIntent.metadata.orderId, 'paid')
    }
  },

  'payment_intent.payment_failed': async (event: Stripe.Event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent

    if (paymentIntent.metadata?.orderId) {
      await updateOrderStatus(paymentIntent.metadata.orderId, 'failed')
    }
  },
}

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)

    const handler = eventHandlers[event.type as keyof typeof eventHandlers]

    if (handler) {
      await handler(event)
      return NextResponse.json({ received: true })
    }

    return NextResponse.json({ error: `Unhandled event type ${event.type}` }, { status: 400 })
  } catch (error) {
    console.error('Stripe webhook error: ', error)
    return NextResponse.json({ error: `Webhook handler error: ${error}` }, { status: 400 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
