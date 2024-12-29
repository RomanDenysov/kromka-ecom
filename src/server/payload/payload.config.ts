import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import {
  Carts,
  Categories,
  Comments,
  Likes,
  Media,
  Orders,
  Posts,
  Products,
  Profiles,
  Stores,
  Supports,
  Tags,
  Users,
} from './collections'

import {
  BlockQuoteFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { authjsPlugin } from 'payload-authjs'
import { env } from '~/env'
import authConfig from '~/lib/auth/auth.config'
import { COLLECTIONS } from './config'
import { getEmailAdapter } from './utils/email-adapter'
// import { migrations } from '~/migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: COLLECTIONS.USERS,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  email: getEmailAdapter(),
  collections: [
    Users,
    Products,
    Orders,
    Carts,
    Likes,
    Media,
    Posts,
    Comments,
    Profiles,
    Supports,
    Tags,
    Categories,
    Stores,
  ],
  // editor: defaultLexical,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      }),
      BlockQuoteFeature({}),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      ParagraphFeature(),
      LinkFeature({
        fields: [
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            hasMany: true,
            options: ['nofollow', 'noopener', 'noreferrer'],
          },
        ],
      }),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'alt',
                type: 'text',
                required: true,
              },
            ],
          },
        },
      }),
    ],
  }),
  secret: env.PAYLOAD_SECRET,
  cors: ['https://checkout.stripe.com', env.NEXT_PUBLIC_SERVER_URL],
  csrf: ['https://checkout.stripe.com', env.NEXT_PUBLIC_SERVER_URL],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    autoGenerate: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
    push: env.NODE_ENV === 'development',
    idType: 'uuid',
    // prodMigrations: env.NODE_ENV === 'production' ? migrations : undefined,
  }),
  graphQL: {
    disable: true,
  },
  sharp,
  plugins: [authjsPlugin({ authjsConfig: authConfig }), payloadCloudPlugin()],
})
