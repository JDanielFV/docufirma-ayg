import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Product } from '@/hooks/useDeliveryStore';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #2563eb',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  info: {
    marginTop: 10,
    color: '#64748b',
  },
  table: {
    width: '100%',
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e2e8f0',
    padding: 8,
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    fontWeight: 'bold',
  },
  colProduct: {
    flex: 3,
  },
  colQty: {
    flex: 1,
    textAlign: 'right',
  },
  signatureSection: {
    marginTop: 40,
    borderTop: '1px solid #e2e8f0',
    paddingTop: 20,
  },
  signatureLabel: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 10,
  },
  signatureImage: {
    width: 200,
    height: 80,
    objectFit: 'contain',
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
      <View style={styles.header}>
        <Text style={styles.title}>Comprobante de Entrega</Text>
        <Text style={styles.info}>ID Proyecto: docufirma-ayg | Fecha: {date}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.colProduct}>Producto</Text>
          <Text style={styles.colQty}>Cantidad</Text>
        </View>
        {products.map((p) => (
          <View key={p.id} style={styles.tableRow}>
            <Text style={styles.colProduct}>{p.name}</Text>
            <Text style={styles.colQty}>{p.quantity} pz</Text>
          </View>
        ))}
      </View>

      <View style={styles.signatureSection}>
        <Text style={styles.signatureLabel}>Firma del Cliente:</Text>
        <Image src={signature} style={styles.signatureImage} />
      </View>
    </Page>
  </Document>
);
