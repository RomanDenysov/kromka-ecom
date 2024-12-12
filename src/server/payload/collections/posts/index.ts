import type { CollectionConfig } from 'payload'
import { isAdminOrAuthor } from '../../access'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import slugField from '../../fields/slug'
import { enhancedLexical } from './enchanced-lexical'
import { calculateReadingTime } from './hooks/calculate-reading-time'
import { populateAuthors } from './hooks/populate-authors'
import { revalidatePost } from './hooks/revalidate-path'
import { setAuthor } from './hooks/set-author'
import { setPublishDate } from './hooks/set-publish-date'

const Posts: CollectionConfig = {
  slug: COLLECTIONS.POSTS,
  admin: {
    group: COLLECTIONS_GROUPS.BLOG,
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [setPublishDate, setAuthor, calculateReadingTime],
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
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
        placeholder: 'Post title',
      },
    },
    slugField('title'),
    // TODO: Add before validate author setter

    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              editor: enhancedLexical,
              label: false,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
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
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
          ],
          label: 'Metadata',
        },
      ],
    },
    {
      name: 'authors',
      type: 'relationship',
      label: 'Author',
      hasMany: true,
      relationTo: COLLECTIONS.USERS,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
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
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      access: {
        update: () => false,
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  timestamps: true,
}

export default Posts
