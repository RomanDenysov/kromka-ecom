import { Config } from 'payload'
import {
  BlocksFeature,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
  lexicalEditor,
  HeadingFeature,
  UploadFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { ProductBlock } from '../../blocks/product/config'
import { MediaBlock } from '../../blocks/media-block/config'

export const enhancedLexical: Config['editor'] = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
      }),
      BlocksFeature({
        blocks: [ProductBlock, MediaBlock],
      }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
      LinkFeature({
        enabledCollections: ['posts', 'products'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false
            return true
          })
          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: ({ linkType }) => linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
            },
          ]
        },
      }),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'caption',
                type: 'text',
              },
            ],
          },
        },
      }),
    ]
  },
})
