'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { LoaderButton } from '~/lib/ui/loader-button'
import { formatPrice } from '~/lib/utils'
import { useCart } from '~/store/cart/use-cart'

const Summary = () => {
  const state = useCart()
  const subtotal = formatPrice(10)
  const sale = formatPrice(0)
  const total = formatPrice(10)

  return (
    <Card className="border-none bg-accent">
      <CardHeader>
        <CardTitle>Prehľad objednávky</CardTitle>
      </CardHeader>
      <CardContent className="mb-4 space-y-6">
        <div className="flex items-end justify-between border-border border-b py-1 ">
          <span className="font-medium text-base text-muted-foreground tracking-tight">
            Medzisúčet
          </span>
          <h4 className="font-semibold text-lg tracking-tight">{subtotal}</h4>
        </div>
        <div className="flex items-end justify-between border-border border-b py-1 ">
          <span className="font-medium text-base text-muted-foreground tracking-tight">Zľava</span>
          <h4 className="font-semibold text-lg tracking-tight">{sale}</h4>
        </div>
        <div className="flex items-end justify-between py-1 ">
          <span className="font-medium text-lg text-muted-foreground tracking-tight">Spolu</span>
          <h4 className="font-semibold text-xl tracking-tight">{total}</h4>
        </div>
      </CardContent>
      <CardFooter>
        <LoaderButton
          type="submit"
          form="checkout-form"
          size={'lg'}
          className="w-full text-lg"
          isLoading={false}
        >
          Objednať
        </LoaderButton>
      </CardFooter>
    </Card>
  )
}

export default Summary
