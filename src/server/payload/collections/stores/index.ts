import type { CollectionConfig } from 'payload'
import { isAdminOrManager } from '../../access'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import slugField from '../../fields/slug'

const Stores: CollectionConfig = {
  slug: COLLECTIONS.STORES,
  admin: {
    group: COLLECTIONS_GROUPS.SHOP,
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdminOrManager,
    update: isAdminOrManager,
    delete: () => false,
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
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
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
          ],
        },
        {
          label: 'Inventory',
          fields: [
            {
              name: 'inventory',
              label: 'Producty',
              type: 'array',
              admin: {
                description: 'Manage product inventory specific to this store',
              },
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: COLLECTIONS.PRODUCTS,
                  required: true,
                  admin: {
                    description: 'Select a product to add to store inventory',
                  },
                },
                {
                  name: 'quantity',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    description: 'Available quantity in this store',
                    step: 1,
                  },
                },
                {
                  name: 'isAvailable',
                  type: 'checkbox',
                  label: 'Available in this store',
                  defaultValue: true,
                  admin: {
                    description:
                      'Toggle to make product available/unavailable specifically in this store',
                  },
                },
                {
                  name: 'stockAlert',
                  type: 'number',
                  label: 'Low stock alert threshold',
                  min: 0,
                  admin: {
                    description: 'Get alerted when quantity falls below this number',
                    step: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
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
