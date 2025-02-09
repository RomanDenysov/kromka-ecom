import { render } from '@react-email/components'
import nodemailer from 'nodemailer'
import { env } from '~/env'

export interface EmailConfig {
  from: string
  fromName: string
  host: string
  port: number
  user: string
  password: string
}

export const emailConfig: EmailConfig = {
  from: env.EMAIL_FROM2,
  fromName: 'Pekaren Kromka',
  host: env.EMAIL_HOST,
  port: 587,
  user: env.EMAIL_FROM,
  password: env.EMAIL_PASS,
}

export type EmailPayload = {
  to: string | string[]
  subject: string
  html: string
}

export const createTransporter = async () => {
  return nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password,
    },
  })
}

export const sendEmail = async (to: string | string[], subject: string, html: string) => {
  const transporter = await createTransporter()
  return transporter.sendMail({
    from: `"${emailConfig.fromName}" <${emailConfig.from}>`,
    to,
    subject,
    html,
  })
}
