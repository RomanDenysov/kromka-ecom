import type { Product } from '@payload-types'
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { formatDate } from 'date-fns'
import { env } from '~/env'
import { formatPrice } from '~/lib/utils'
import { getEmailAssetUrl, getProductImageUrl } from '../utils'
import { orderIdFormatter } from '~/lib/utils'

type ReceiptProduct = {
  product: Product
  quantity: number
}

interface ReceiptEmailProps {
  email: string
  date: Date
  status: string
  orderId: string
  method: 'card' | 'store'
  pickupPlace: string
  pickupPlaceUrl: string
  products: ReceiptProduct[]
  total: number
}

export const ReceiptEmail = ({
  email,
  date,
  orderId,
  status,
  method,
  products,
  pickupPlaceUrl,
  pickupPlace,
  total,
}: ReceiptEmailProps) => {
  const receiptOrderId = orderIdFormatter(orderId)

  return (
    <Html>
      <Head />
      <Preview>Objednávka v Pekaren Kromka</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Column>
                {/* TODO: Add kromka logo */}
                <Img
                  src={getEmailAssetUrl('/public/logo/logo-black-rounded.png')}
                  width="42"
                  height="42"
                  alt="Kromka Logo"
                />
              </Column>

              <Column align="right" style={tableCell}>
                <Text style={heading}>Vaša objednávka</Text>
              </Column>
            </Row>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>STATUS OBJEDNÁVKY</Text>
                      <Text style={informationTableValue}>{status}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>SPÔSOB PLATBY</Text>
                      <Text style={informationTableValue}>
                        {method === 'card' ? 'Platba kartou' : 'Platba v obchode'}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>DÁTUM VYTVORENIA OBJEDNÁVKY</Text>
                      <Text style={informationTableValue}>{formatDate(date, 'dd MM yyyy')}</Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>ČÍSLO OBJEDNÁVKY</Text>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: '#15c',
                          textDecoration: 'underline',
                        }}
                      >
                        {receiptOrderId}
                      </Link>
                    </Column>
                  </Row>
                </Section>
              </Column>
              <Column style={informationTableColumn} colSpan={2}>
                <Text style={informationTableLabel}>MIESTO VYZDVIHNUTIA</Text>
                <Link
                  href={pickupPlaceUrl}
                  style={{
                    ...informationTableValue,
                    color: '#15c',
                    textDecoration: 'underline',
                  }}
                >
                  {pickupPlace}
                </Link>
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>Produkty</Text>
          </Section>
          <Section>
            {products.map(({ product, quantity }) => {
              const productImageUrl =
                typeof product.images[0].image !== 'string'
                  ? getProductImageUrl(product.images[0].image.url as string)
                  : getProductImageUrl(product.images[0].image)

              const productCategory =
                typeof product.category !== 'string' ? product.category.title : product.category

              const unformattedPrice = product.price * quantity
              const formattedProductPrice = formatPrice(unformattedPrice)

              return (
                <Row>
                  <Column style={{ width: '64px' }}>
                    <Img
                      src={productImageUrl!}
                      width="64"
                      height="64"
                      alt={product.title}
                      style={productIcon}
                    />
                  </Column>
                  <Column style={{ paddingLeft: '22px' }}>
                    <Text style={productTitle}>
                      {product.title} x {quantity}ks
                    </Text>
                    <Text style={productDescription}>{productCategory}</Text>
                    {/* TODO: Add product link */}
                    {/* <Link
                      href="https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc=us&amp;id=1497977514&amp;o=i&amp;type=Subscription%20Renewal"
                      style={productLink}
                      data-saferedirecturl="https://www.google.com/url?q=https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc%3Dus%26id%3D1497977514%26o%3Di%26type%3DSubscription%2520Renewal&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw2DFCLKMo1snS-Swk5H26Z1"
                    >

                    </Link> */}
                  </Column>

                  <Column style={productPriceWrapper} align="right">
                    <Text style={productPrice}>{formattedProductPrice}</Text>
                  </Column>
                </Row>
              )
            })}
          </Section>
          <Hr style={productPriceLine} />
          <Section align="right">
            <Row>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>SPOLU</Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>{formatPrice(total)}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={productPriceLineBottom} />

          <Section>
            <Row>
              <Column align="center" style={footerIcon}>
                <Img
                  src={getEmailAssetUrl('/public/logo/logo-black-rounded.png')}
                  width="26"
                  height="26"
                  alt="Kromka Logo"
                />
              </Column>
            </Row>
          </Section>
          <Text style={footerLinksWrapper}>
            • <Link href={`${env.NEXT_PUBLIC_SERVER_URL}/profile`}>Nastavenia účtu</Link> •{' '}
            <Link href={`${env.NEXT_PUBLIC_SERVER_URL}/terms`}>Obchodné podmienky</Link>•{' '}
            <Link href={`${env.NEXT_PUBLIC_SERVER_URL}/privacy`}>Ochrana osobných údajov</Link>
          </Text>
          <Text style={footerCopyright}>© 2024 Všetky práva vyhradené pre Kromka s.r.o.</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: '#ffffff',
}

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
  maxWidth: '100%',
}

const tableCell = { display: 'table-cell' }

const heading = {
  fontSize: '32px',
  fontWeight: '300',
  color: '#888888',
}

const cupomText = {
  textAlign: 'center' as const,
  margin: '36px 0 40px 0',
  fontSize: '14px',
  fontWeight: '500',
  color: '#111111',
}

const supStyle = {
  fontWeight: '300',
}

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
}

const informationTableRow = {
  height: '46px',
}

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
}

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
}

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const productTitleTable = {
  ...informationTable,
  margin: '30px 0 15px 0',
  height: '24px',
}

const productsTitle = {
  background: '#fafafa',
  paddingLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
}

const productIcon = {
  margin: '0 0 0 20px',
  borderRadius: '14px',
  border: '1px solid rgba(128,128,128,0.2)',
}

const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText }

const productDescription = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  ...resetText,
}

const productLink = {
  fontSize: '12px',
  color: 'rgb(0,112,201)',
  textDecoration: 'none',
}

const divisor = {
  marginLeft: '4px',
  marginRight: '4px',
  color: 'rgb(51,51,51)',
  fontWeight: 200,
}

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right' as const,
}

const productPrice = {
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
}

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap' as const,
  textAlign: 'right' as const,
}

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
}

const productPriceLine = { margin: '30px 0 0 0' }

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
}

const productPriceLargeWrapper = { display: 'table-cell', width: '90px' }

const productPriceLineBottom = { margin: '0 0 75px 0' }

const block = { display: 'block' }

const ctaTitle = {
  display: 'block',
  margin: '15px 0 0 0',
}

const ctaText = { fontSize: '24px', fontWeight: '500' }

const walletWrapper = { display: 'table-cell', margin: '10px 0 0 0' }

const walletLink = { color: 'rgb(0,126,255)', textDecoration: 'none' }

const walletImage = {
  display: 'inherit',
  paddingRight: '8px',
  verticalAlign: 'middle',
}

const walletBottomLine = { margin: '65px 0 20px 0' }

const footerText = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '0',
  lineHeight: 'auto',
  marginBottom: '16px',
}

const footerTextCenter = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '20px 0',
  lineHeight: 'auto',
  textAlign: 'center' as const,
}

const footerLink = { color: 'rgb(0,115,255)' }

const footerIcon = { display: 'block', margin: '40px 0 0 0' }

const footerLinksWrapper = {
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}

const walletLinkText = {
  fontSize: '14px',
  fontWeight: '400',
  textDecoration: 'none',
}
