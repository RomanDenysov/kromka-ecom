import { cn } from '~/lib/utils'
import React from 'react'

import { serializeLexical } from './serialize'

type Props = {
  className?: string
  content: Record<string, any>

  enableProse?: boolean
}

const RichText = ({ className, content }: Props) => {
  if (!content) {
    return null
  }

  return (
    <div className={cn('mx-auto prose dark:prose-invert', className)}>
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText
