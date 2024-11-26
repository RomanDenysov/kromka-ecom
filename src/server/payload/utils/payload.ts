import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const initPayload = cache(async () => {
  const payload = await getPayload({ config: await configPromise })

  return payload
})
