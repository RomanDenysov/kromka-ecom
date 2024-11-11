'use client'

import Link from 'next/link'
import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { Checkbox } from '~/lib/ui/components/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/lib/ui/components/form'
import { Input } from '~/lib/ui/components/input'
import { Separator } from '~/lib/ui/components/separator'

const Info = () => {
  const { control } = useFormContext()

  return (
    <Card className="border-none bg-accent">
      <CardHeader>
        <CardTitle>Prehľad objednávky</CardTitle>
      </CardHeader>
      <CardContent className="mb-4 space-y-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meno</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="name" {...field} placeholder="Zadajte svoe meno" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  {...field}
                  placeholder="Zadajte svoj e-mail"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Telefonne číslo</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="phone"
                  {...field}
                  placeholder="Zadajte svoe telefonne číslo"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <FormField
            control={control}
            name="terms"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex items-start gap-2">
                  <FormControl>
                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-medium text-sm leading-none">
                    Suhlasim z{' '}
                    <Link
                      href="/privacy-policy"
                      className="text-primary underline hover:text-muted-foreground"
                    >
                      obchodnymi podmienkami
                    </Link>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-4 ">
        <Separator />
        <p className="text-base text-muted-foreground tracking-tight">
          alebo{' '}
          <Link className="underline" href={{ pathname: '/sign-in' }}>
            prihlaste sa
          </Link>{' '}
          do svojho účtu
        </p>
      </CardFooter>
    </Card>
  )
}

export default Info
