import { CollectionBeforeChangeHook } from 'payload'

const WORDS_PER_MINUTE = 225 // Average reading speed

export const calculateReadingTime: CollectionBeforeChangeHook = ({ data }) => {
  if (!data.content) return data

  try {
    // Convert Lexical rich text content to plain text
    const plainText = lexicalToPlainText(data.content)

    // Calculate words count
    const wordCount = plainText.split(/\s+/).filter(Boolean).length

    // Calculate reading time
    const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

    return {
      ...data,
      readingTime,
    }
  } catch (error) {
    console.error('Error calculating reading time:', error)
    return data
  }
}

type LexicalNode = {
  text?: string
  children?: LexicalNode[]
  type?: string
  format?: number
  [key: string]: any
}

export function lexicalToPlainText(content: any): string {
  if (!content) return ''

  // If content is a string (happens when content is serialized), parse it
  const nodes = typeof content === 'string' ? JSON.parse(content) : content

  // If nodes is not an array, try to get root.children
  const nodesArray = Array.isArray(nodes) ? nodes : nodes?.root?.children || []

  return nodesArray.map((node: LexicalNode) => extractTextFromNode(node)).join(' ')
}

function extractTextFromNode(node: LexicalNode): string {
  if (!node) return ''

  // If node has text, return it
  if (node.text) return node.text

  // If node has children, recursively extract text from them
  if (node.children) {
    return node.children.map(extractTextFromNode).join(' ')
  }

  return ''
}
