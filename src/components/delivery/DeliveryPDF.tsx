import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Product } from '@/hooks/useDeliveryStore';
import { LogoSVG } from './LogoSVG';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  watermarkImage: {
    width: 450,
    opacity: 0.04,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #D4AF37',
    paddingBottom: 20,
    marginBottom: 30,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    objectFit: 'contain',
  },
  titleGroup: {
    flexDirection: 'column',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a0a0a',
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 10,
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 4,
  },
  headerRight: {
    textAlign: 'right',
  },
  dateInfo: {
    fontSize: 10,
    color: '#737373',
    marginBottom: 4,
  },
  docId: {
    fontSize: 10,
    color: '#a3a3a3',
  },
  table: {
    width: '100%',
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0a0a0a',
    padding: 10,
    borderRadius: 4,
  },
  tableHeaderCol: {
    color: '#ffffff',
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e5e5e5',
    padding: 12,
  },
  colProduct: {
    flex: 3,
  },
  colQty: {
    flex: 1,
    textAlign: 'right',
  },
  productName: {
    fontSize: 12,
    color: '#171717',
  },
  productQty: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#171717',
  },
  signatureSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  signatureLine: {
    width: 250,
    borderTop: '1px solid #0a0a0a',
    marginTop: 5,
    paddingTop: 8,
    alignItems: 'center',
  },
  signatureImage: {
    width: 180,
    height: 70,
    objectFit: 'contain',
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#737373',
    letterSpacing: 1,
  },
  footerText: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#a3a3a3',
    borderTop: '1px solid #e5e5e5',
    paddingTop: 10,
  }
});

interface DeliveryPDFProps {
  products: Product[];
  date: string;
  signature: string;
}

export const DeliveryPDF = ({ products, date, signature }: DeliveryPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      <View style={styles.watermarkContainer}>
        <View style={styles.watermarkImage}>
          <LogoSVG fill="#f0f0f0" width={450} height={450} />
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <LogoSVG fill="#D4AF37" width={60} height={60} />
          </View>
          <View style={styles.titleGroup}>
            <Text style={styles.mainTitle}>Papelería Notarial</Text>
            <Text style={styles.subTitle}>Comprobante Oficial de Entrega</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.dateInfo}>{date}</Text>
          <Text style={styles.docId}>REF: DOC-AYG-2026</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCol, styles.colProduct]}>Descripción del Producto</Text>
          <Text style={[styles.tableHeaderCol, styles.colQty]}>Cantidad</Text>
        </View>
        {products.map((p) => (
          <View key={p.id} style={styles.tableRow}>
            <Text style={[styles.productName, styles.colProduct]}>{p.name}</Text>
            <Text style={[styles.productQty, styles.colQty]}>{p.quantity} pz</Text>
          </View>
        ))}
      </View>

      <View style={styles.signatureSection}>
        <Image src={signature} style={styles.signatureImage} />
        <View style={styles.signatureLine}>
          <Text style={styles.signatureLabel}>Firma de Conformidad del Cliente</Text>
        </View>
      </View>

      <Text style={styles.footerText}>
        Este documento certifica la recepción y conformidad de los materiales descritos. 
        Para cualquier aclaración, contactar a soporte@papelerianotarial.net. © {new Date().getFullYear()} Papelería Notarial.
      </Text>
    </Page>
  </Document>
);
