import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { getEmailAssetUrl } from '../utils'

interface OrderConfirmationEmailProps {
  email: string
  orderId: string
  pickupPlace: string
  pickupPlaceUrl: string
}

export const OrderConfirmationEmail = ({
  orderId,
  pickupPlace,
  pickupPlaceUrl,
}: OrderConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Už sa to pečie, už sa to chystá! - Kromka</Preview>
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
            <Text style={heading}>Už sa to pečie, už sa to chystá!</Text>
            <Text style={mainText}>
              Práve pre vás chystáme vaše lakocinky. Ešte k nám však nechoďte, keď bude všetko
              pripravené, dáme vám vedieť.
            </Text>
            <Text style={pickupText}>
              Svoju objednávku si môžete vyzdvihnúť na vami zvolenej predajni podľa aktuálnej
              otváracej doby.
            </Text>
            <Link href={pickupPlaceUrl} style={pickupLink}>
              {pickupPlace}
            </Link>
          </Section>
          <Section style={contactSection}>
            <Text style={contactText}>
              Ak máte nejaké otázky, pokojne nás kontaktujte na našich telefónnych číslach:
            </Text>
            <Text style={contactDetails}>
              Prešov:{' '}
              <Link
                href={'tel:+421908889550'}
                style={{
                  textDecoration: 'underline',
                }}
              >
                0908 889 550
              </Link>
              <br />
              Košice: Kuzmányho{' '}
              <Link
                href={'tel:+421907993881'}
                style={{
                  textDecoration: 'underline',
                }}
              >
                0907 993 881
              </Link>
              <br />
              Košice: Masarykova{' '}
              <Link
                href={'tel:+421919085558'}
                style={{
                  textDecoration: 'underline',
                }}
              >
                0919 085 558
              </Link>
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
  padding: '20px',
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  margin: '20px 0',
}

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#333333',
  textAlign: 'center' as const,
  margin: '20px 0',
}

const mainText = {
  fontSize: '16px',
  color: '#555555',
  lineHeight: '1.5',
  margin: '16px 0',
}

const pickupText = {
  fontSize: '14px',
  color: '#666666',
  margin: '16px 0 8px 0',
}

const pickupLink = {
  color: '#15c',
  textDecoration: 'underline',
  fontSize: '14px',
}

const contactSection = {
  margin: '20px 0',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
}

const contactText = {
  fontSize: '14px',
  color: '#666666',
  margin: '0 0 8px 0',
}

const contactDetails = {
  fontSize: '14px',
  color: '#333333',
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
