import { FacebookIcon, InstagramIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '~/lib/ui/components/button'
import { Icons } from '~/lib/ui/icons'
import { cn } from '~/lib/utils'

const SOCIAL_LINKS = [
  {
    href: 'https://zkromky.substack.com?utm_source=navbar&utm_medium=web',
    icon: Icons.substack,
    label: 'Substack',
  },
  {
    href: 'https://www.instagram.com/pekaren.kromka',
    icon: InstagramIcon,
    label: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/pekaren.kromka',
    icon: FacebookIcon,
    label: 'Facebook',
  },
]

export const SocialLinks = () => {
  return (
    <div className='flex flex-col items-start justify-start space-y-1'>
      {SOCIAL_LINKS.map((link) => (
        <Link
          key={link.href}
          target='_blank'
          href={link.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'text-muted-foreground hover:text-accent-foreground',
          )}>
          <link.icon className='mr-2 size-5' />
          {link.label}
        </Link>
      ))}
    </div>
  )
}
