import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { cache } from 'react'
import { env } from '~/env'

export const getEmailAdapter = cache(() => {
  const host = env.EMAIL_HOST
  const pass = env.EMAIL_PASS
  const from = env.EMAIL_FROM2
  const user = env.EMAIL_FROM

  return nodemailerAdapter({
    defaultFromAddress: from,
    defaultFromName: 'Pekaren Kromka',
    transportOptions: {
      host,
      port: 587,
      auth: {
        user,
        pass,
      },
    },
  })
})
