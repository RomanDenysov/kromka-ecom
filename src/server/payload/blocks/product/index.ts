import { Block } from 'payload'

export const Product: Block = {
  slug: 'product',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Product name',
      },
      maxLength: 100,
    },
    {
      name: 'descr',
      type: 'textarea',
      required: true,
      admin: {
        placeholder: 'Product description',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      required: true,
      hasMany: false,
      relationTo: 'categories',
      admin: {
        sortOptions: 'slug',
      },
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
        position: 'sidebar',
      },
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
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
