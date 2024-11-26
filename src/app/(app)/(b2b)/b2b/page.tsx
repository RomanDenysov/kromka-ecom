import { MailIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '~/lib/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { Container } from '~/lib/ui/container'
import { cn } from '~/lib/utils'

export default function B2BPage() {
  return (
    <div className="grid place-content-center size-full min-h-screen bg-center bg-cover bg-kromka_b2b">
      <Card>
        <CardHeader>
          <CardTitle>Chcete sa stať partnerom Pekaren Kromka?</CardTitle>
          <CardDescription>Kontaktujte nás na telefónnom čísle alebo e-mailom</CardDescription>
          <CardContent className="pb-0">
            <div className="flex flex-col items-center pt-2 space-y-4">
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
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
