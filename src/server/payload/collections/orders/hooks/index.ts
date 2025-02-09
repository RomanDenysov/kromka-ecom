import {
  sendOrderConfirmationEmail,
  sendOrderReadyEmail,
  sendOutOfStockEmail,
  sendThankYouEmail,
} from '~/lib/emails'
import { COLLECTIONS } from '~/server/payload/config'

interface Store {
  name: string
  address: string
}

interface User {
  email: string
}

interface Product {
  title: string
  inStock: boolean
}

interface OrderProduct {
  product: Product
  quantity: number
}

interface OrderDocument {
  id: string
  status: string
  products: OrderProduct[]
}

async function getPickupStoreDetails(payload: any, storeId: string) {
  const store = (await payload.findByID({
    collection: COLLECTIONS.STORES,
    id: storeId,
  })) as Store

  return {
    pickupPlace: store.name,
    pickupPlaceUrl: store.address,
  }
}

async function getEmailAddress(payload: any, userId: string): Promise<string> {
  const user = (await payload.findByID({
    collection: COLLECTIONS.USERS,
    id: userId,
  })) as User

  if (!user?.email) {
    throw new Error('No email found for order notification')
  }

  return user.email
}

export const handleStatusChange = async ({
  req,
  originalDoc,
  data,
}: {
  req: any
  originalDoc: OrderDocument
  data: any
}) => {
  try {
    if (originalDoc.status === data.status) {
      return data
    }

    const email = await getEmailAddress(req.payload, data.user)
    const { pickupPlace, pickupPlaceUrl } = await getPickupStoreDetails(
      req.payload,
      data.pickupStore,
    )

    switch (data.status) {
      case 'processing':
        await sendOrderConfirmationEmail({
          email,
          orderId: originalDoc.id,
          pickupPlace,
          pickupPlaceUrl,
        })
        break

      case 'ready':
        await sendOrderReadyEmail({
          email,
          orderId: originalDoc.id,
          pickupPlace,
        })
        break

      case 'cancelled':
        const outOfStockProducts = data.products
          .filter((item: OrderProduct) => !item.product.inStock)
          .map((item: OrderProduct) => item.product.title)

        if (outOfStockProducts.length > 0) {
          await sendOutOfStockEmail({
            email,
            orderId: originalDoc.id,
            productName: outOfStockProducts.join(', '),
          })
        }
        break

      case 'complete':
        await sendThankYouEmail({
          email,
          orderId: originalDoc.id,
        })
        break
    }

    return data
  } catch (error) {
    console.error('Error in order status change hook:', error)
    throw error
  }
}
