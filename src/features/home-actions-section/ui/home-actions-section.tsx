import { ActionCard, B2BCard, PostCard } from '~/features/home-actions-section/ui'

const actionCards = [
  {
    className: 'sm:col-span-1 h-40 sm:h-80',
    href: '/',
    title: 'SPOLUPRÁCA',
    alternativeTitle: 'Zistiť viac',
    image: '/images/spolupraca-banner.webp',
  },
  {
    className: 'sm:col-span-2 h-40 sm:h-80',
    href: '/b2b',
    title: 'B2B Riešenia',
    alternativeTitle: 'Zistiť viac',
    image: '/images/B2B-Banner.webp',
  },
]

export default function HomeActionsSection() {
  return (
    <section className="grid sm:grid-cols-3 gap-6 auto-rows-fr">
      {actionCards.map((card) => (
        <ActionCard key={card.title} {...card} />
      ))}
    </section>
  )
}
