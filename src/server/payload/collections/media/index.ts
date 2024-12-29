import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CollectionConfig } from 'payload'
import { env } from '~/env'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Media: CollectionConfig = {
  slug: COLLECTIONS.MEDIA,
  admin: {
    group: COLLECTIONS_GROUPS.OTHER,
  },
  access: {
    read: () => true,
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
    formatOptions: {
      format: 'webp',
      options: {
        quality: 70,
      },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: undefined,
        position: 'centre',
        fit: 'cover',
        withoutEnlargement: true,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        position: 'centre',
        fit: 'cover',
      },
      {
        name: 'small',
        width: 600,
        height: undefined,
        position: 'centre',
        fit: 'cover',
      },
      {
        name: 'medium',
        width: 900,
        height: undefined,
        position: 'centre',
        fit: 'cover',
      },
      {
        name: 'large',
        width: 1400,
        height: undefined,
        position: 'centre',
        fit: 'cover',
      },
      {
        name: 'xlarge',
        width: 1920,
        height: undefined,
        position: 'centre',
        fit: 'cover',
      },
    ],
    staticDir:
      env.NODE_ENV === 'production'
        ? '/app/public/media'
        : path.resolve(dirname, '../../../../../public/media'), // путь в контейнере
  },
}

export default Media
