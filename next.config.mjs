import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  images: {
    minimumCacheTTL: 31536000,
  },
}

export default withPayload(nextConfig)
