'use client'

import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import useCheckoutForm from '~/features/checkout/hooks/use-checkout-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/lib/ui/components/form'
import { FormWrapper } from '~/lib/ui/form-wrapper'
import { cn, formatPrice } from '~/lib/utils'
import { CartItem, useCart } from '~/store/cart/use-cart'

import Link from 'next/link'
import { StoreSelector } from '~/features/store-selector/ui'
import { useCheckout } from '~/hooks/use-checkout'
import { Alert, AlertDescription } from '~/lib/ui/components/alert'
import { Checkbox } from '~/lib/ui/components/checkbox'
import { Input } from '~/lib/ui/components/input'
import { LoaderButton } from '~/lib/ui/loader-button'
import { api } from '~/trpc/react'
import { DatePicker } from './date-picker'
import { DateSelector } from './date-selector'

const DUMMY_CHRISTMAS_DATES_FEATURE_FLAG = false
// const availableDates = ['2025-04-19']
const formFields = [
  {
    name: 'name' as const,
    label: 'Meno',
    type: 'text',
    placeholder: 'Zadajte vaše meno',
    autoComplete: 'name',
  },
  {
    name: 'email' as const,
    label: 'Email',
    type: 'email',
    placeholder: 'Zadajte váš e-mail',
    autoComplete: 'email',
  },
  {
    name: 'phone' as const,
    label: 'Telefónne číslo',
    type: 'text',
    placeholder: 'Zadajte vaše telefónne číslo',
    autoComplete: 'phone',
  },
]

export function CheckoutForm(props: { className?: string }) {
  const { className } = props
  const items = useCart((state) => state.items)
  const totalPrice = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  // const products = useMemo(
  //   () =>
  //     items.map((item: CartItem) => ({
  //       product: item.product.id,
  //       quantity: item.quantity,
  //     })),
  //   [items],
  // )

  const { form, handleSubmit, isSubmitting } = useCheckout()

  return (
    <Form {...form}>
      <form
        id="checkout-form"
        className={className}
        onSubmit={handleSubmit}
      >
        <FormWrapper title='Vaše udaje'>
          {formFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: fieldProps }) => (
                <FormItem className='mb-3'>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      className='bg-card'
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="py-4">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex items-start gap-2">
                    <FormControl>
                      <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-medium text-sm leading-none">
                      Súhlasím s{' '}
                      <Link
                        href="/terms"
                        className="text-primary underline hover:text-muted-foreground"
                      >
                        obchodnými podmienkami
                      </Link>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-4 flex items-center flex-col border-t">
            <p className="text-sm text-muted-foreground tracking-tight">
              alebo{' '}
              <Link className="underline" href={{ pathname: '/sign-in' }}>
                prihláste sa
              </Link>{' '}
              do vášho účtu
            </p>
          </div>
        </FormWrapper>
        <FormWrapper title='Zvoľte si dátum a predajňu na vyzdvihnutie objednávky'>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className='mb-3'>
                <FormLabel>
                  Dátum
                </FormLabel>
                <FormControl>
                  {DUMMY_CHRISTMAS_DATES_FEATURE_FLAG ? (
                    <DateSelector
                      value={field.value}
                      onChange={field.onChange}
                      availableDates={availableDates}
                    />
                  ) : (
                    <DatePicker onDateSelect={(date) => field.onChange(date)} />
                  )}
                </FormControl>
                <FormDescription>Zvoľte si dátum a čas vyzdvihnutia objednávky</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="store"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Predajňa
                </FormLabel>
                <FormControl>
                  <StoreSelector width="w-full" onStoreChange={(store) => field.onChange(store.id)} />
                </FormControl>
                <FormDescription>Zvoľte si predajňu na vyzdvihnutie objednávky</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        </FormWrapper>
        <FormWrapper title='Prehľad objednávky'>
          <div className="flex items-end justify-between border-border border-b py-1 ">
            <span className="font-medium text-base text-muted-foreground tracking-tight">
              Medzisúčet
            </span>
            <h4 className="font-semibold text-lg tracking-tight">{formatPrice(totalPrice)}</h4>
          </div>
          <div className="flex items-end justify-between border-border border-b py-1 ">
            <span className="font-medium text-base text-muted-foreground tracking-tight">Zľava</span>
            <h4 className="font-semibold text-lg tracking-tight">{formatPrice(0)}</h4>
          </div>
          <div className="flex items-end justify-between py-1 ">
            <span className="font-medium text-base text-muted-foreground tracking-tight">Spolu</span>
            <h4 className="font-semibold text-lg tracking-tight">{formatPrice(totalPrice)}</h4>
          </div>

          <div className="size-full flex flex-col item-center justify-center gap-4 mt-4">
            {items.length === 0 && (
              <Alert variant='destructive'>
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
              isLoading={isSubmitting}
              disabled={items.length === 0 || isSubmitting}
            >
              Objednať
            </LoaderButton>
          </div>
        </FormWrapper>
      </form>
    </Form>
  )
}
