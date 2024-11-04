import type {CollectionConfig} from 'payload'
import {COLLECTIONS} from '../../config'
import orderField from '../../fields/order'
import slugField from '../../fields/slug'

const Products: CollectionConfig = {
	slug: COLLECTIONS.PRODUCTS,
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'status', 'category', 'price']
	},
	access: {},
	hooks: {},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			admin: {
				placeholder: 'Product name'
			},
			maxLength: 100
		},
		slugField('title'),
		{
			name: 'descr',
			type: 'textarea',
			required: true,
			admin: {
				placeholder: 'Product description'
			}
		},
		{
			name: 'opts',
			type: 'textarea',
			admin: {
				placeholder: 'Product options, e.g. size, ingredients, weight'
			}
		},
		{
			name: 'status',
			type: 'select',
			required: true,
			options: [
				{value: 'draft', label: 'Draft'},
				{value: 'active', label: 'Active'},
				{value: 'archived', label: 'Archived'},
				{value: 'sold', label: 'Sold'}
			],
			defaultValue: 'draft'
		},

		{
			name: 'category',
			type: 'relationship',
			required: true,
			hasMany: false,
			relationTo: COLLECTIONS.CATEGORIES,
			populate: {
				fields: ['title', 'slug']
			}
		},
		{
			name: 'price',
			type: 'number',
			required: true,
			min: 0,
			max: 100,
			admin: {
				step: 0.01,
				placeholder: 'Product price',
				position: 'sidebar'
			}
		},
		{
			name: 'optsPrice',
			type: 'number',
			min: 0,
			max: 100,
			admin: {
				step: 0.01,
				placeholder: 'Product options price',
				position: 'sidebar',
				hidden: true
			}
		},
		{
			name: 'images',
			type: 'array',
			maxRows: 4,
			required: true,
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: COLLECTIONS.MEDIA,
					requided: true
				}
			]
		},
		orderField,
		{
			name: 'isFeatured',
			type: 'checkbox',
			defaultValue: false,
			admin: {
				position: 'sidebar',
				description: 'Is this product featured?',
				hidden: true
			}
		},
		{
			name: 'priceId',
			type: 'text',
			access: {
				read: () => false
			},
			admin: {
				hidden: true
			}
		},
		{
			name: 'stripeId',
			type: 'text',
			access: {
				read: () => false
			},
			admin: {
				hidden: true
			}
		}
	],
	timestamps: true
}

export default Products
