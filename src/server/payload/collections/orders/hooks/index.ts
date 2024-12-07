import { EmailService } from '~/lib/emails'
import { COLLECTIONS } from '~/server/payload/config'

interface Store {
  name: string
  address: string // Adjust based on your store schema
}

interface User {
  email: string
}
interface Profile {
  contacts?: {
    email?: string
  }
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

async function getEmailAddress(payload: any, data: any): Promise<string> {
  // Если есть user, пробуем получить email оттуда
  if (data.user) {
    try {
      const user = (await payload.findByID({
        collection: COLLECTIONS.USERS,
        id: data.user,
      })) as User
      if (user?.email) return user.email
    } catch (error) {
      console.log('Failed to get user email:', error)
    }
  }

  // Если нет email у user или user не найден, пробуем получить из профиля
  if (data.profile) {
    try {
      const profile = (await payload.findByID({
        collection: COLLECTIONS.PROFILES,
        id: data.profile,
      })) as Profile
      if (profile?.contacts?.email) return profile.contacts.email
    } catch (error) {
      console.log('Failed to get profile email:', error)
    }
  }

  throw new Error('No email found for order notification')
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

    const email = await getEmailAddress(req.payload, data)
    const { pickupPlace, pickupPlaceUrl } = await getPickupStoreDetails(
      req.payload,
      data.pickupStore,
    )

    switch (data.status) {
      case 'processing':
        await EmailService.sendOrderConfirmationEmail({
          email: email,
          orderId: originalDoc.id,
          pickupPlace,
          pickupPlaceUrl,
        })
        break

      case 'ready':
        await EmailService.sendOrderReadyEmail({
          email: email,
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
            email: email,
            orderId: originalDoc.id,
            productName: outOfStockProducts.join(', '),
          })
        }
        break

      case 'complete':
        await EmailService.sendThankYouEmail({
          email: email,
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
