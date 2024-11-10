import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'

const Likes: CollectionConfig = {
  slug: COLLECTIONS.LIKES,
  admin: {
    group: COLLECTIONS_GROUPS.BLOG,
    useAsTitle: 'user',
  },
  access: {},
  hooks: {},
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: COLLECTIONS.USERS,
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'User who liked this',
      },
    },
    {
      name: 'item',
      type: 'relationship',
      relationTo: [COLLECTIONS.PRODUCTS, COLLECTIONS.POSTS],
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'Item liked',
      },
    },
  ],
  timestamps: true,
}

export default Likes
