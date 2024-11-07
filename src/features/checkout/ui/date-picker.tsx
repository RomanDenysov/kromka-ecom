'use client'

import {format, isBefore, isSameDay, isSunday, startOfToday} from 'date-fns'
import {Calendar as CalendarIcon} from 'lucide-react'
import * as React from 'react'

import {Button} from '~/lib/ui/components/button'
import {Calendar} from '~/lib/ui/components/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '~/lib/ui/components/popover'
import {cn} from '~/lib/utils'

type Props = {
	onDateSelect?: (date: Date | undefined) => void
}

const DatePicker = ({onDateSelect}: Props) => {
	const [date, setDate] = React.useState<Date>()

	const isBeforeNoon = React.useMemo(() => {
		const noon = new Date()
		noon.setHours(12, 0, 0, 0)
		return isBefore(new Date(), noon)
	}, [])

	const handleSelectDate = (newDate: Date | undefined) => {
		if (!newDate || isSunday(newDate) || isBefore(newDate, startOfToday()))
			return

		const isToday = isSameDay(newDate, startOfToday())

		if (isToday && !isBeforeNoon) return

		setDate(newDate)
		onDateSelect?.(newDate)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'PP') : <span>Zvoľte si dátum pre odber</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					weekStartsOn={1}
					lang='sk'
					selected={date}
					onSelect={handleSelectDate}
					required={true}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

export default DatePicker
