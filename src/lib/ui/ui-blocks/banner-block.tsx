import { BannerBlock as BannerBlockProps } from '@payload-types'
import RichText from '../rich-text'
import { cn } from '~/lib/utils'

type Props = {
  className?: string
} & BannerBlockProps

const BannerBlock = ({ className, content, style }: Props) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('flex items-center rounded border px-6 py-3', {
          'border-border bg-card': style === 'info',
          'border-error/30 bg-red-700/10': style === 'error',
          'border-warning/30 bg-amber-400/10': style === 'warning',
          'border-green-300/30 bg-green-600/10': style === 'success',
        })}
      >
        <RichText content={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}

export default BannerBlock
