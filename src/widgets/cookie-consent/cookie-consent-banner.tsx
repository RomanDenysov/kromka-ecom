'use client'

import { useCookieConsentStore } from '~/store/cookie/use-cookie-consent-store'
import { Button } from '~/lib/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/lib/ui/components/card'
import { Label } from '~/lib/ui/components/label'
import { Switch } from '~/lib/ui/components/switch'
import { api } from '~/trpc/react'

const CookieConsentBanner = () => {
  const preferences = useCookieConsentStore((state) => state.preferences)
  const setPreference = useCookieConsentStore((state) => state.setPreference)
  const savePreferences = useCookieConsentStore((state) => state.savePreferences)
  const isVisible = useCookieConsentStore((state) => state.isVisible)
  const setProfile = useCookieConsentStore((state) => state.setProfile)

  const createProfileMutation = api.profiles.createProfile.useMutation({
    onSuccess: (result) => {
      setProfile(result.id)
    },
    onError: () => {
      setProfile(null)
    },
  })

  const handleSavePreferences = () => {
    savePreferences()
    if (preferences.functional) {
      createProfileMutation.mutate()
    }
  }

  if (!isVisible) return null

  return (
    <Card className="fixed inset-x-4 bottom-4 z-50 w-full max-w-fit animate-out shadow-md md:right-4 md:left-auto md:max-w-[400px]">
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <CardDescription>Manage your cookie settings here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <CookieOption
            id="necessary"
            title="Strictly Necessary"
            description="These cookies are essential in order to use the website and use its features."
            checked={preferences.necessary}
            onChange={(checked) => setPreference('necessary', checked)}
            disabled={true}
          />
          <CookieOption
            id="functional"
            title="Functional Cookies"
            description="These cookies allow the website to provide personalized functionality."
            checked={preferences.functional}
            onChange={(checked) => setPreference('functional', checked)}
          />
          <CookieOption
            id="performance"
            title="Performance Cookies"
            description="These cookies help to improve the performance of the website."
            checked={preferences.performance}
            onChange={(checked) => setPreference('performance', checked)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleSavePreferences}>
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  )
}

interface CookieOptionProps {
  id: string
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

const CookieOption = ({
  id,
  title,
  description,
  checked,
  onChange,
  disabled = false,
}: CookieOptionProps) => {
  return (
    <div className="inline-flex items-center justify-between space-x-4">
      <Label htmlFor={id} className="flex flex-col space-y-1">
        <span>{title}</span>
        <span className="line-clamp-2 font-normal text-muted-foreground text-sm leading-snug">
          {description}
        </span>
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} disabled={disabled} />
    </div>
  )
}

export default CookieConsentBanner