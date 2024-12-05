'use client'

import { CheckIcon, ClockIcon, HandCoinsIcon, InfoIcon, StoreIcon, TruckIcon } from 'lucide-react'
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useIntersection, useMedia, useMountedState } from 'react-use'
import type { Product } from '~/server/payload/payload-types'
import { cn, formatPrice } from '~/lib/utils'
import { Badge } from '~/lib/ui/components/badge'
import { ImageSlider } from '~/lib/ui/image-slider'
import AddToCartButton from './add-to-cart-button'
import SingleProductPlaceholder from './single-product-placeholder'
import { Separator } from '~/lib/ui/components/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/lib/ui/components/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/lib/ui/components/tabs'

type Props = {
  product: Product
}

const SHOW_INVENTORY_FEATURE_FLAG = false

const SingleProduct = ({ product }: Props) => {
  const isMobile = useMedia('(max-width: 768px)', false)
  const isMounted = useMountedState()
  const [showFixedButton, setShowFixedButton] = useState(false)

  const buttonRef = useRef<HTMLDivElement>(null)

  const intersection = useIntersection(buttonRef as RefObject<HTMLDivElement>, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })

  useEffect(() => {
    if (isMobile) {
      setShowFixedButton(!intersection?.isIntersecting)
    }
  }, [intersection?.isIntersecting, isMobile])

  const validUrls = useMemo(() => {
    return product.images
      .map(({ image }) => image && typeof image !== 'string' && image.url)
      .filter(Boolean) as string[]
  }, [product])

  if (!product || !isMounted) return <SingleProductPlaceholder />

  const price = formatPrice(product.price)
  const isInStock = product.status === 'active'

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
      {/* Left column */}
      <div className="space-y-6 lg:self-start">
        {/* Product Title and Category */}
        <div className="space-y-2 ">
          <div className="flex items-center gap-2">
            {product.category && (
              <Badge variant="secondary" className="text-xs">
                {typeof product.category === 'object' ? product.category.title : ''}
              </Badge>
            )}
            {isInStock ? (
              <Badge variant="success" className="text-xs">
                <CheckIcon size={12} className="mr-1" />
                Skladom
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                <ClockIcon size={12} className="mr-1" />
                Nie je skladom
              </Badge>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight line-clamp-2">
            {product.title}
          </h2>
        </div>
        <Separator />

        {/* Product Price and Features */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">{price}</h3>

          {/* <div className="flex items-center justify-start gap-x-2">
            <div>
              <div className="flex items-center gap-2 bg-red-300/40 rounded-lg text-sm text-muted-foreground w-fit py-1 px-2">
                <TruckIcon size={16} />
                <span>Doprava nedostupná</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 bg-red-300/40 rounded-lg text-sm text-muted-foreground w-fit py-1 px-2">
                <HandCoinsIcon size={16} />
                <span>Platba kartou nedostupná</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Store Availability */}
        {SHOW_INVENTORY_FEATURE_FLAG && (
          <div className="space-y-2">
            <h4 className="font-medium">Dostupnosť v predajniach</h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="flex items-center py-1 md:py-2">
                      <StoreIcon size={16} className="mr-1" />
                      Kromka Prešov: (8)
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Hlavná 123, Prešov</p>
                    <p>Otvorené: 8:00 - 18:00</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="flex items-center py-1 md:py-2" variant="destructive">
                      <StoreIcon size={16} className="mr-1" />
                      Kromka Košice: (0)
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Hlavná 456, Košice</p>
                    <p>Otvorené: 9:00 - 19:00</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Popis</TabsTrigger>
            <TabsTrigger value="ingredients">Zloženie</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-sm lg:text-base text-muted-foreground">{product.descr}</p>
          </TabsContent>
          <TabsContent value="ingredients" className="mt-4">
            <div className="flex items-center gap-2">
              <p className="text-sm lg:text-base text-muted-foreground">
                {product.opts || 'Informácie o zložení nie sú k dispozícii'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div className="aspect-square rounded-lg">
          <ImageSlider urls={validUrls} brightness={false} />
        </div>
      </div>

      {/* Основная кнопка с ref */}
      <div ref={buttonRef} className="mt-10 lg:col-start-1 lg:row-start-2 lg:self-end">
        <AddToCartButton product={product} />
      </div>

      {/* Фиксированная кнопка для мобильных */}
      {isMobile && showFixedButton && (
        <div
          className={cn(
            'fixed hidden transition inset-x-0 rounded-t-lg bottom-0 z-50 bg-white h-[68px] border-t border-border p-4',
            isMobile && showFixedButton && 'block',
          )}
        >
          <span className="absolute top-1 bg-border w-10 h-1.5 rounded-lg inset-1/2 -translate-x-1/2"></span>
          <AddToCartButton product={product} />
        </div>
      )}
    </div>
  )
}

export default SingleProduct
