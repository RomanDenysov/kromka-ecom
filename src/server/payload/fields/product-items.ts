import type {Field} from 'payload'
import {COLLECTIONS} from '../config'

const productItemsField: Field = {
	name: 'productItems',
	type: 'array',
	fields: [
		{
			name: 'product',
			type: 'relationship',
			relationTo: COLLECTIONS.PRODUCTS,
			required: true
		},
		{
			name: 'quantity',
			type: 'number',
			required: true,
			min: 1
		}
	]
}

export default productItemsField
