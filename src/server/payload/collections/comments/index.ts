import type {CollectionConfig} from 'payload'
import {COLLECTIONS} from '../../config'

const Comments: CollectionConfig = {
	slug: COLLECTIONS.COMMENTS,
	admin: {
		useAsTitle: 'user'
	},
	fields: [
		{
			name: 'user',
			type: 'relationship',
			relationTo: COLLECTIONS.USERS,
			required: true,
			hasMany: false,
			admin: {
				position: 'sidebar'
			}
		},
		{
			name: 'comment',
			type: 'textarea',
			required: true,
			minLength: 1,
			maxLength: 1000
		}
	],
	timestamps: true
}

export default Comments
