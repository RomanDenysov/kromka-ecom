import { TagIcon } from 'lucide-react'
import { Button } from '~/lib/ui/components/button'
import { Tag } from '@payload-types'

type Props = {
  tags: Tag[]
}

const TagsFilter = ({ tags }: Props) => {
  return (
    <section>
      <div className="flex items-center gap-3 flex-wrap">
        <TagIcon size={16} className="text-muted-foreground" />
        {tags.map((tag) => (
          <Button key={tag.id} variant={'outline'} size={'sm'}>
            {tag.title}
          </Button>
        ))}
      </div>
    </section>
  )
}

export default TagsFilter
