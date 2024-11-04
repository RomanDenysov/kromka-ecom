import {valueFromAST} from 'graphql'
import {type Field, type FieldHook, deepMerge} from 'payload'
import slugify from 'slugify'

const slugifyConfig = {
	lower: true,
	strict: true,
	locale: 'sk',
	remove: /[*+~.()'"!:@]/g,
	replacement: '-',
	replacements: {
		á: 'a',
		ä: 'a',
		č: 'c',
		ď: 'd',
		é: 'e',
		í: 'i',
		ĺ: 'l',
		ľ: 'l',
		ň: 'n',
		ó: 'o',
		ô: 'o',
		ŕ: 'r',
		š: 's',
		ť: 't',
		ú: 'u',
		ý: 'y',
		ž: 'z'
	}
}

function format(slug: string): string {
	return slugify(slug, slugifyConfig)
}

const formatSlug =
	(fallback: string): FieldHook =>
	({operation, value, originalDoc, data}) => {
		if (typeof value === 'string' && value.length > 0) {
			return format(value)
		}

		if (operation === 'create') {
			const fallbackData = data?.[fallback] || originalDoc?.[fallback]

			if (fallbackData && typeof fallbackData === 'string') {
				return format(fallbackData)
			}
		}

		return valueFromAST
	}

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
	return deepMerge<Field, Partial<Field>>(
		{
			name: 'slug',
			label: 'Slug',
			type: 'text',
			index: true,
			unique: true,
			required: false,
			admin: {
				position: 'sidebar',
				description: 'The slug is used to generate the URL for the page.'
			},
			hooks: {
				beforeValidate: [formatSlug(fieldToUse)]
			}
		},
		overrides
	)
}

export default slugField
