import { ChevronLeftIcon, MailIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '~/lib/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { cn } from '~/lib/utils'

export default function B2BPage() {
  return (
    <div className="grid place-content-center size-full min-h-screen bg-center bg-cover bg-kromka_b2b">
      <Card>
        <CardHeader>
          <CardTitle>Chcete sa stať partnerom Pekaren Kromka?</CardTitle>
          <CardDescription>Kontaktujte nás na telefónnom čísle alebo e-mailom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-lg font-semibold text-center w-[90%]">
              Komplexné riešenia pre vašu firmu. Dodávky pečiva, kávy a cukrárenských výrobkov
            </h4>
            <Link
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full')}
              href={'tel:'}
            >
              <PhoneIcon />
              +421 951 831 312
            </Link>
            <Link
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full')}
              href={'mailto:'}
            >
              <MailIcon />
              TEST@MAIL.COM
            </Link>
            <Link
              className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'gap-0.5')}
              href={'/'}
            >
              <ChevronLeftIcon />
              Domov
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
