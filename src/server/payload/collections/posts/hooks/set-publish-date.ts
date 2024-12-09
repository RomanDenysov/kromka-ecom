import { CollectionBeforeChangeHook } from 'payload'

export const setPublishDate: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  // If status is being changed to published and there's no publishedAt date
  if (data.status === 'published' && !data.publishedAt && originalDoc?.status !== 'published') {
    return {
      ...data,
      publishedAt: new Date().toISOString(),
    }
  }

  // If status is being changed from published to draft/archived, remove publishedAt
  if (data.status !== 'published' && originalDoc?.status === 'published') {
    return {
      ...data,
      publishedAt: null,
    }
  }

  return data
}
