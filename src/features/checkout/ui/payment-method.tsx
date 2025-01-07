'use client'

import { CreditCardIcon, StoreIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Label } from '~/lib/ui/components/label'
import { RadioGroup, RadioGroupItem } from '~/lib/ui/components/radio-group'

type Props = {
  onMethodSelect?: (value: string) => void
  defaultValue?: string
}

const DISABLED_CARD_PAYMENT_METHOD_FEATURE_FLAG = false

const PaymentMethod = ({ onMethodSelect, defaultValue }: Props) => {
  const onDisabledCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (DISABLED_CARD_PAYMENT_METHOD_FEATURE_FLAG) {
      toast.warning('Platba kartou ONLINE je dočasne nedostupná.')
    }
  }

  return (
    <RadioGroup
      value={defaultValue || 'store'}
      className="grid grid-cols-2 gap-4"
      onValueChange={onMethodSelect}
    >
      <div>
        <RadioGroupItem id="store" value="store" className="peer sr-only" />
        <Label
          htmlFor="store"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <StoreIcon size={28} className="mb-3 text-muted-foreground" />
          Pri vyzdvihnutí
        </Label>
      </div>
      <div>
        <RadioGroupItem
          id="card"
          value="card"
          className="peer sr-only"
          disabled={DISABLED_CARD_PAYMENT_METHOD_FEATURE_FLAG}
        />
        <Label
          htmlFor="card"
          onClick={DISABLED_CARD_PAYMENT_METHOD_FEATURE_FLAG ? onDisabledCardClick : undefined}
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <CreditCardIcon size={28} className="mb-3 text-muted-foreground" />
          Kartou
        </Label>
      </div>
    </RadioGroup>
  )
}

export default PaymentMethod
