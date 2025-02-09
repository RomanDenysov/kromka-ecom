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

import { ThankYouData } from '..'
import { getEmailAssetUrl } from '../utils'

export const ThankYouEmail = ({ orderId }: ThankYouData) => {
  return (
    <Html>
      <Head />
      <Preview>Ďakujeme za vašu objednávku - Kromka</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Column align="center">
                <Img
                  src={getEmailAssetUrl(`/logo/logo-black-rounded.png`)}
                  width="70"
                  height="70"
                  alt="Kromka Logo"
                />
              </Column>
            </Row>
          </Section>

          <Section style={messageSection}>
            <Text style={heading}>Ďakujeme, že máte radi naše lakocinky!</Text>
            <Text style={mainText}>
              Tešíme sa na vás aj nabudúce, zatiaľ si nás pozrite napríklad na našich sociálnych
              sieťach.
            </Text>
            <Text style={signature}>Váš tím pekárne Kromka</Text>
          </Section>

          <Section>
            <Row>
              <Column align="center" style={footerIcon}>
                <Img
                  src={getEmailAssetUrl(`/logo/kromka_logo.svg`)}
                  width="30"
                  height="30"
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
  padding: '40px',
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  margin: '20px 0',
  textAlign: 'center' as const,
}

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#333333',
  margin: '0 0 20px 0',
}

const mainText = {
  fontSize: '16px',
  color: '#555555',
  lineHeight: '1.5',
  margin: '0 0 20px 0',
}

const signature = {
  fontSize: '18px',
  color: '#333333',
  fontStyle: 'italic',
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