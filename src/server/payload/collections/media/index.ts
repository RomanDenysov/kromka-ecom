import path from 'node:path'
import {fileURLToPath} from 'node:url'
import type {CollectionConfig} from 'payload'
import {COLLECTIONS} from '../../config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Media: CollectionConfig = {
	slug: COLLECTIONS.MEDIA,
	access: {
		read: () => true
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true
		}
	],
	upload: {
		imageSizes: [
			{
				name: 'sm',
				width: 320,
				height: 240,
				position: 'centre'
			},
			{
				name: 'thumbnail',
				width: 480,
				height: 320,
				position: 'centre'
			},
			{
				name: 'md',
				width: 640,
				height: 480,
				position: 'centre'
			},
			{
				name: 'lg',
				width: 1024,
				height: undefined,
				position: 'centre'
			}
		],
		staticDir: path.resolve(dirname, '../../../../public/media'),
		mimeTypes: [
			'image/jpeg',
			'image/png',
			'image/jpg',
			'image/svg+xml',
			'image/webp'
		]
	}
}

export default Media
