import { redirect } from 'next/navigation'
import { api } from '~/trpc/server'
import ProfileNavigation from './_components/profile-navigation'

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const user = await api.users.me()

  if (!user) redirect('/')

  return <ProfileNavigation user={user}>{children}</ProfileNavigation>
}
