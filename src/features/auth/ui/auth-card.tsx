import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/lib/ui/components/card'
import { AuthProviders } from './auth-providers'
import { EmailForm } from './email-form'

export default function AuthCard() {
  return (
    <Card className="z-50">
      <CardHeader className="w-full text-center">
        <CardTitle>Prihlášení</CardTitle>
        <CardDescription>Zvolte si prosím metodu přihlášení</CardDescription>
      </CardHeader>
      <CardContent className="flex mx-auto size-full">
        <div className="flex-grow flex flex-col gap-y-4">
          <EmailForm />
          <div className="inline-flex w-full items-center justify-center gap-x-2">
            <div className="h-px w-full bg-border" />
            <span className="text-sm text-muted-foreground tracking-tight">alebo</span>
            <div className="h-px w-full bg-border" />
          </div>
          <AuthProviders />
        </div>
      </CardContent>
    </Card>
  )
}
