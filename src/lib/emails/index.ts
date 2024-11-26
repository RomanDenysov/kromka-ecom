import nodemailer from 'nodemailer'
import { Product } from '@payload-types'
import { env } from '~/env'
import { ReceiptEmail } from './templates/receipt-email'
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

type EmailTemplate = 'receipt' | 'order-confirmation'

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

  private static async renderTemplate(template: EmailTemplate, data: any) {
    switch (template) {
      case 'receipt':
        return render(ReceiptEmail(data as ReceiptEmailData))
      default:
        throw new Error(`Unknown email template: $${template}`)
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
      subject: `Objednávka #${data.orderId} - Pekaren Kromka`,
      html,
    })
  }
}
