import React from 'react'
import { Product, Media } from '@payload-types'

type LayoutType = 'card' | 'inline' | 'featured'

type ProductBlockProps = {
  product: Product
  layout?: LayoutType
}

export const ProductBlock: React.FC<ProductBlockProps> = ({ product, layout = 'card' }) => {
  if (!product) return null

  const layoutClasses: Record<LayoutType, string> = {
    card: 'flex flex-col md:flex-row gap-8 bg-card rounded-lg border border-border p-6',
    inline: 'flex flex-col sm:flex-row items-center gap-4 bg-card rounded border-border border p-4',
    featured: 'flex flex-col gap-8 max-w-4xl mx-auto bg-card rounded-xl border border-border p-8',
  }

  const imageClasses: Record<LayoutType, string> = {
    card: 'w-full md:w-1/3 aspect-square rounded-lg object-cover',
    inline: 'w-24 h-24 rounded-lg object-cover',
    featured: 'w-full aspect-video rounded-xl object-cover',
  }

  return (
    <div className="container my-8">
      <div className={layoutClasses[layout]}>
        {product.images?.[0] && (
          <img
            src={(product!.images[0]!.image as Media).url || '/placeholder.png'}
            alt={product.title}
            className={imageClasses[layout]}
          />
        )}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">{product.title}</h3>
              {product.price && (
                <p className="text-xl font-medium text-muted-foreground mt-1">${product.price}</p>
              )}
            </div>
          </div>
          {product.descr && <p className="text-muted-foreground">{product.descr}</p>}
        </div>
      </div>
    </div>
  )
}
