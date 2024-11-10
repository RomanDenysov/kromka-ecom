import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'

const Supports: CollectionConfig = {
  slug: COLLECTIONS.SUPPORTS,
  admin: {
    group: COLLECTIONS_GROUPS.ADMIN,
    useAsTitle: 'user',
    defaultColumns: ['user', 'case'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      label: 'User',
      relationTo: COLLECTIONS.USERS,
      hasMany: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'case',
      type: 'select',
      required: true,
      label: 'Case',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Shop',
          value: 'shop',
        },
        {
          label: 'Blog',
          value: 'blog',
        },
        {
          label: 'B2B',
          value: 'b2b',
        },
        {
          label: 'Weather',
          value: 'weather',
        },
        {
          label: 'Website',
          value: 'website',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'shop',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
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
      name: 'comment',
      type: 'textarea',
      label: 'Comment',
      required: true,
      minLength: 1,
    },
    {
      name: 'contacts',
      type: 'group',
      label: 'User contacts',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            placeholder: 'Phone number',
          },
        },

        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            placeholder: 'Email',
          },
        },
      ],
    },
    {
      name: 'isResolved',
      type: 'checkbox',
      label: 'Is resolved',
      required: true,
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

export default Supports
