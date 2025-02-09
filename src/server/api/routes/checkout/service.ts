import 'server-only'
import { TRPCError } from '@trpc/server'
import type { Payload } from 'payload'
import { cache } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { env } from '~/env'
import { sendNewOrderEmail, sendReceiptEmail } from '~/lib/emails'
import { DateService, PriceFormatter } from '~/lib/utils'
import { initPayload } from '~/server/payload/utils/payload'
import { CheckoutOptions, CheckoutProduct } from './validator'

interface OrderProduct {
  title: string
  price: number
  quantity: number
}

interface CheckoutUser {
  id?: string
  email: string
  name: string
  phone: string
}

const ADMIN_EMAILS = ['romandenysovsk@gmail.com', 'kromka@kavejo.sk']
// const ADMIN_EMAILS = ['romandenysovsk@gmail.com']

const BASE_URL = `${env.NEXT_PUBLIC_SERVER_URL}/checkout`

let payloadInstance: Payload | null = null

const getPayload = cache(async () => {
  if (!payloadInstance) {
    payloadInstance = await initPayload()
  }
  return payloadInstance
})

function getSuccessUrl(orderId: string) {
  return `${BASE_URL}/confirm?order=${orderId}`
}

async function getProducts(productsIds: string[]) {
  const payload = await getPayload()

  const { docs: items } = await payload.find({
    collection: 'products',
    where: { id: { in: productsIds } },
    depth: 2,
  })

  if (!items.length) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid products ids' })
  }

  return items
}

export function calculateOrderDetails(
  items: any[],
  products: { product: string; quantity?: number }[],
) {
  const orderDetails = products.reduce<{
    totalPrice: number
    orderProducts: OrderProduct[]
  }>(
    (acc, { product, quantity = 1 }) => {
      const item = items.find((i) => i.id === product)

      if (!item || typeof item.price !== 'number') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Invalid product price ${product}`,
        })
      }

      return {
        totalPrice: acc.totalPrice + item.price * quantity,
        orderProducts: [
          ...acc.orderProducts,
          {
            title: item.title,
            price: item.price,
            quantity,
          },
        ],
      }
    },
    { totalPrice: 0, orderProducts: [] },
  )

  return orderDetails
}

async function findOrCreateUser(options: CheckoutOptions): Promise<CheckoutUser> {
  const payload = await getPayload()

  // Попробуем найти пользователя по email
  const { docs: existingUsers } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: options.email.toLowerCase(),
      },
    },
  })

  if (existingUsers.length > 0) {
    const user = existingUsers[0]
    // Обновляем информацию о пользователе, если она изменилась
    if (user.name !== options.name || user.phone !== options.phone) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          name: options.name,
          phone: options.phone,
        },
      })
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name ?? '',
      phone: user.phone ?? '',
    }
  }

  try {
    const userData = {
      id: uuidv4(),
      email: options.email.toLowerCase(),
      name: options.name,
      phone: options.phone,
      role: 'user' as const, // вернем role, он может быть нужен
    }

    console.log('Attempting to create user with data:', userData)

    const newUser = await payload.create({
      collection: 'users',
      data: userData,
    }) // убрали лишнюю скобку

    console.log('Payload response:', newUser)

    if (!newUser?.id) {
      throw new Error('User created but no ID returned')
    }

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name ?? '',
      phone: newUser.phone ?? '',
    }
  } catch (error) {
    console.error('Detailed create error:', {
      error,
    })
    throw error
  }
}

export async function createOrder(
  options: CheckoutOptions,
  totalPrice: number,
  products: OrderProduct[],
  user: CheckoutUser,
) {
  const payload = await getPayload()

  const order = await payload.create({
    collection: 'orders',
    data: {
      user: user.id,
      pickupStore: options.store,
      productItems: products,
      pickupDate: DateService.formatToISO(options.date),
      status: 'new',
      total: PriceFormatter.formatPriceNumber(totalPrice),
      _isPaid: false,
    },
  })

  console.log('Created order:', order) // Добавим лог
  return order
}

export async function checkOrderStatus(orderId: string) {
  const payload = await getPayload()
  const order = await payload.findByID({
    collection: 'orders',
    id: orderId,
  })

  return {
    status: order?.status,
  }
}

async function sendOrderEmails(order: any, user: CheckoutUser) {
  const getPickupPlace = (store: any) => {
    if (typeof store === 'string') return ''
    return store.title || ''
  }

  const getPickupPlaceUrl = (store: any) => {
    if (typeof store === 'string') return ''
    return store.addressUrl || ''
  }
  try {
    await Promise.all([
      sendReceiptEmail({
        email: user.email,
        date: DateService.formatForEmail(order.createdAt),
        status: 'Nová objednávka',
        orderId: order.id,
        method: 'store',
        pickupPlace: getPickupPlace(order.pickupStore),
        pickupPlaceUrl: getPickupPlaceUrl(order.pickupStore),
        products: order.productItems.map((item: any) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        pickupDate: DateService.formatForEmail(order.pickupDate),
        total: order.total,
      }),
      sendNewOrderEmail({
        email: ADMIN_EMAILS,
        orderId: order.id,
        pickupPlace: getPickupPlace(order.pickupStore),
        products: order.productItems.map((item: any) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        paymentMethod: 'store',
        pickupTime: DateService.formatForEmail(order.pickupDate),
        customer: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      }),
    ])
  } catch (error) {
    console.log('Failed to send order emails:', error)
  }
}

export async function processCheckout(products: CheckoutProduct[], options: CheckoutOptions) {
  try {
    console.log('Starting checkout with products:', products)
    console.log('Options:', options)

    // Get products and create/update user
    const [items, user] = await Promise.all([
      getProducts(products.map(({ product }) => product)),
      findOrCreateUser(options),
    ])

    console.log('Retrieved items:', items)
    console.log('User:', user)

    // Calculate order details
    const { totalPrice, orderProducts } = calculateOrderDetails(items, products)
    console.log('Order details:', { totalPrice, orderProducts })

    // Create order
    const order = await createOrder(options, totalPrice, orderProducts, user)

    // Send emails
    await sendOrderEmails(order, user)

    // Return success URL
    return { url: getSuccessUrl(order.id) }
  } catch (error) {
    console.error('Checkout process failed:', error)
    throw error
  }
}
