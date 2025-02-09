'use client'

import { format } from 'date-fns/format'
import { sk } from 'date-fns/locale'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  HomeIcon,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { Button, buttonVariants } from '~/lib/ui/components/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/lib/ui/components/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/lib/ui/components/collapsible'
import { ScrollArea } from '~/lib/ui/components/scroll-area'
import { Separator } from '~/lib/ui/components/separator'
import { Icons } from '~/lib/ui/icons'
import { cn, formatPrice } from '~/lib/utils'
import type { Order } from '~/server/payload/payload-types'
import { api } from '~/trpc/react'

type Props = {
  orderId: string
  initialData?: Order
}

const ConfirmOrderCard = ({ orderId, initialData }: Props) => {
  const { data: orderData, isLoading } = api.orders.byId.useQuery({ id: orderId }, { initialData })
  const [isOpen, setIsOpen] = useState(false)
  const { data: userData } = api.users.me.useQuery()

  if (isLoading) return <Loader2 size={32} className="animate-spin text-muted-foreground" />

  if (!orderData) return null

  const preparedOrderId = `#${orderData.id.split('-')[0]}`
  const [pickupStoreUrl, pickupStoreAddress] =
    typeof orderData.pickupStore !== 'string'
      ? [orderData.pickupStore.addressUrl, orderData.pickupStore.address]
      : [orderData.pickupStore, orderData.pickupStore]

  let orderStatus: string
  switch (orderData.status) {
    case 'new':
      orderStatus = 'Nová objednávka'
      break
    case 'processing':
      orderStatus = 'Spracováva sa'
      break
    case 'ready':
      orderStatus = 'Pripravená na odber'
      break
    case 'complete':
      orderStatus = 'Dokončená'
      break
    case 'cancelled':
      orderStatus = 'Zrušená'
      break
  }

  return (
    <div>
      <div className="mx-auto max-w-3xl space-y-5">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 sm:gap-x-4">
            <Icons.kromka className="h-3 w-auto fill-primary md:h-5 text-primary" />
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-lg sm:text-2xl font-semibold">Vaša objednávka</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <ClockIcon size={16} />
            {orderStatus}
          </Button>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Informácie o objednávke</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-gray-500">STATUS OBJEDNÁVKY</div>
                <div>{orderStatus}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">SPÔSOB PLATBY</div>
                <div>{'Platba pri vyzdvihnutí v predajní'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  DÁTUM VYZDVIHNUTIA OBJEDNÁVKY
                </div>
                <div>{format(orderData.pickupDate, 'PP', { locale: sk })}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">ČÍSLO OBJEDNÁVKY</div>
                <div className="text-blue-600">{preparedOrderId.toUpperCase()}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-sm font-medium text-gray-500">MIESTO VYZDVIHNUTIA</div>
                <a
                  href={pickupStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {pickupStoreAddress}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* ORDER SUMMARY */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-medium">Produkty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">SPOLU</span>
                <span className="text-xl font-semibold">{formatPrice(orderData.total)}</span>
              </div>
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    Zobraziť detaily
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ScrollArea className="h-[250px] pr-4 mt-4">
                    {orderData?.productItems?.map(({ title, price, quantity }, index) => {
                      return (
                        <Fragment key={index.toString()}>
                          <div className="flex items-center gap-4 py-4">
                            <div className="flex-1 space-y-1">
                              <div className="text-base font-medium">
                                {title} x {quantity}ks
                              </div>
                            </div>
                            <div className="font-medium">
                              {formatPrice(price * quantity)}
                            </div>
                          </div>
                          <Separator />
                        </Fragment>
                      )
                    })}
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <CardFooter className="flex flex-col gap-4 px-0">
            {!userData && (
              <Link
                href={'/sign-in'}
                className={cn(buttonVariants({ variant: 'link' }), 'w-full items-center gap-x-0.5')}
              >
                Registrovať sa pre rýchlejšie objednávky
                <ChevronRightIcon size={16} />
              </Link>
            )}
            <Link
              href={'/'}
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full items-center gap-x-2')}
            >
              <HomeIcon size={16} />
              Prejsť na Domovu stránku
            </Link>
          </CardFooter>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrderCard
