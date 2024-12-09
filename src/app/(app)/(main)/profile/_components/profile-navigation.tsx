'use client'

import { User2Icon } from 'lucide-react'
import Link from 'next/link'
import { Container } from '~/lib/ui/container'
import AnimatedBackground from '~/lib/ui/motion/animated-background'
import { User } from '@payload-types'
import { usePathname } from 'next/navigation'

const PROFILE_NAVIGATION = [
  { label: 'Profile', href: '/profile' },
  { label: 'Orders', href: '/profile/orders' },
  { label: 'Support', href: '/profile/support' },
  { label: 'Settings', href: '/profile/settings' },
]

const ProfileNavigation = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: Partial<User>
}) => {
  const pathname = usePathname()

  return (
    <Container className="py-5 md:py-8 space-y-5 md:space-y-10">
      <div className="flex items-center justify-between">
        <div className="bg-background rounded-xl py-1 px-2 w-full sm:w-fit">
          <AnimatedBackground
            className="rounded-xl bg-accent"
            defaultValue={PROFILE_NAVIGATION.filter((item) => item.href === pathname)[0].label}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
          >
            {PROFILE_NAVIGATION.map(({ label, href }) => (
              <Link
                key={href}
                data-id={label}
                href={href}
                className="inline-flex mr-2 sm:mr-4 text-primary last:mr-0 px-2 py-1.5 items-center justify-center transition-transform active:scale-[0.98]"
              >
                {label}
              </Link>
            ))}
          </AnimatedBackground>
        </div>
        <span className="hidden sm:flex  bg-background rounded-xl items-center justify-end gap-x-2 text-base font-semibold h-max p-2.5">
          <User2Icon size={20} />
          {user?.email}
        </span>
      </div>
      {children}
    </Container>
  )
}

export default ProfileNavigation
