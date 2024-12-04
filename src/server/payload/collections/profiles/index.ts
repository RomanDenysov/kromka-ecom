import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'

const Profiles: CollectionConfig = {
  slug: COLLECTIONS.PROFILES,
  admin: {
    group: COLLECTIONS_GROUPS.ADMIN,
    useAsTitle: 'contactDisplay',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Profile',
      name: 'contactDisplay',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Contact Information',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            const contacts = data?.contacts || {}
            const { email = '', name = '', phone = '' } = contacts
            return `${email} - ${name} - ${phone}`
          },
        ],
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: COLLECTIONS.USERS,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'User who associated with this profile',
      },
      index: true,
    },
    {
      name: 'contacts',
      type: 'group',
      label: 'Contacts',
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'Name',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Phone number',
          },
        },
        {
          name: 'email',
          type: 'text',
          admin: {
            description: 'Email',
          },
        },
      ],
    },
    {
      name: 'customerOptions',
      type: 'group',
      label: 'Customer options',
      fields: [
        {
          name: 'store',
          type: 'relationship',
          relationTo: COLLECTIONS.STORES,
          hasMany: false,
          admin: {
            description: 'Preffered store',
          },
        },
        {
          name: 'method',
          type: 'select',
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
          admin: {
            description: 'Preffered payment method',
          },
        },
      ],
    },
    {
      name: 'options',
      type: 'group',
      label: 'Profile options',
      fields: [
        {
          name: 'terms',
          type: 'checkbox',
          required: true,
          defaultValue: false,
          admin: {
            description: 'Terms and conditions',
          },
        },
        {
          name: 'privacy',
          type: 'checkbox',
          required: true,
          defaultValue: false,
          admin: {
            description: 'Privacy policy',
          },
        },
        {
          name: 'cookie',
          type: 'checkbox',
          required: true,
          defaultValue: false,
          admin: {
            description: 'Cookie policy',
          },
        },
      ],
    },
    {
      name: 'isRegistered',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  timestamps: true,
}

export default Profiles
