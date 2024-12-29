import { type DefaultEditorType, RichTextElement } from '@payloadcms/richtext-lexical'

type RichTextContent = {
  root: DefaultEditorType['root']
} | null | undefined

interface RichTextProps {
  content: RichTextContent
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content?.root?.children) {
    return null
  }

  return (
    <div className="prose prose-lg max-w-none">
      <RichTextElement content={content} />
    </div>
  )
}
