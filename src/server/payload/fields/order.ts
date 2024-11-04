import type {Field} from 'payload'

const orderField: Field = {
	name: 'order',
	type: 'number',
	min: 0,
	max: 10,
	defaultValue: 0,
	admin: {
		step: 1,
		description: 'For custom sorting'
	}
}

export default orderField
