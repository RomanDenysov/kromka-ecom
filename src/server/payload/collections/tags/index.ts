import type { CollectionConfig } from 'payload'
import { isAdminOrAuthor } from '../../access'
import { COLLECTIONS_GROUPS } from '../../config'
import slugField from '../../fields/slug'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    group: COLLECTIONS_GROUPS.BLOG,
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdminOrAuthor,
    update: isAdminOrAuthor,
    delete: isAdminOrAuthor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Tag name',
      },
      maxLength: 100,
      index: true,
    },
    slugField('title'),
    {
      name: 'isSearchable',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Tags
