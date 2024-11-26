'use client'

import { useFormContext } from 'react-hook-form'
import { DatePicker, PaymentMethod } from '~/features/checkout/ui'
import { StoreSelector } from '~/features/store-selector/ui'
import { Card, CardContent, CardHeader, CardTitle } from '~/lib/ui/components/card'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/lib/ui/components/form'

const Options = () => {
  const { control } = useFormContext()

  return (
    <Card className="border-none bg-accent">
      <CardHeader>
        <CardTitle>Vyberte si dátum a podnik pre odber objednávky</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Dátum
              </FormLabel>
              <FormControl>
                <DatePicker onDateSelect={(date) => field.onChange(date)} />
              </FormControl>
              <FormDescription>Vyberte si mesto odberu objednávky</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="store"
          render={({ field }) => (
            <FormItem className="space-y-4 flex flex-col">
              <FormLabel className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Store
              </FormLabel>
              <FormControl>
                <StoreSelector width="w-full" onStoreChange={(store) => field.onChange(store.id)} />
              </FormControl>
              <FormDescription>Vyberte si dátum a čas pre odber objednávky</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="method"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Sposób platby
              </FormLabel>
              <FormControl>
                <PaymentMethod defaultValue={field.value} onMethodSelect={field.onChange} />
              </FormControl>
              <FormDescription>
                Pri osobnom odbere na predajne da sa platit aj v hotovosti aj kartou
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

export default Options
