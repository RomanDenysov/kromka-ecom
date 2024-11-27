import { TagIcon } from 'lucide-react'
import { Button } from '~/lib/ui/components/button'

const tags = ['Pekáreň', 'Káva', 'Recepty', 'Novinky']
const TagsFilter = () => {
  return (
    <section>
      <div className="flex items-center gap-3 flex-wrap">
        <TagIcon size={16} className="text-muted-foreground" />
        {tags.map((tag) => (
          <Button key={tag} variant={'outline'} size={'sm'}>
            {tag}
          </Button>
        ))}
      </div>
    </section>
  )
}

export default TagsFilter
