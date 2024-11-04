import { cn } from '~/lib/utils'

type Props = {
	title: string
	subtitle?: string
	className?: string
}

export const Heading = ({title, subtitle, className}: Props) => {

	if (!title) return null

	return (
		<div className={cn('', className)}>
			<h2 key={`heading-${title}`}>
				{title}
			</h2>
			{subtitle && (
				<p key={`subtitle-${subtitle}`}>
					{subtitle}
				</p>
			)}
		</div>
	)
}
