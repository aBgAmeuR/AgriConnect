import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { InfoOrder } from './schema';
// Créer des styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Créer le document
export const DocumentPDF = ({ data }: { data: InfoOrder[] }) => (
  <Document>
    <Page>
      {data && (
        <>
          <Text>Client: {data[0].client}</Text>
          <Text>Mail: {data[0].email_user}</Text>
          <Text>Numéro: 0{data[0].phoneNumber_user}</Text>
          <Text></Text>
        </>
      )}
      {data?.map((item) => (
        <>
          <Text>Produit commandé: {item.name_product}</Text>
          <Text>{item.price_product}</Text>
          <Text>{item.desc_product}</Text>
          <Text></Text>
        </>
      ))}
    </Page>
  </Document>
);