import type { Product } from '@payload-types'
import { render } from '@react-email/components'
import { sendEmail } from './config'
import { NewOrderEmail } from './templates/new-order-email'
import { OrderConfirmationEmail } from './templates/order-confirmation-email'
import { OrderReadyEmail } from './templates/order-ready-email'
import { OutOfStockEmail } from './templates/out-of-stock-email'
import { ReceiptEmail } from './templates/receipt-email'
import { ThankYouEmail } from './templates/thank-you-email'
import { formatOrderId } from './utils'

interface OrderProduct {
  title: string
  price: number
  quantity: number
}
// Base types
interface BaseEmailData {
  email: string | string[]
  orderId: string
}

interface BaseOrderData extends BaseEmailData {
  pickupPlace: string
}

// Email types
export interface ReceiptEmailData extends BaseOrderData {
  date: string
  status: string
  method: 'card' | 'store'
  pickupPlaceUrl: string
  products: OrderProduct[]
  pickupDate: string
  total: number
}

export interface NewOrderEmailData extends BaseOrderData {
  products: OrderProduct[]
  paymentMethod: 'card' | 'store'
  pickupTime: string
  customer: {
    name: string
    email: string
    phone: string
  }
}

export interface OrderConfirmationData extends BaseOrderData {
  pickupPlaceUrl: string
}

export interface OrderReadyData extends BaseOrderData {}

export interface OutOfStockData extends BaseEmailData {
  productName: string
}

export interface ThankYouData extends BaseEmailData {}

// Email templates type
type EmailType =
  | { type: 'receipt'; data: ReceiptEmailData }
  | { type: 'order-confirmation'; data: OrderConfirmationData }
  | { type: 'order-ready'; data: OrderReadyData }
  | { type: 'out-of-stock'; data: OutOfStockData }
  | { type: 'thank-you'; data: ThankYouData }
  | { type: 'new-order'; data: NewOrderEmailData }

// Render template based on type
const renderTemplate = async ({ type, data }: EmailType): Promise<string> => {
  switch (type) {
    case 'receipt':
      return render(ReceiptEmail(data))
    case 'order-confirmation':
      return render(OrderConfirmationEmail(data))
    case 'order-ready':
      return render(OrderReadyEmail(data))
    case 'out-of-stock':
      return render(OutOfStockEmail(data))
    case 'thank-you':
      return render(ThankYouEmail(data))
    case 'new-order':
      return render(NewOrderEmail(data))
  }
}

// Get email subject based on type
const getEmailSubject = ({ type, data }: EmailType): string => {
  switch (type) {
    case 'receipt':
      return `Objednávka #${formatOrderId(data.orderId)} - Pekaren Kromka`
    case 'order-confirmation':
      return `Už sa to pečie! Objednávka #${formatOrderId(data.orderId)} - Pekaren Kromka`
    case 'order-ready':
      return `Vaša objednávka #${formatOrderId(data.orderId)} je pripravená - Pekaren Kromka`
    case 'out-of-stock':
      return `Produkt nie je k dispozícii - Objednávka #${formatOrderId(data.orderId)} - Pekaren Kromka`
    case 'thank-you':
      return `Ďakujeme za vašu objednávku - Pekaren Kromka`
    case 'new-order':
      return `Nová objednávka #${formatOrderId(data.orderId)} - Pekaren Kromka`
  }
}

// Main send email function
export const sendEmailByType = async (emailData: EmailType) => {
  const html = await renderTemplate(emailData)
  const subject = getEmailSubject(emailData)

  return sendEmail(emailData.data.email, subject, html)
}

// Helper functions for specific email types
export const sendReceiptEmail = async (data: ReceiptEmailData) =>
  sendEmailByType({ type: 'receipt', data })

export const sendOrderConfirmationEmail = async (data: OrderConfirmationData) =>
  sendEmailByType({ type: 'order-confirmation', data })

export const sendOrderReadyEmail = async (data: OrderReadyData) =>
  sendEmailByType({ type: 'order-ready', data })

export const sendOutOfStockEmail = async (data: OutOfStockData) =>
  sendEmailByType({ type: 'out-of-stock', data })

export const sendThankYouEmail = async (data: ThankYouData) =>
  sendEmailByType({ type: 'thank-you', data })

export const sendNewOrderEmail = async (data: NewOrderEmailData) =>
  sendEmailByType({ type: 'new-order', data })
