import path from 'node:path'
import { fileURLToPath } from 'node:url'
// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/plugin-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

import { authjsPlugin } from 'payload-authjs'
import { env } from '~/env'
import authConfig from '~/lib/auth/auth.config'
import { COLLECTIONS } from './config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: COLLECTIONS.USERS,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
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
  editor: lexicalEditor(),
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
    // push: true,
    idType: 'uuid',
  }),
  graphQL: {
    disable: true,
  },
  sharp,
  plugins: [authjsPlugin({ authjsConfig: authConfig }), payloadCloudPlugin()],
})
