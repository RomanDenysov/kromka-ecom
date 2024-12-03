'use client'

import { Alert, AlertDescription } from '~/lib/ui/components/alert'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { LoaderButton } from '~/lib/ui/loader-button'
import { formatPrice } from '~/lib/utils'
import { useCart } from '~/store/cart/use-cart'
import {
  useCanSubmit,
  useCheckoutError,
  useCheckoutLoading,
} from '~/store/checkout/use-checkout-store'

const Summary = () => {
  const isLoading = useCheckoutLoading()
  const error = useCheckoutError()
  const canSubmit = useCanSubmit()
  const items = useCart((state) => state.items)
  const totalPrice = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  const subtotal = formatPrice(totalPrice)
  const sale = formatPrice(0)
  const total = formatPrice(totalPrice)

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
        <div className="size-full flex flex-col item-center justify-center gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!canSubmit && items.length === 0 && (
            <Alert>
              <AlertDescription>
                Váš košík je prázdny. Pridajte produkty pre pokračovanie.
              </AlertDescription>
            </Alert>
          )}
          <LoaderButton
            type="submit"
            form="checkout-form"
            size={'lg'}
            className="w-full text-lg"
            isLoading={isLoading}
            disabled={!!canSubmit}
          >
            Objednať
          </LoaderButton>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Summary
