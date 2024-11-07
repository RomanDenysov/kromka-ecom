import { cn } from '~/lib/utils'

type Props = {
  title: string
  subtitle?: string
  className?: string
}

export const Heading = ({ title, subtitle, className }: Props) => {
  if (!title) return null

  return (
    <div className={cn('w-fit', className)}>
      <h2
        key={`heading-${title}`}
        className=" text-2xl sm:text-3xl lg:text-4xl font-bold text-primary"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="lg:mt-1.5 text-sm sm:text-base xl:text-lg lg:text-lg font-medium text-muted-foreground line-clamp-2 text-ellipsis">
          {subtitle}
        </p>
      )}
    </div>
  )
}
