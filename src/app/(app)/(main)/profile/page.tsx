import { api } from '~/trpc/server'

export default async function UserPage() {
  const user = await api.users.getUser()

  return <div>User Page {user?.name}</div>
}