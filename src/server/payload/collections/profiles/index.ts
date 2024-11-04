import type {CollectionConfig} from 'payload'
import {COLLECTIONS} from '../../config'

const Profiles: CollectionConfig = {
	slug: COLLECTIONS.PROFILES,
	admin: {},
	access: {
		read: () => true
	},
	fields: [
		{
			name: 'id',
			type: 'text',
			required: true,
			maxLength: 100,
			index: true
		},
		{
			name: 'user',
			type: 'relationship',
			relationTo: COLLECTIONS.USERS,
			hasMany: false,
			admin: {
				position: 'sidebar',
				description: 'User who liked this'
			}
		},
		{
			name: 'contacts',
			type: 'group',
			label: 'Contacts',
			fields: [
				{
					name: 'name',
					type: 'text',
					admin: {
						description: 'Name'
					}
				},
				{
					name: 'phone',
					type: 'text',
					admin: {
						description: 'Phone number'
					}
				},
				{
					name: 'email',
					type: 'text',
					admin: {
						description: 'Email'
					}
				}
			]
		},
		{
			name: 'options',
			type: 'group',
			label: 'Profile options',
			fields: [
				{
					name: 'terms',
					type: 'checkbox',
					required: true,
					defaultValue: true,
					admin: {
						description: 'Terms and conditions'
					}
				},
				{
					name: 'privacy',
					type: 'checkbox',
					required: true,
					defaultValue: true,
					admin: {
						description: 'Privacy policy'
					}
				},
				{
					name: 'cookie',
					type: 'checkbox',
					required: true,
					defaultValue: true,
					admin: {
						description: 'Cookie policy'
					}
				}
			]
		},
		{
			name: 'isRegistered',
			type: 'checkbox',
			defaultValue: false
		}
	],
	timestamps: true
}

export default Profiles
