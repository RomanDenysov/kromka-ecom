'use client'

import { format, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Label } from '~/lib/ui/components/label'
import { RadioGroup, RadioGroupItem } from '~/lib/ui/components/radio-group'
import { cn } from '~/lib/utils'

export function DateSelector(props: {
  value?: Date
  onChange: (date: Date) => void
  availableDates: string[]
}) {
  const { value, onChange, availableDates } = props
  return (
    <RadioGroup
      value={value ? format(value, 'yyyy-MM-dd') : undefined}
      className="grid grid-cols-2 gap-4"
      onValueChange={(dateString) => {
        const selectedDate = parse(dateString, 'yyyy-MM-dd', new Date())
        onChange(selectedDate)
      }}
    >
      {availableDates.map((dateString) => {
        const date = parse(dateString, 'yyyy-MM-dd', new Date())
        const displayDateString = format(date, 'MMMM d')

        return (
          <div key={dateString}>
            <RadioGroupItem id={dateString} value={dateString} className="peer sr-only" />
            <Label
              htmlFor={dateString}
              className={cn(
                'flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary',
              )}
            >
              <CalendarIcon size={28} className="mb-3 text-muted-foreground" />
              {displayDateString}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}
