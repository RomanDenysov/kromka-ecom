import type { CollectionConfig } from 'payload'
import slugField from '../../fields/slug'
import { COLLECTIONS_GROUPS } from '../../config'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    group: COLLECTIONS_GROUPS.BLOG,
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
