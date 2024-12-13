import type { Product } from '@payload-types'
import { render } from '@react-email/components'
import nodemailer from 'nodemailer'
import { env } from '~/env'
import { NewOrderEmail } from './templates/new-order-email'
import { OrderConfirmationEmail } from './templates/order-confirmation-email'
import { OrderReadyEmail } from './templates/order-ready-email'
import { OutOfStockEmail } from './templates/out-of-stock-email'
import { ReceiptEmail } from './templates/receipt-email'
import { ThankYouEmail } from './templates/thank-you-email'

interface EmailConfig {
  from: string
  fromName: string
  host: string
  port: number
  user: string
  password: string
}

type ReceiptEmailData = {
  email: string
  date: string
  status: string
  orderId: string
  method: 'card' | 'store'
  pickupPlace: string
  pickupPlaceUrl: string
  products: Array<{
    product: Product
    quantity: number
  }>
  pickupDate: string
  total: number
}

type OrderConfirmationData = {
  email: string
  orderId: string
  pickupPlace: string
  pickupPlaceUrl: string
}

type OrderReadyData = {
  email: string
  orderId: string
  pickupPlace: string
}

type OutOfStockData = {
  email: string
  orderId: string
  productName: string
}

type ThankYouData = {
  email: string
  orderId: string
}

type NewOrderData = {
  email: string | string[]
  orderId: string
  pickupPlace: string
  products: Array<{
    product: Product
    quantity: number
  }>
  paymentMethod: 'card' | 'store'
  pickupTime: string
  customer: {
    name: string
    email: string
    phone: string
  }
}

type EmailTemplate =
  | 'receipt'
  | 'order-confirmation'
  | 'order-ready'
  | 'out-of-stock'
  | 'thank-you'
  | 'new-order'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
// biome-ignore lint/complexity/noThisInStatic: <explanation>
export class EmailService {
  private static transporter: nodemailer.Transporter | null = null
  private static config: EmailConfig = {
    from: env.EMAIL_FROM2,
    fromName: 'Pekaren Kromka',
    host: env.EMAIL_HOST,
    port: 587,
    user: env.EMAIL_FROM,
    password: env.EMAIL_PASS,
  }

  private static async getTransporter() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: this.config.host,
        port: this.config.port,
        secure: false,
        auth: {
          user: this.config.user,
          pass: this.config.password,
        },
      })
    }
    return this.transporter
  }

  private static orderIdFormatter(orderId: string) {
    return orderId.split('-')[0]
  }

  private static async renderTemplate(template: EmailTemplate, data: any) {
    switch (template) {
      case 'receipt':
        return render(ReceiptEmail(data as ReceiptEmailData))
      case 'order-confirmation':
        return render(OrderConfirmationEmail(data as OrderConfirmationData))
      case 'order-ready':
        return render(OrderReadyEmail(data as OrderReadyData))
      case 'out-of-stock':
        return render(OutOfStockEmail(data as OutOfStockData))
      case 'thank-you':
        return render(ThankYouEmail(data as OrderConfirmationData))
      case 'new-order':
        return render(NewOrderEmail(data as NewOrderData))
      default:
        throw new Error(`Unknown email template: ${template}`)
    }
  }

  private static async sendEmail({
    to,
    subject,
    html,
  }: {
    to: string | string[]
    subject: string
    html: string
  }) {
    const transporter = await this.getTransporter()
    return transporter.sendMail({
      from: `"${this.config.fromName}" < ${this.config.from} >`, // TODO: Add email from
      to,
      subject,
      html,
    })
  }

  static async sendReceiptEmail(data: ReceiptEmailData) {
    const html = await this.renderTemplate('receipt', data)
    return this.sendEmail({
      to: data.email,
      subject: `Objednávka #${this.orderIdFormatter(data.orderId)} - Pekaren Kromka`,
      html,
    })
  }

  static async sendOrderConfirmationEmail(data: OrderConfirmationData) {
    const html = await this.renderTemplate('order-confirmation', data)
    return this.sendEmail({
      to: data.email,
      subject: `Už sa to pečie! Objednávka #${this.orderIdFormatter(data.orderId)} - Pekaren Kromka`,
      html,
    })
  }

  static async sendOrderReadyEmail(data: OrderReadyData) {
    const html = await this.renderTemplate('order-ready', data)
    return this.sendEmail({
      to: data.email,
      subject: `Vaša objednávka #${this.orderIdFormatter(data.orderId)} je pripravená - Pekaren Kromka`,
      html,
    })
  }

  static async sendOutOfStockEmail(data: OutOfStockData) {
    const html = await this.renderTemplate('out-of-stock', data)
    return this.sendEmail({
      to: data.email,
      subject: `Produkt nie je k dispozícii - Objednávka #${this.orderIdFormatter(data.orderId)} - Pekaren Kromka`,
      html,
    })
  }

  static async sendThankYouEmail(data: ThankYouData) {
    const html = await this.renderTemplate('thank-you', data)
    return this.sendEmail({
      to: data.email,
      subject: `Ďakujeme za vašu objednávku - Pekaren Kromka`,
      html,
    })
  }

  static async sendNewOrderEmail(data: NewOrderData) {
    const html = await this.renderTemplate('new-order', data)
    return this.sendEmail({
      to: data.email,
      subject: `Nová objednávka #${this.orderIdFormatter(data.orderId)} - Pekaren Kromka`,
      html,
    })
  }
}
