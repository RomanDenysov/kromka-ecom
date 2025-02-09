import type { Field } from 'payload'

const productItemsField: Field = {
  name: 'productItems',
  type: 'array',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
      min: 1,
    },
  ],
}

export default productItemsField
