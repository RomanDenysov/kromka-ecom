import { format, isBefore, isToday, parse, startOfDay } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Label } from '~/lib/ui/components/label'
import { RadioGroup, RadioGroupItem } from '~/lib/ui/components/radio-group'
import { cn } from '~/lib/utils'

type Props = {
  onDateSelect?: (date: Date) => void
  defaultValue?: Date
  availableDates?: string[]
}

const DateSelector: React.FC<Props> = ({ onDateSelect, defaultValue, availableDates }) => {
  const displayDates =
    availableDates && availableDates.length > 0
      ? availableDates
      : Array.from({ length: 4 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() + i)
          return format(date, 'yyyy-MM-dd')
        })

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date())
    return isBefore(date, today) || isToday(date)
  }

  const handleDateSelect = (dateString: string) => {
    const selectedDate = parse(dateString, 'yyyy-MM-dd', new Date())
    if (!isDateDisabled(selectedDate)) {
      onDateSelect && onDateSelect(selectedDate)
    }
  }

  return (
    <RadioGroup
      value={defaultValue ? format(defaultValue, 'yyyy-MM-dd') : displayDates[0]}
      className="grid grid-cols-2 gap-4"
      onValueChange={handleDateSelect}
    >
      {displayDates.map((dateString) => {
        const date = parse(dateString, 'yyyy-MM-dd', new Date())
        const displayDateString = format(date, 'MMM d')
        const isDisabled = isDateDisabled(date)
        return (
          <div key={dateString}>
            <RadioGroupItem
              id={dateString}
              value={dateString}
              disabled={isDisabled}
              className="peer sr-only"
            />
            <Label
              htmlFor={dateString}
              className={cn(
                'flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary',
                isDisabled ? 'opacity-50 cursor-not-allowed' : '',
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

export default DateSelector
