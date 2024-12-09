import type { Product } from '@payload-types'
import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { formatDate } from 'date-fns'
import { orderIdFormatter } from '~/lib/utils'
import { getEmailAssetUrl } from '../utils'

type OrderProduct = {
  product: Product
  quantity: number
}

interface NewOrderEmailProps {
  orderId: string
  pickupPlace: string
  products: OrderProduct[]
  customerNote?: string
  paymentMethod: 'card' | 'store'
  pickupTime: Date
  customer: {
    name: string
    email: string
    phone: string
  }
}

export const NewOrderEmail = ({
  orderId,
  pickupPlace,
  products,
  paymentMethod,
  pickupTime,
  customer,
}: NewOrderEmailProps) => {
  const receiptOrderId = orderIdFormatter(orderId)

  return (
    <Html>
      <Head />
      <Preview>
        Nová objednávka #{receiptOrderId} - {pickupPlace}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Column align="center">
                <Img
                  src={getEmailAssetUrl('/logo/logo-black-rounded.png')}
                  width="100"
                  height="100"
                  alt="Kromka Logo"
                />
              </Column>
            </Row>
          </Section>
          <Section style={messageSection}>
            <Text style={heading}>Nová objednávka #{receiptOrderId}</Text>
            <Text style={subheading}>Predajňa: {pickupPlace}</Text>

            <Section style={orderDetailsSection}>
              <Text style={sectionTitle}>Detaily objednávky:</Text>
              <Text style={detailText}>
                Datum vyzdvihnutia: {formatDate(pickupTime, 'dd-MM-yyyy')}
                <br />
                Spôsob platby:{' '}
                {paymentMethod === 'card' ? 'Zaplatené kartou' : 'Platba na predajni'}
                <br />
                ID pre databazu: #{orderId}
              </Text>
            </Section>

            <Section style={customerSection}>
              <Text style={sectionTitle}>Informácie o zákazníkovi:</Text>
              <Text style={detailText}>
                Meno: {customer.name}
                <br />
                Email: {customer.email}
                <br />
                Telefón: {customer.phone}
              </Text>
            </Section>

            <Section style={productsSection}>
              <Text style={sectionTitle}>Produkty:</Text>
              {products.map(({ product, quantity }) => (
                <Text key={product.id} style={productText}>
                  • {product.title} - {quantity}ks
                </Text>
              ))}
            </Section>
          </Section>

          <Section>
            <Row>
              <Column align="center" style={footerIcon}>
                <Img
                  src={getEmailAssetUrl('/logo/logo-black-rounded.png')}
                  width="26"
                  height="26"
                  alt="Kromka Logo"
                />
              </Column>
            </Row>
          </Section>
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

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
  maxWidth: '100%',
}

const customerSection = {
  margin: '20px 0',
  padding: '15px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
}

const messageSection = {
  padding: '30px',
  backgroundColor: '#f8f8f8',
  borderRadius: '12px',
  margin: '20px 0',
}

const heading = {
  fontSize: '28px',
  fontWeight: '600',
  color: '#333333',
  margin: '0 0 10px 0',
  textAlign: 'center' as const,
}

const subheading = {
  fontSize: '20px',
  color: '#555555',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
}

const orderDetailsSection = {
  margin: '20px 0',
  padding: '15px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
}

const productsSection = {
  margin: '20px 0',
  padding: '15px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
}

const sectionTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#333333',
  margin: '0 0 10px 0',
}

const detailText = {
  fontSize: '14px',
  color: '#555555',
  lineHeight: '1.6',
  margin: '0',
}

const productText = {
  fontSize: '14px',
  color: '#555555',
  lineHeight: '1.6',
  margin: '5px 0',
}

const noteText = {
  fontSize: '14px',
  color: '#666666',
  fontStyle: 'italic',
  lineHeight: '1.6',
  margin: '0',
}

const footerIcon = {
  display: 'block',
  margin: '40px 0 0 0',
}

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}
