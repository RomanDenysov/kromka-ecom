import { Block } from 'payload'
import { COLLECTIONS } from '../../config'

export const ProductBlock: Block = {
  slug: 'product',
  interfaceName: 'ProductBlock',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: COLLECTIONS.PRODUCTS,
      required: true,
      maxDepth: 1,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'card',
      options: [
        { label: 'Card', value: 'card' },
        { label: 'Inline', value: 'inline' },
        { label: 'Featured', value: 'featured' },
      ],
    },
  ],
}
