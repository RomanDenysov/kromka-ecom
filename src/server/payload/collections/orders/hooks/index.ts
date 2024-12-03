import { EmailService } from '~/lib/emails'
import { COLLECTIONS } from '~/server/payload/config'

interface Store {
  name: string
  address: string // Adjust based on your store schema
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

    const user = (await req.payload.findByID({
      collection: COLLECTIONS.USERS,
      id: data.user,
    })) as User

    const { pickupPlace, pickupPlaceUrl } = await getPickupStoreDetails(
      req.payload,
      data.pickupStore,
    )

    switch (data.status) {
      case 'processing':
        await EmailService.sendOrderConfirmationEmail({
          email: user.email,
          orderId: originalDoc.id,
          pickupPlace,
          pickupPlaceUrl,
        })
        break

      case 'ready':
        await EmailService.sendOrderReadyEmail({
          email: user.email,
          orderId: originalDoc.id,
          pickupPlace,
        })
        break

      case 'cancelled':
        const outOfStockProducts = data.products
          .filter((item: OrderProduct) => !item.product.inStock)
          .map((item: OrderProduct) => item.product.title)

        if (outOfStockProducts.length > 0) {
          await EmailService.sendOutOfStockEmail({
            email: user.email,
            orderId: originalDoc.id,
            productName: outOfStockProducts.join(', '),
          })
        }
        break
    }

    return data
  } catch (error) {
    console.error('Error in order status change hook:', error)
    throw error
  }
}
