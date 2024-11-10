import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import slugField from '../../fields/slug'

const Posts: CollectionConfig = {
  slug: COLLECTIONS.POSTS,
  admin: {
    group: COLLECTIONS_GROUPS.BLOG,
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Post title',
      },
    },
    slugField('title'),
    // TODO: Add before validate author setter
    {
      name: 'user',
      type: 'relationship',
      label: 'Author',
      relationTo: COLLECTIONS.USERS,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      defaultValue: 'published',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: COLLECTIONS.TAGS,
      hasMany: true,
    },
    {
      name: 'banner',
      type: 'upload',
      label: 'Post banner',
      relationTo: COLLECTIONS.MEDIA,
      required: true,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Is featured',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

export default Posts
