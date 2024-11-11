'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/lib/ui/components/form'
import { Input } from '~/lib/ui/components/input'
import { LoaderButton } from '~/lib/ui/loader-button'

const emailSchema = z.object({
  email: z.string().email(),
})

type EmailFormData = z.infer<typeof emailSchema>

export const EmailForm = () => {
  const form = useForm<EmailFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = (data: EmailFormData) => {
    signIn('nodemailer', { email: data.email, redirectTo: '/' })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" className="w-full" />
              </FormControl>
              <FormDescription>
                Napište svůj email a my vám pošleme potvrzovací email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
          <MailIcon size={20} /> Odeslat
        </LoaderButton>
      </form>
    </Form>
  )
}
