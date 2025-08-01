import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer ,Font} from '@react-pdf/renderer';
import SourceHanSansCN from './SubsetOTF/CN/SourceHanSansCN-Light.otf';
// 注册字体
Font.register({
    family: 'SourceHanSansCN',
    src: SourceHanSansCN,
  });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'SourceHanSansCN',
    backgroundColor: '#f7f9fa',
  },
  title: {
    fontSize: 22,
    color: '#1765ad',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'SourceHanSansCN',
    marginBottom: 24,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    marginBottom: 20,
    boxShadow: '0 2px 8px #f0f1f2',
    fontFamily: 'SourceHanSansCN',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    fontFamily: 'SourceHanSansCN',
    marginBottom: 10,
  },
  label: {
    width: 120,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
    fontFamily: 'SourceHanSansCN',
    fontSize: 12,
  },
  value: {
    color: '#555',
    fontSize: 12,
    fontFamily: 'SourceHanSansCN',
    flex: 1,
    wordBreak: 'break-all',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontFamily: 'SourceHanSansCN',
    fontSize: 10,
    color: '#aaa',
  },
});

const PDFPreView = ({ title, footer, data }) => (
  <PDFViewer width={800} height={500} style={{ border: '1px solid #eee' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.card}>
          {Object.entries(data).map(([key, value]) => (
            <View style={styles.row} key={key}>
              <Text style={styles.label}>{key}：</Text>
              <Text style={styles.value}>{value !== undefined && value !== null ? String(value) : ''}</Text>
            </View>
          ))}
        </View>
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            typeof footer === 'function'
              ? footer(pageNumber, totalPages)
              : footer
          }
          fixed
        />
      </Page>
    </Document>
  </PDFViewer>
);

export default PDFPreView;
