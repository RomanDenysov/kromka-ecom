import fs from 'node:fs'
import { MetadataRoute } from 'next/types'
import { prodUrl } from '~/lib/utils/absolute-url'

let appFolders: fs.Dirent[]
try {
  appFolders = fs.readdirSync('app', { withFileTypes: true })
} catch (error) {
  console.error('Error reading app directory:', error)
  appFolders = []
}

const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => !folder.name.startsWith('_'))
  .filter((folder) => !folder.name.startsWith('('))
  .map((folder) => folder.name)

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  return [
    {
      url: new URL('/', prodUrl).href,
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: new URL(page, prodUrl).href,
      lastModified: new Date(),
    })),
  ]
}

export default sitemap
