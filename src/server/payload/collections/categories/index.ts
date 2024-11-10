import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import orderField from '../../fields/order'
import slugField from '../../fields/slug'

const Categories: CollectionConfig = {
  slug: COLLECTIONS.CATEGORIES,
  admin: {
    group: COLLECTIONS_GROUPS.SHOP,
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Category name',
      },
      maxLength: 100,
    },
    slugField('title'),
    orderField,
    {
      name: 'image',
      type: 'upload',
      relationTo: COLLECTIONS.MEDIA,
      required: true,
    },
    {
      name: 'isVisible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Is this category visible?',
        hidden: true,
      },
    },
    {
      name: 'products',
      type: 'join',
      collection: COLLECTIONS.PRODUCTS,
      on: 'category',
    },
  ],
  timestamps: true,
}
export default Categories
