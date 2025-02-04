'use client'

import { ChevronRight } from 'lucide-react'
import { buttonVariants } from '~/lib/ui/components/button'
import { ScrollArea } from '~/lib/ui/components/scroll-area'
import { Separator } from '~/lib/ui/components/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/lib/ui/components/sheet'
import { Link } from '~/lib/ui/link'
import { formatPrice } from '~/lib/utils'
import { useCart } from '~/store/cart/use-cart'
import { useCartSheet } from '../hooks/use-cart-sheet'
import { CartSheetItem } from './cart-sheet-item'

export const CartSheet = () => {
  const isOpen = useCartSheet((state) => state.isOpen)
  const onClose = useCartSheet((state) => state.onClose)

  const products = useCart((state) => state.items)

  const totalQuantity = products?.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = products?.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col px-4">
        <SheetHeader>
          <SheetTitle>Košík ({totalQuantity})</SheetTitle>
          <SheetDescription hidden>Stav košíka</SheetDescription>
        </SheetHeader>

        {products.length > 0 ? (
          <>
            <ScrollArea className="pr-2.5">
              <div className="flex h-full w-full flex-col">
                {products.map(({ product, quantity }) => (
                  <CartSheetItem product={product} quantity={quantity} key={product.id} />
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex">
                  <span className="flex-1 font-normal text-lg tracking-tight">
                    <b>SPOLU</b> (s DPH)
                  </span>

                  <span className="font-bold text-xl tracking-tight">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href={'/checkout'}
                    className={buttonVariants({
                      className: 'w-full',
                      size: 'lg',
                    })}
                  >
                    Prejsť k pokladni
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className=" size-full space-y-1 p-2">
            <div className="size-full border border-border border-dashed">
              <div
                aria-hidden="true"
                className="relative mb-4 flex size-full flex-col items-center justify-center gap-y-2 p-4 text-muted-foreground"
              >
                <h2 className="text-center font-bold text-3xl">Váš košík je prázdny</h2>
                <div className="px-6">
                  <SheetTrigger asChild>
                    <Link
                      href={'/products'}
                      className={buttonVariants({
                        variant: 'link',
                        size: 'lg',
                        className:
                          'flexw-full items-center gap-0.5 text-lg text-muted-foreground underline hover:text-red-500',
                      })}
                    >
                      Prejsť k nakupu <ChevronRight size={16} />
                    </Link>
                  </SheetTrigger>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
