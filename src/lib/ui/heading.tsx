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
        className="text-left font-bold text-2xl md:text-3xl tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="lg:mt-1.5 max-w-xl text-left text-base leading-relaxed tracking-tight md:text-lg font-medium text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
