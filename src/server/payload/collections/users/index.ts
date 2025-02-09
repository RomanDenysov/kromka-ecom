import type { CollectionConfig } from 'payload'
import { isAdminOrCurrentUser } from '../../access'
import { COLLECTIONS_GROUPS } from '../../config'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: COLLECTIONS_GROUPS.ADMIN,
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'phone', 'role'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: isAdminOrCurrentUser,
    delete: () => false,
  },
  fields: [
    {
      name: 'visitorId',
      type: 'text',
      hidden: true,
      index: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone number',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Manager', value: 'manager' },
        { label: 'Author', value: 'author' },
        { label: 'Partner', value: 'partner' },
      ],
      required: true,
      hasMany: false,
      defaultValue: 'user',
    },
  ],
}

export default Users
