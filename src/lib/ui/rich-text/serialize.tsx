import React, { Fragment, type JSX } from 'react'

import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'

import { generateSlug } from '~/lib/utils'
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'

export type NodeTypes = DefaultNodeTypes | SerializedBlockNode<any>

type Props = {
  nodes: NodeTypes[]
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): any => {
        if (node == null) {
          return null
        }

        if (node.type === 'text') {
          // Добавим отладочный вывод
          console.log('Text node:', {
            text: node.text,
            format: node.format,
            isBold: !!(node.format & IS_BOLD),
            isItalic: !!(node.format & IS_ITALIC),
            isStrike: !!(node.format & IS_STRIKETHROUGH),
            isUnderline: !!(node.format & IS_UNDERLINE),
          })

          let text = <React.Fragment key={index}>{node.text}</React.Fragment>

          // Изменим порядок применения форматирования
          if (node.format) {
            if (node.format & IS_BOLD) {
              text = <strong key={index}>{text}</strong>
            }
            if (node.format & IS_ITALIC) {
              text = <em key={index}>{text}</em>
            }
            if (node.format & IS_STRIKETHROUGH) {
              text = <s key={index}>{text}</s> // Заменим span на s
            }
            if (node.format & IS_UNDERLINE) {
              text = <u key={index}>{text}</u> // Заменим span на u
            }
            if (node.format & IS_CODE) {
              text = <code key={index}>{text}</code>
            }
            if (node.format & IS_SUBSCRIPT) {
              text = <sub key={index}>{text}</sub>
            }
            if (node.format & IS_SUPERSCRIPT) {
              text = <sup key={index}>{text}</sup>
            }
          }

          return text
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          }
          if (node?.type === 'list' && node?.listType === 'check') {
            for (const item of node.children) {
              if ('checked' in item) {
                if (!item?.checked) {
                  item.checked = false
                }
              }
            }
          }
          return serializeLexical({ nodes: node.children as NodeTypes[] })
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        const getTextFromSerializedChildren = () => {}

        if (node.type === 'block') {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }
        } else {
          switch (node.type) {
            case 'upload': {
              if (
                node.value &&
                typeof node.value === 'object' &&
                'mimeType' in node.value &&
                'url' in node.value
              ) {
                const { mimeType, url } = node.value
                if (
                  typeof mimeType === 'string' &&
                  mimeType.includes('image') &&
                  typeof url === 'string'
                ) {
                  return (
                    <img
                      key={index}
                      src={url}
                      alt="Image"
                      className="col-start-2 w-full rounded-lg"
                      loading="lazy"
                    />
                  )
                }
              }
              return null
            }
            case 'linebreak': {
              return <br className="col-start-2" key={index} />
            }
            case 'paragraph': {
              return (
                <div className="col-start-2" key={index}>
                  {serializedChildren}
                </div>
              )
            }
            case 'heading': {
              const Tag = node?.tag
              const firstChildren = node.children?.[0] as any

              return (
                <Tag
                  id={`heading-${generateSlug(firstChildren?.text ?? '')}`}
                  className="col-start-2"
                  key={index}
                >
                  {serializedChildren}
                </Tag>
              )
            }
            case 'list': {
              const Tag = node?.tag
              return (
                <Tag className="list col-start-2" key={index}>
                  {serializedChildren}
                </Tag>
              )
            }
            case 'listitem': {
              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? 'true' : 'false'}
                    className={` ${node.checked ? '' : ''}`}
                    key={index}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="checkbox"
                    tabIndex={-1}
                    value={node?.value}
                  >
                    {serializedChildren}
                  </li>
                )
              } else {
                return (
                  <li key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                )
              }
            }
            case 'quote': {
              return (
                <blockquote className="col-start-2" key={index}>
                  {serializedChildren}
                </blockquote>
              )
            }
            // case 'link': {
            //   const fields = node.fields

            //   return (
            //     <CMSLink
            //       key={index}
            //       newTab={Boolean(fields?.newTab)}
            //       reference={fields.doc as any}
            //       type={fields.linkType === 'internal' ? 'reference' : 'custom'}
            //       url={fields.url}
            //     >
            //       {serializedChildren}
            //     </CMSLink>
            //   )
            // }

            default:
              return null
          }
        }
      })}
    </Fragment>
  )
}
