import { api } from '~/trpc/server'
import UserProfileForm from './_components/user-profile-form'

export default async function UserPage() {
  const user = await api.users.me()
  const profile = await api.profiles.me()

  return <UserProfileForm user={user} profile={profile} />
}
