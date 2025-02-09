'use client'

import Link from 'next/link'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { Checkbox } from '~/lib/ui/components/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/lib/ui/components/form'
import { Input } from '~/lib/ui/components/input'
import { Separator } from '~/lib/ui/components/separator'

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


const Info = () => {
  const { control } = useFormContext()

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
      </CardContent>
      {/* {!user && ( */}
      <CardFooter className="flex flex-col justify-between gap-4">
        <Separator />
        <p className="text-base text-muted-foreground tracking-tight">
          alebo{' '}
          <Link className="underline" href={{ pathname: '/sign-in' }}>
            prihláste sa
          </Link>{' '}
          do vášho účtu
        </p>
      </CardFooter>
      {/* )} */}
    </Card>
  )
}

export default memo(Info)
