import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
  Img,
  Preview,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface DeliveryEmailProps {
  date: string;
}

export const DeliveryEmail = ({ date }: DeliveryEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Comprobante de Entrega - Bugatti Edition</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Docufirma</Heading>
            <Text style={edition}>Bugatti Liquid Crystal Edition</Text>
          </Section>
          
          <Section style={content}>
            <Text style={paragraph}>
              Se ha procesado una nueva entrega de suministros oficiales con nivel de precisión técnica validado.
            </Text>
            
            <Section style={detailsBox}>
              <Text style={detailLabel}>Fecha de Operación</Text>
              <Text style={detailValue}>{date}</Text>
            </Section>

            <Text style={paragraph}>
              El comprobante oficial se encuentra adjunto a este correo en formato PDF. Por seguridad y privacidad, la firma digital ha sido destruida del sistema tras la generación de este documento.
            </Text>

            <Hr style={hr} />
            
            <Text style={footer}>
              Este es un correo automático de control de suministros. 
              <br />
              © 2025 docufirma-ayg | Engineering by Bugatti Aesthetics
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default DeliveryEmail;

const main = {
  backgroundColor: '#050505',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const header = {
  borderLeft: '4px solid #0066FF',
  paddingLeft: '20px',
  marginBottom: '40px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '900',
  textTransform: 'uppercase' as const,
  margin: '0',
  letterSpacing: '-1px',
};

const edition = {
  color: '#0066FF',
  fontSize: '10px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  letterSpacing: '2px',
  margin: '4px 0 0 0',
};

const content = {
  backgroundColor: '#111111',
  padding: '40px',
  borderRadius: '4px',
  border: '1px solid #222',
};

const paragraph = {
  color: '#888',
  fontSize: '14px',
  lineHeight: '24px',
  marginBottom: '24px',
};

const detailsBox = {
  backgroundColor: '#0a0a0a',
  padding: '20px',
  borderRadius: '2px',
  border: '1px solid #1a1a1a',
  marginBottom: '24px',
};

const detailLabel = {
  color: '#444',
  fontSize: '10px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 4px 0',
};

const detailValue = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const hr = {
  borderColor: '#222',
  margin: '40px 0',
};

const footer = {
  color: '#444',
  fontSize: '10px',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  lineHeight: '18px',
};
