import { cache } from 'react'
import { initPayload } from '~/server/payload/utils/payload'

export const getUserById = cache(async (id: string) => {
  const payload = await initPayload()

  const res = await payload.findByID({
    collection: 'users',
    id,
  })

  // If no user is found, throw a null
  if (!res) return null

  // Filter out sensitive fields
  const user = {
    ...res,
    accounts: undefined,
    sessions: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    verificationTokens: undefined,
  }

  return user
})
