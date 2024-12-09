import { ChevronLeftIcon, MailIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '~/lib/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { cn } from '~/lib/utils'

export default function B2BPage() {
  return (
    <div className="grid place-content-center size-full min-h-screen bg-center bg-cover bg-kromka_b2b">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">POĎME DO TOHO SPOLU</CardTitle>
          {/* <CardDescription>Kontaktujte nás e-mailom</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-base  text-center w-[90%]">
              Radi sa spájame s tými, ktorí majú na jedlo podobný pohľad. Ozvite sa nám, dohodneme
              sa na spolupráci.
              <br /> Kontaktujte nás na{' '}
              <Link
                className={cn(
                  buttonVariants({ variant: 'link', size: 'lg' }),
                  'px-0.5 font-bold gap-x-1',
                )}
                href={'mailto:'}
              >
                kromka@kavejo.sk
                <MailIcon />
              </Link>
              , radi s vami dohodneme ďalšie detaily.
            </h4>
            {/* <span className="text-muted-foreground text-sm">
              °Tu časom pribudne katalóg produktov
            </span> */}
            <Link
              className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'gap-0.5')}
              href={'/'}
            >
              <ChevronLeftIcon />
              Na úvodnú stránku
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
