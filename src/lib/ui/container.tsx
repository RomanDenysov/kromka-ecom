import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '~/lib/utils'

export const Container = ({
	children,
	className
}: ComponentPropsWithoutRef<'div'>) => {
	return <div className={cn('container mx-auto size-full px-4 md:px-8', className)}>{children}</div>
}
