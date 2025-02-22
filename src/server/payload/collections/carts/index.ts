import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import productItemsField from '../../fields/product-items'

const Carts: CollectionConfig = {
  slug: COLLECTIONS.CARTS,
  admin: {
    group: COLLECTIONS_GROUPS.SHOP,
    useAsTitle: 'user',
    defaultColumns: ['user', 'total'],
    hidden: true,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
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
    productItemsField,
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Total price of the cart',
      },
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: COLLECTIONS.PROFILES,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'Customer profile',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Link for sharing the cart',
      },
    },
  ],
  timestamps: true,
}

export default Carts
