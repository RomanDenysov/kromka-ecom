'use server'

import { api } from '~/trpc/server'

export async function getUser() {
  const user = await api.users.me()
  return user
}
