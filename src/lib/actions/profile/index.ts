'use server'

import { UpdateProfileSchema } from '~/server/api/routes/profiles/validator'
import { api } from '~/trpc/server'

export async function getProfile() {
  const profile = await api.profiles.me()
  return profile
}

export async function syncProfile(data: UpdateProfileSchema) {
  const profile = await api.profiles.update(data)
  return profile
}
