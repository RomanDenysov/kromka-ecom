import type { CollectionConfig } from 'payload'
import { COLLECTIONS } from '../../config'
import productItemsField from '../../fields/product-items'
import slugField from '../../fields/slug'

const Stores: CollectionConfig = {
  slug: COLLECTIONS.STORES,
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Store name',
      },
      maxLength: 100,
    },
    slugField('title'),
    productItemsField,
    {
      name: 'image',
      type: 'upload',
      relationTo: COLLECTIONS.MEDIA,
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        placeholder: 'Store address for Clients',
      },
    },
    {
      name: 'addressUrl',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        placeholder: 'URL from Google maps',
      },
    },
    {
      name: 'contacts',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Phone number',
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            placeholder: 'Email',
          },
        },
      ],
    },
    {
      name: 'workingHours',
      type: 'group',
      fields: [
        {
          name: 'week',
          type: 'text',
          required: true,
          admin: {
            placeholder: '(Monday - Friday)',
          },
        },
        {
          name: 'saturday',
          type: 'text',
          admin: {
            placeholder: '(Saturday)',
          },
        },
        {
          name: 'sunday',
          type: 'text',
          admin: {
            placeholder: '(Sunday)',
          },
        },
      ],
    },
    {
      name: 'managers',
      type: 'relationship',
      relationTo: COLLECTIONS.USERS,
      required: true,
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Managers of this store',
      },
    },
    {
      name: 'isVisible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Is this store visible?',
      },
    },
    {
      name: 'isOpen',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Is this store open?',
      },
    },
  ],
  timestamps: true,
}

export default Stores
