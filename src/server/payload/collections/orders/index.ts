import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import productItemsField from '../../fields/product-items'

const Orders: CollectionConfig = {
  slug: COLLECTIONS.ORDERS,
  admin: {
    group: COLLECTIONS_GROUPS.SHOP,
    useAsTitle: 'user',
    defaultColumns: ['user', 'status', 'total'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: COLLECTIONS.USERS,
      hasMany: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: COLLECTIONS.PROFILES,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pickupStore',
      type: 'relationship',
      relationTo: COLLECTIONS.STORES,
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    productItemsField,
    {
      name: 'pickupDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'method',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Store',
          value: 'store',
        },
        {
          label: 'Card',
          value: 'card',
        },
      ],
      defaultValue: 'store',
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The status of the payment',
      },
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'In progress',
          value: 'progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Processing',
          value: 'processing',
        },
        {
          label: 'Ready',
          value: 'ready',
        },
        {
          label: 'Complete',
          value: 'complete',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
      defaultValue: 'new',
    },
    {
      name: 'optionalPrice',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        step: 0.01,
        hidden: true,
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
        step: 0.01,
      },
    },
    {
      name: '_isPaid',
      type: 'checkbox',
      required: true,
      access: {
        read: () => false,
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
  ],
  timestamps: true,
}

export default Orders
