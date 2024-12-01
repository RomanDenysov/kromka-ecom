import { LegalNavigation } from '~/features/legal-navigation/ui'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative flex-col md:flex-row">
      <div className="lg:w-64 flex-none">
        <div className="sticky top-20">
          <LegalNavigation />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="prose prose-slate max-w-none">{children}</div>
      </div>
    </div>
  )
}
