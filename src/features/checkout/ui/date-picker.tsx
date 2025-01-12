'use client'

import { addDays, format, isAfter, isBefore, isSameDay, isSunday, startOfToday } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '~/lib/ui/components/button'
import { Calendar } from '~/lib/ui/components/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/lib/ui/components/popover'
import { cn } from '~/lib/utils'

type Props = {
  onDateSelect?: (date: Date | undefined) => void
}

const DatePicker = ({ onDateSelect }: Props) => {
  const [date, setDate] = React.useState<Date>()

  const isBeforeNoon = React.useMemo(() => {
    const now = new Date()
    const noon = new Date()
    noon.setHours(12, 0, 0, 0)
    return isBefore(now, noon)
  }, [])

  const handleSelectDate = (newDate: Date | undefined) => {
    if (!newDate) return

    const today = startOfToday()
    const tomorrow = addDays(today, 1)

    // Проверка на воскресенье
    if (isSunday(newDate)) return

    // Проверка на прошедшие даты
    if (isBefore(newDate, today)) return

    // Если выбран сегодняшний день - запрещаем
    if (isSameDay(newDate, today)) return

    // Если выбрано завтра, проверяем время
    if (isSameDay(newDate, tomorrow) && !isBeforeNoon) return

    // Ограничение на будущие даты (опционально)
    const maxDate = addDays(today, 30) // например, максимум на 30 дней вперед
    if (isAfter(newDate, maxDate)) return

    setDate(newDate)
    onDateSelect?.(newDate)
  }

  const disabledDays = React.useCallback(
    (date: Date) => {
      const today = startOfToday()
      const tomorrow = addDays(today, 1)

      return (
        isSunday(date) || // Запрет воскресений
        isBefore(date, today) || // Запрет прошедших дат
        isSameDay(date, today) || // Запрет текущего дня
        (isSameDay(date, tomorrow) && !isBeforeNoon) // Запрет завтрашнего дня после 12:00
      )
    },
    [isBeforeNoon],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PP') : <span>Zvoľte si dátum pre odber</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          weekStartsOn={1}
          selected={date}
          onSelect={handleSelectDate}
          disabled={disabledDays}
          required
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
