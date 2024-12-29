import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import type { Config } from 'payload'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      AlignFeature(),
      ItalicFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
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
                label: 'Описание фото',
                required: true,
              },
              {
                name: 'altText',
                type: 'text',
                label: 'Альтернативный текст',
                required: true,
              },
              {
                name: 'stage',
                type: 'select',
                label: 'Этап приготовления',
                options: [
                  { label: 'Ингредиенты', value: 'ingredients' },
                  { label: 'Процесс', value: 'process' },
                  { label: 'Готовый результат', value: 'result' },
                ],
              },
            ],
          },
        },
      }),
    ]
  },
})
