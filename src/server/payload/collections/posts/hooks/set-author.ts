import type { CollectionBeforeChangeHook } from 'payload'

export const setAuthor: CollectionBeforeChangeHook = async ({ req, data, operation }) => {
  // Only set author on create
  if (operation === 'create') {
    const user = req.user

    // If there's a logged-in user and no authors are set
    if (user && (!data.authors || data.authors.length === 0)) {
      return {
        ...data,
        authors: [user.id],
      }
    }
  }

  return data
}
