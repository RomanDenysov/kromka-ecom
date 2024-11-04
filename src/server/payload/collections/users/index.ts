import type {CollectionConfig} from 'payload'

const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'email'
	},
	fields: [
		{
			name: 'role',
			type: 'select',
			options: [
				{label: 'Admin', value: 'admin'},
				{label: 'User', value: 'user'},
				{label: 'Manager', value: 'manager'},
				{label: 'Author', value: 'author'},
				{label: 'Partner', value: 'partner'}
			],
			required: true,
			hasMany: false,
			defaultValue: 'user'
		}
	]
}

export default Users
