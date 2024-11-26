'use client'

import { useRowLabel } from '@payloadcms/ui'

export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()

  const customLabel = `${data.title || 'Slide'} ${String(rowNumber).padStart(2, '0')} `

  return <div>Custom Label: {customLabel}</div>
}
