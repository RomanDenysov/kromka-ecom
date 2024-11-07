'use client'

import { Skeleton } from '~/lib/ui/components/skeleton'

const SingleProductPlaceholder = () => {
  return (
    <article className="lg:grid lg:grid-cols-2 lg:gap-x-8">
      <div className="space-y-4 lg:max-w-lg lg:self-start">
        <div className="relative w-full overflow-hidden rounded-xl">
          <Skeleton className="h-6 w-2/4" />
          <Skeleton className="mt-2 h-4 w-1/4" />
          <Skeleton className="mt-6 h-20 w-3/4" />
        </div>
        <Skeleton className="mt-4 h-4 w-2/3 rounded-lg" />
        <Skeleton className="mt-4 h-20 w-3/4" />
        <Skeleton className="mt-2 h-4 w-16 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-12 rounded-lg" />
      </div>
      <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div className="aspect-square rounded-lg">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-end">
        <div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </article>
  )
}

export default SingleProductPlaceholder
