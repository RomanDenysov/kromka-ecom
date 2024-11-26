import { CallToActionBlock, MediaBlock, BannerBlock, CMSLink } from '~/lib/ui/ui-blocks'
import React, { Fragment, JSX } from 'react'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@payload-types'

// Битовые маски для форматирования текста
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './node-format'

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps>

type Props = {
  nodes: NodeTypes[]
}

const hasFormat = (format: number | undefined, mask: number): boolean => {
  if (typeof format !== 'number') return false
  return (format & mask) === mask
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  if (!nodes || !Array.isArray(nodes)) {
    return <Fragment />
  }

  return (
    <Fragment>
      {nodes.map((node, index): JSX.Element | null => {
        if (!node || typeof node !== 'object') {
          return null
        }

        if (node.type === 'text') {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          } else {
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
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        if (node.type === 'block') {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }

          switch (blockType) {
            case 'cta':
              return <CallToActionBlock key={index} {...block} />
            case 'mediaBlock':
              return (
                <MediaBlock
                  className="col-start-1 col-span-3"
                  imgClassName="m-0"
                  key={index}
                  {...block}
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                  disableInnerContainer={true}
                />
              )
            case 'banner':
              return <BannerBlock className="col-start-2 mb-4" key={index} {...block} />
            default:
              console.warn(`Unknown block type: ${blockType}`)
              return null
          }
        }

        // Обработка остальных типов узлов
        switch (node.type) {
          case 'linebreak':
            return <br className="col-start-2" key={index} />

          case 'paragraph':
            return (
              <p className="col-start-2" key={index}>
                {serializedChildren}
              </p>
            )

          case 'heading':
            const HeadingTag = node?.tag || 'h1'
            return (
              <HeadingTag className="col-start-2" key={index}>
                {serializedChildren}
              </HeadingTag>
            )

          case 'list':
            const ListTag = node?.tag || 'ul'
            return (
              <ListTag className="list col-start-2" key={index}>
                {serializedChildren}
              </ListTag>
            )

          case 'listitem':
            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? 'true' : 'false'}
                  className={node.checked ? 'checked' : ''}
                  key={index}
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              )
            }
            return (
              <li key={index} value={node?.value}>
                {serializedChildren}
              </li>
            )

          case 'quote':
            return (
              <blockquote className="col-start-2" key={index}>
                {serializedChildren}
              </blockquote>
            )

          case 'link':
            const fields = node.fields
            return (
              <CMSLink
                key={index}
                newTab={Boolean(fields?.newTab)}
                type={fields?.linkType === 'internal' ? 'reference' : 'custom'}
                url={fields?.url}
              >
                {serializedChildren}
              </CMSLink>
            )

          default:
            console.warn(`Unknown node type: ${node.type}`)
            return null
        }
      })}
    </Fragment>
  )
}
