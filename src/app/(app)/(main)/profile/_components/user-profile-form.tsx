'use client'

import { z } from 'zod'
import { Profile, User } from '@payload-types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/lib/ui/components/card'
import { LoaderButton } from '~/lib/ui/loader-button'
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
import { useUser } from '~/store/user/use-user'
import { api } from '~/trpc/react'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/lib/ui/components/alert-dialog'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Meno musí mať aspoň 2 znaky.',
  }),
  phone: z
    .string()
    .min(10, {
      message: 'Telefónne číslo musí mať aspoň 10 číslic.',
    })
    .max(15, {
      message: 'Telefónne číslo nesmie byť dlhšie ako 15 číslic.',
    }),
})

type ProfileFormData = z.infer<typeof profileFormSchema>

const UserProfileForm = ({
  user: apiUser,
  profile,
}: {
  user?: Partial<User> | null
  profile?: Partial<Profile> | null
}) => {
  const router = useRouter()
  const stateUser = useUser((state) => state.user)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const updateUserMutation = api.users.update.useMutation({
    onSuccess: () => {
      handleProfileUpdate()
    },
    onError: () => {
      toast.error('Profil sa nepodarilo aktualizovať.')
    },
  })
  const updateProfileMutation = api.profiles.update.useMutation({
    onSuccess: () => {
      toast.success('Profil bol úspešne aktualizovaný.')
      form.reset(form.getValues())
      setIsDialogOpen(false)
    },
    onError: () => {
      toast.error('Profil sa nepodarilo aktualizovať.')
    },
    onSettled: () => {
      const timer = setTimeout(() => router.refresh(), 300)
      return () => clearTimeout(timer)
    },
  })

  const user = apiUser || stateUser

  const defaultValues: ProfileFormData = {
    name: user?.name || profile?.contacts?.name || '',
    phone: profile?.contacts?.phone || '',
  }

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  const onSubmit = () => {
    if (isDialogOpen) {
      handleConfirmedSubmit()
    } else {
      setIsDialogOpen(true)
    }
  }

  const data: ProfileFormData = form.getValues()

  function handleConfirmedSubmit() {
    updateUserMutation.mutate({
      name: data.name,
      phone: data.phone,
    })
  }

  function handleProfileUpdate() {
    if (profile) {
      updateProfileMutation.mutate({
        contacts: {
          name: data.name,
          phone: data.phone,
        },
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil</CardTitle>
        <CardDescription>Spravujte svoje osobné informácie</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="user-profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meno</FormLabel>
                  <FormControl>
                    <Input placeholder="Vaše meno" {...field} />
                  </FormControl>
                  <FormDescription>
                    Toto je meno, ktoré sa zobrazí vo vašom profile a v e-mailoch.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefónne číslo</FormLabel>
                  <FormControl>
                    <Input placeholder="Vaše telefónne číslo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Toto číslo použijeme na aktualizácie objednávok a notifikácie.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <LoaderButton
              form="user-profile-form"
              isLoading={updateUserMutation.isPending || updateProfileMutation.isPending}
              type="submit"
              disabled={!form.formState.isDirty}
            >
              Aktualizovať profil
            </LoaderButton>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ste si istý?</AlertDialogTitle>
              <AlertDialogDescription>
                Táto akcia aktualizuje váš profil. Chcete pokračovať?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Zrušiť</AlertDialogCancel>
              <AlertDialogAction disabled={!form.formState.isDirty} onClick={handleConfirmedSubmit}>
                {updateUserMutation.isPending && <Loader2Icon className="animate-spin" />}
                Pokračovať
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

export default UserProfileForm
