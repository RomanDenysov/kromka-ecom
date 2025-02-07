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
import { getEmailAssetUrl } from '../utils'

type OrderReadyProps = {
  email: string
  orderId: string
  pickupPlace: string
}

export const OrderReadyEmail = ({ orderId, pickupPlace }: OrderReadyProps) => {
  return (
    <Html>
      <Head />
      <Preview>Vaše lakocinky sú nachystané, príďte do Kromky!</Preview>

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
            <Text style={heading}>Vaše lakocinky sú nachystané, príďte do Kromky!</Text>
            <Text style={mainText}>
              Vaša objednávka na vás počká na našej predajni {pickupPlace}. Ďakujeme, že máte radi
              chlieb, lakocinky a kávu tak ako my!
            </Text>
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

const messageSection = {
  padding: '30px',
  backgroundColor: '#f8f8f8',
  borderRadius: '12px',
  margin: '20px 0',
  textAlign: 'center' as const,
}

const heading = {
  fontSize: '28px',
  fontWeight: '600',
  color: '#333333',
  margin: '0 0 20px 0',
}

const mainText = {
  fontSize: '16px',
  color: '#555555',
  lineHeight: '1.6',
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
