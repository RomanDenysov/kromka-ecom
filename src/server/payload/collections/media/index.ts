import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import { isAdmin, isAdminOrAuthor, isAdminOrManager, isStaff } from '../../access'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Media: CollectionConfig = {
  slug: COLLECTIONS.MEDIA,
  admin: {
    group: COLLECTIONS_GROUPS.OTHER,
  },
  access: {
    read: () => true,
    update: isStaff,
    create: isStaff,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
    ],
    staticDir: path.resolve(dirname, '../../../../../public/media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/webp'],
  },
}

export default Media
