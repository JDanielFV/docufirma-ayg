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
  Button
} from '@react-email/components';
import * as React from 'react';

interface DeliveryEmailProps {
  date: string;
}

export const DeliveryEmail = ({ date }: DeliveryEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Comprobante de Entrega - Papelería Notarial</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Papelería Notarial</Heading>
            <Text style={edition}>Comprobante Oficial de Entrega</Text>
          </Section>
          
          <Section style={content}>
            <Text style={paragraph}>
              <strong>Estimado cliente,</strong>
            </Text>
            <Text style={paragraph}>
              Agradecemos sinceramente su preferencia. Este mensaje confirma la recepción y procesamiento exitoso de su solicitud. Esperamos que nuestro material cumpla con los más altos estándares y sus expectativas.
            </Text>
            
            <Section style={detailsBox}>
              <Text style={detailLabel}>Fecha de Operación</Text>
              <Text style={detailValue}>{date}</Text>
            </Section>

            <Text style={paragraph}>
              El comprobante oficial se encuentra adjunto a este correo en formato PDF. Por motivos de seguridad y privacidad, la firma digital ha sido procesada de forma segura y eliminada de nuestros registros temporales tras la generación de este documento.
            </Text>

            <Section style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
              <Button style={button} href="https://papelerianotarial.net">
                Visitar Nuestro Sitio
              </Button>
            </Section>

            <Hr style={hr} />
            
            <Text style={footer}>
              Si tiene alguna duda o aclaración, no dude en contactarnos a través de <Link style={link} href="mailto:soporte@papelerianotarial.net">soporte@papelerianotarial.net</Link>.
            </Text>
            <Text style={footer}>
              Este es un mensaje automático transaccional. Por favor, no responda directamente a esta dirección.
              <br /><br />
              © {new Date().getFullYear()} Papelería Notarial | papelerianotarial.net
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default DeliveryEmail;

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const header = {
  borderLeft: '4px solid #D4AF37',
  paddingLeft: '20px',
  marginBottom: '40px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '600',
  letterSpacing: '-0.5px',
  margin: '0',
};

const edition = {
  color: '#D4AF37',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '2px',
  margin: '8px 0 0 0',
};

const content = {
  backgroundColor: '#141414',
  padding: '40px',
  borderRadius: '8px',
  border: '1px solid #262626',
};

const paragraph = {
  color: '#a3a3a3',
  fontSize: '15px',
  lineHeight: '24px',
  marginBottom: '20px',
};

const detailsBox = {
  backgroundColor: '#0a0a0a',
  padding: '24px',
  borderRadius: '6px',
  border: '1px solid #262626',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const detailLabel = {
  color: '#737373',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '1.5px',
  margin: '0 0 8px 0',
};

const detailValue = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
};

const button = {
  backgroundColor: '#ffffff',
  color: '#000000',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 24px',
  borderRadius: '4px',
};

const hr = {
  borderColor: '#262626',
  margin: '32px 0',
};

const footer = {
  color: '#737373',
  fontSize: '12px',
  textAlign: 'center' as const,
  lineHeight: '20px',
  marginBottom: '10px',
};

const link = {
  color: '#D4AF37',
  textDecoration: 'underline',
};
