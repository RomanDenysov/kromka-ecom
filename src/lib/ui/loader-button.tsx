'use client'
import { Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Button, ButtonProps } from './components/button'

export const LoaderButton = ({
	children,
	isLoading,
	className,
	...props
}: ButtonProps & {isLoading: boolean}) => {
	return (
		<Button {...props} disabled={isLoading} className={cn(className)}>
			{isLoading && <Loader2 size={20} className='mr-2 animate-spin' />}
			{children}
		</Button>
	)
}
