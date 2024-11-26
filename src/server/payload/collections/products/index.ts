import type { CollectionConfig } from 'payload'
import { COLLECTIONS, COLLECTIONS_GROUPS } from '../../config'
import orderField from '../../fields/order'
import slugField from '../../fields/slug'
import { stripe } from '~/lib/stripe'
import { isAdmin, isAdminOrManager } from '../../access'
import { PriceFormatter } from '~/lib/utils'

const Products: CollectionConfig = {
  slug: COLLECTIONS.PRODUCTS,
  admin: {
    group: COLLECTIONS_GROUPS.SHOP,
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'price'],
  },
  access: {
    read: () => true,
    create: isAdminOrManager,
    update: isAdminOrManager,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (data && data.price) {
          data.price = PriceFormatter.formatPriceNumber(data.price)
        }
        if (data && data.optsPrice) {
          data.optsPrice = PriceFormatter.formatPriceNumber(data.optsPrice)
        }
      },
    ],
    beforeChange: [
      async ({ req, operation, data }) => {
        if (req.user && operation === 'create') {
          data.createdBy = req.user.id
        }
        if (operation === 'create' && data) {
          const stripeProduct = await stripe.products.create({
            name: data.title,
            default_price_data: {
              currency: 'eur',
              unit_amount: PriceFormatter.toStripeAmount(data.price),
            },
          })
          data.stripeId = stripeProduct.id
          data.priceId = stripeProduct.default_price as string
        }
        if (operation === 'update' && data.stripeId) {
          const newPrice = await stripe.prices.create({
            product: data.stripeId,
            currency: 'eur',
            unit_amount: PriceFormatter.toStripeAmount(data.price),
          })
          await stripe.products.update(data.stripeId, {
            name: data.title,
            default_price: newPrice.id,
          })
          data.priceId = newPrice.id
        }
        return data
      },
    ],
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
    slugField('title'),
    {
      name: 'descr',
      type: 'textarea',
      required: true,
      admin: {
        placeholder: 'Product description',
      },
    },
    {
      name: 'opts',
      type: 'textarea',
      admin: {
        placeholder: 'Product options, e.g. size, ingredients, weight',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'active', label: 'Active' },
        { value: 'archived', label: 'Archived' },
        { value: 'sold', label: 'Sold' },
      ],
      defaultValue: 'draft',
    },

    {
      name: 'category',
      type: 'relationship',
      required: true,
      hasMany: false,
      relationTo: COLLECTIONS.CATEGORIES,
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
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value === 'number') {
              return PriceFormatter.formatPriceNumber(value)
            }
            return value
          },
        ],
      },
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
        hidden: true,
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value === 'number') {
              return PriceFormatter.formatPriceNumber(value)
            }
            return value
          },
        ],
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
          relationTo: COLLECTIONS.MEDIA,
          required: true,
        },
      ],
    },
    orderField,
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Is this product featured?',
        hidden: true,
      },
    },
    {
      name: 'priceId',
      type: 'text',
      access: {
        read: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: 'stripeId',
      type: 'text',
      access: {
        read: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: COLLECTIONS.USERS,
      hasMany: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'User who created this product',
      },
    },
  ],
  timestamps: true,
}

export default Products
