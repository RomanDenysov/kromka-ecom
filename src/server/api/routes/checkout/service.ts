import { stripe } from '~/lib/stripe'
import { env } from '~/env'
import { Payload } from 'payload'
import { initPayload } from '~/server/payload/utils/payload'
import { TRPCError } from '@trpc/server'
import { CheckoutOptions, CheckoutProduct } from './validator'
import { Profile, User } from '~/server/payload/payload-types'
import Stripe from 'stripe'
import { PriceFormatter } from '~/lib/utils'
import { EmailService } from '~/lib/emails'
import { UpdateProfileSchema } from '../profiles/validator'

interface OrderProduct {
  productId: string
  quantity: number
  priceId?: string
}

interface CheckoutUser {
  id?: string
  email?: string | null
  name?: string | null
}

export class CheckoutService {
  private static readonly BASE_URL = `${env.NEXT_PUBLIC_SERVER_URL}/checkout`
  private static payload: Payload | null = null

  private static async getPayloadInstance() {
    if (!this.payload) {
      this.payload = await initPayload()
    }
    return this.payload
  }

  static async getProducts(productsIds: string[]) {
    const payload = await this.getPayloadInstance()
    const { docs: items } = await payload.find({
      collection: 'products',
      where: { id: { in: productsIds } },
      depth: 2,
    })

    if (!items.length) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid products',
      })
    }

    return items
  }

  static calculateOrderDetails(items: any[], products: { product: string; quantity?: number }[]) {
    let totalPrice = 0
    const orderProducts: OrderProduct[] = []

    for (const item of items) {
      const productData = products.find(({ product }) => product === item.id)
      const quantity = productData?.quantity ?? 1

      if (typeof item.price !== 'number') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid product price',
        })
      }

      totalPrice += item.price * quantity
      orderProducts.push({
        productId: item.id,
        quantity,
        priceId: item?.priceId || '',
      })
    }

    return {
      totalPrice,
      orderProducts,
    }
  }

  static async getProfile(profileId: string) {
    const payload = await this.getPayloadInstance()
    const profile = await payload.findByID({
      collection: 'profiles',
      id: profileId,
    })

    if (!profile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Profile not found',
      })
    }

    return profile
  }

  static async updateProfile(profileId: string, options: CheckoutOptions) {
    const payload = await this.getPayloadInstance()
    await payload.update({
      collection: 'profiles',
      id: profileId,
      data: {
        contacts: {
          name: options.name,
          phone: options.phone,
          email: options.email,
        },
        customerOptions: {
          store: options.store,
          method: options.method,
        },
        options: {
          terms: options.terms,
          privacy: true,
          cookie: true,
        },
      },
    })
  }

  static async createOrder(
    options: CheckoutOptions,
    totalPrice: number,
    products: CheckoutProduct[],
    profile: Profile | null,
    user?: CheckoutUser | null,
  ) {
    const payload = await this.getPayloadInstance()

    return payload.create({
      collection: 'orders',
      data: {
        user: user?.id || null,
        profile: profile?.id || null,
        pickupStore: profile?.customerOptions?.store || options.store,
        productItems: products,
        pickupDate: options.date.toISOString(),
        method: options.method || profile?.customerOptions?.method,
        paymentStatus: 'pending',
        status: 'new',
        optionalPrice: null,
        total: PriceFormatter.formatPriceNumber(totalPrice),
        _isPaid: false,
      },
    })
  }

  static getSuccessUrl(orderId: string) {
    return `${this.BASE_URL}/confirm?order=${orderId}`
  }

  static async createStripeSession(
    orderProducts: OrderProduct[],
    orderId: string,
    userEmail: string,
  ) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = orderProducts.map(
      (product) => ({
        price: product.priceId,
        quantity: product.quantity,
        adjustable_quantity: { enabled: false },
      }),
    )

    return stripe.checkout.sessions.create({
      payment_method_types: ['card', 'mobilepay'],
      line_items: lineItems,
      mode: 'payment',
      success_url: this.getSuccessUrl(orderId),
      cancel_url: this.BASE_URL,
      metadata: {
        userInfo: userEmail,
        orderId,
      },

      payment_intent_data: {
        metadata: {
          orderId,
        },
      },
    })
  }

  static async checkOrderStatus(orderId: string) {
    const payload = await this.getPayloadInstance()
    const order = await payload.findByID({
      collection: 'orders',
      id: orderId,
    })

    return {
      isPaid: order?._isPaid || false,
      status: order?.status,
      paymentStatus: order?.paymentStatus,
    }
  }

  static async processCheckout(
    products: CheckoutProduct[],
    options: CheckoutOptions,
    user?: CheckoutUser,
  ) {
    const profile = await this.getProfile(options!.profileId!)
    const items = await this.getProducts(products.map(({ product }) => product))
    const { totalPrice, orderProducts } = this.calculateOrderDetails(items, products)

    await this.updateProfile(profile.id, options)

    const order = await this.createOrder(options, totalPrice, products, profile, user)

    const userEmail = options.email ?? user?.email ?? profile?.contacts?.email
    const userName = user?.name ?? profile?.contacts?.name ?? options.name
    const userPhone = profile?.contacts?.phone ?? options.phone

    if (options.method === 'store') {
      await EmailService.sendReceiptEmail({
        email: userEmail,
        date: new Date(order.createdAt),
        status: 'Nová objednávka',
        orderId: order.id,
        method: order.method,
        pickupPlace: typeof order.pickupStore !== 'string' ? order.pickupStore.title : '',
        pickupPlaceUrl: typeof order.pickupStore !== 'string' ? order.pickupStore.addressUrl : '',
        // @ts-ignore
        products: order.productItems,
        total: order.total,
      })

      await EmailService.sendNewOrderEmail({
        email: ['romandenysovsk@gmail.com'],
        orderId: order.id,
        pickupPlace: typeof order.pickupStore !== 'string' ? order.pickupStore.title : '',
        // @ts-ignore
        products: order.productItems,
        paymentMethod: order.method,
        pickupTime: new Date(order.pickupDate),
        customer: {
          name: userName,
          email: userEmail,
          phone: userPhone,
        },
      })
      return {
        url: this.getSuccessUrl(order.id),
      }
    }

    const paymentSession = await this.createStripeSession(orderProducts, order.id, userEmail)

    return {
      url: paymentSession.url,
    }
  }
}
