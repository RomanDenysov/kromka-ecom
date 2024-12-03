import nodemailer from 'nodemailer'
import { Product } from '@payload-types'
import { env } from '~/env'
import { ReceiptEmail } from './templates/receipt-email'
import { OrderConfirmationEmail } from './templates/order-confirmation-email'
import { OrderReadyEmail } from './templates/order-ready-email'
import { OutOfStockEmail } from './templates/out-of-stock-email'
import { render } from '@react-email/components'

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
  date: Date
  status: string
  orderId: string
  method: 'card' | 'store'
  pickupPlace: string
  pickupPlaceUrl: string
  products: Array<{
    product: Product
    quantity: number
  }>
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

type EmailTemplate = 'receipt' | 'order-confirmation' | 'order-ready' | 'out-of-stock'

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
      default:
        throw new Error(`Unknown email template: ${template}`)
    }
  }

  private static async sendEmail({
    to,
    subject,
    html,
  }: {
    to: string
    subject: string
    html: string
  }) {
    const transporter = await this.getTransporter()
    return transporter.sendMail({
      from: `"${this.config.fromName}" < ${this.config.from} >`,
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
}
