import { User2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Container } from '~/lib/ui/container'
import { Link } from '~/lib/ui/link'
import AnimatedBackground from '~/lib/ui/motion/animated-background'
import { api } from '~/trpc/server'

const PROFILE_NAVIGATION = [
  { label: 'Profile', href: '' },
  { label: 'Orders', href: 'orders' },
  { label: 'Support', href: 'support' },
  { label: 'Settings', href: 'settings' },
]

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const user = await api.users.getUser()

  if (!user) redirect('/')

  return (
    <Container className="py-5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-accent py-1 px-2 w-full sm:w-fit">
          <AnimatedBackground
            defaultValue="Profile"
            className="rounded-lg bg-primary-foreground"
            transition={{ ease: 'easeInOut', duration: 0.2 }}
          >
            {PROFILE_NAVIGATION.map(({ label, href }) => (
              <Link
                key={href}
                data-id={label}
                href={`/profile/${href}`}
                className="inline-flex mr-2 sm:mr-4 text-primary last:mr-0 px-2 py-1.5 items-center justify-center transition-transform active:scale-[0.98]"
              >
                {label}
              </Link>
            ))}
          </AnimatedBackground>
        </div>
        <span className="hidden sm:flex text-muted-foreground items-center justify-end gap-x-2 text-base font-semibold rounded-lg bg-accent h-max p-2.5">
          <User2Icon size={20} />
          {user?.email}
        </span>
      </div>
      <div className="rounded-lg bg-accent size-full p-4">{children}</div>
    </Container>
  )
}
