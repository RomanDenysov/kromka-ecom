import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'

const Comments: CollectionConfig = {
  slug: COLLECTIONS.COMMENTS,
  admin: {
    group: COLLECTIONS_GROUPS.BLOG,
    useAsTitle: 'user',
    hidden: true,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: COLLECTIONS.USERS,
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      minLength: 1,
      maxLength: 1000,
    },
  ],
  timestamps: true,
}

export default Comments
