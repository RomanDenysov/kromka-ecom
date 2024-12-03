import { Link } from '~/lib/ui/link'
import { Separator } from '~/lib/ui/components/separator'
import { Container } from '~/lib/ui/container'
import { Icons } from '~/lib/ui/icons'
import { FooterContacts } from './footer-contacts'
import { FooterNav } from './footer-nav'
import { SocialLinks } from './social-links'
import { StoreCard } from '~/features/store-selector/ui'
import { Suspense } from 'react'

export default function Footer() {
  return (
    <footer className="mx-auto bg-muted">
      <Container>
        <div className="size-full border-border border-t py-8 md:py-16">
          <div className="grid place-content-center">
            <Icons.logo className="size-12 fill-accent-foreground md:size-14" />
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 place-items-center items-start gap-x-6 gap-y-10 py-10 md:grid-cols-4 md:py-20">
          <div className="hidden space-y-2 md:block">
            <span className="mb-4 ml-2 font-medium text-base text-primary tracking-tight">
              Navigacia
            </span>
            <FooterNav />
          </div>
          <div className="h-full space-y-2">
            <span className="mb-4 ml-4 font-medium text-base text-primary tracking-tight">
              Socialne siete
            </span>
            <SocialLinks />
          </div>
          <div className="h-full space-y-2">
            <h5 className="mb-4 ml-4 font-medium text-base text-primary tracking-tight">
              Kontakty
            </h5>
            <FooterContacts />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Suspense>
              <StoreCard />
            </Suspense>
          </div>
        </div>
        <Separator />
      </Container>
      <div className="flex size-full flex-col-reverse items-center justify-between gap-y-2 px-4 pt-10 pb-4 md:flex-row md:px-10">
        <div className="w-full self-center">
          <span className="text-center text-muted-foreground text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Všetky práva vyhradené pre Kromka s.r.o.
          </span>
        </div>

        <div className="w-full self-center">
          <div className="flex flex-col items-center justify-end gap-y-1 space-x-4 md:flex-row">
            <Link
              href="/terms"
              className="text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline md:text-sm"
            >
              Obchodné podmienky
            </Link>
            <Link
              href="/privacy"
              className="text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline md:text-sm"
            >
              Ochrana osobných údajov
            </Link>
            <Link
              href="/cookies"
              className="text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline md:text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
