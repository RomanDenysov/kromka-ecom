import { cache } from 'react'
import { initPayload } from '~/server/payload/utils/payload'

export const getProfileById = cache(async (userId: string) => {
  const payload = await initPayload()

  const res = await payload.find({
    collection: 'profiles',
    where: {
      user: { equals: userId },
    },
  })

  // If no profile is found, throw a null
  if (!res.docs.length) return null

  return res.docs[0]
})
