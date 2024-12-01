import { Skeleton } from '~/lib/ui/components/skeleton'

export default function Loading() {
  return (
    <div className="inline-flex items-center justify-start gap-x-2">
      <Skeleton className="h-3 w-12" />
      <Skeleton className="h-3 w-3" />
      <Skeleton className="h-3 w-12" />
      <Skeleton className="h-3 w-3" />
      <Skeleton className="h-3 w-12" />
    </div>
  )
}
