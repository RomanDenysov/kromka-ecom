import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { formatPrice, prodUrl } from '~/lib/utils'
import { api } from '~/trpc/server'

// Route segment config
// export const runtime = 'edge'
// Image metadata
export const alt = 'Obrázok produktu v Pekárni Kromka'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image(props: {
  params: Promise<{
    product: string
  }>
}) {
  console.log(props)
  const { product: productSlug } = await props.params
  const urlDecodedProduct = decodeURIComponent(productSlug)
  const product = await api.products.bySlug({ slug: urlDecodedProduct })

  if (!product) notFound()

  const productImage =
    typeof product.images[0].image !== 'string'
      ? product.images[0].image.url
      : product.images[0].image

  const imageUrl = productImage?.startsWith('http')

  const productImageUrl = imageUrl ? productImage : `${prodUrl}${productImage}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{
              width: '300px',
              marginBottom: '30px',
            }}
            src={productImageUrl ?? '/placeholder.svg'}
            alt={product.title || alt}
          />
        </div>
      </div>
      <h1
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        {product.title}
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', display: 'flex', fontSize: '24px', textDecorationLine: 'none' }}>
          {product.descr.slice(0, 155)}
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          fontSize: '24px',
          marginTop: '10px',
        }}
      >
        ${formatPrice(product.price)}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
