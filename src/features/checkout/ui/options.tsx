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
import DateSelector from './date-selector'

const DUMMY_CHRISTMAS_DATES_FEATURE_FLAG = true

const availableDates = ['2024-12-13', '2024-12-14', '2024-12-22', '2024-12-23']

const Options = () => {
  const { control } = useFormContext()

  return (
    <Card className="border-none bg-accent">
      <CardHeader>
        <CardTitle>Zvoľte si dátum a predajňu na vyzdvihnutie objednávky</CardTitle>
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
                {DUMMY_CHRISTMAS_DATES_FEATURE_FLAG ? (
                  <DateSelector
                    onDateSelect={(date) => field.onChange(date)}
                    defaultValue={field.value}
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
          control={control}
          name="store"
          render={({ field }) => (
            <FormItem className="space-y-4 flex flex-col">
              <FormLabel className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                Pri osobnom odbere v predajni môžete platiť v <b>hotovosti</b> alebo <b>kartou</b>.
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
