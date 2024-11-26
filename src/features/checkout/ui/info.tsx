'use client'

import Link from 'next/link'
import { memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { Checkbox } from '~/lib/ui/components/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/lib/ui/components/form'
import { Input } from '~/lib/ui/components/input'
import { Separator } from '~/lib/ui/components/separator'

const Info = () => {
  const { control } = useFormContext()

  const formFields = useMemo(
    () => [
      {
        name: 'name',
        label: 'Meno',
        type: 'text',
        placeholder: 'Zadajte svoe meno',
        autoComplete: 'name',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Zadajte svoj e-mail',
        autoComplete: 'email',
      },
      {
        name: 'phone',
        label: 'Telefonne číslo',
        type: 'text',
        placeholder: 'Zadajte svoe telefonne číslo',
        autoComplete: 'phone',
      },
    ],
    [],
  )

  return (
    <Card className="border-none bg-accent">
      <CardHeader>
        <CardTitle>Prehľad objednávky</CardTitle>
      </CardHeader>
      <CardContent className="mb-4 space-y-6">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={control}
            name={field.name}
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
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

export default memo(Info)
