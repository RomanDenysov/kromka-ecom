import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrManager } from '../../access'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import productItemsField from '../../fields/product-items'
import { handleStatusChange } from './hooks'

const Orders: CollectionConfig = {
  slug: COLLECTIONS.ORDERS,
  admin: {
    group: COLLECTIONS_GROUPS.SHOP,
    useAsTitle: 'user',
    defaultColumns: ['user', 'status', 'total'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: isAdminOrManager,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, originalDoc, data }) => {
        if (operation === 'update') {
          return handleStatusChange({ req, originalDoc, data })
        }
        return data
      },
    ],
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
    {
      name: 'note',
      type: 'text',
      label: 'Note',
      maxLength: 1000,
    },
  ],
  timestamps: true,
}

export default Orders
