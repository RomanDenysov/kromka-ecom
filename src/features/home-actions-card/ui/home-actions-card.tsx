import { B2BCard, PostCard } from '~/features/home-actions-card/ui'

export default function HomeActionsCard() {
  return (
    <div className="flex flex-col items-center justify-stretch gap-4 md:flex-row md:gap-5">
      <PostCard />
      <B2BCard />
    </div>
  )
}
