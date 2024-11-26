import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@payload-types'

import RichText from '~/lib/ui/rich-text'

const CallToActionBlock: React.FC<CTABlockProps> = ({ richText }) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" content={richText} enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
export default CallToActionBlock
