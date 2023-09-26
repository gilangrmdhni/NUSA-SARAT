import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const dummyReportData = [
  {
    id: 1,
    subject: 'Ujian Sarat',
    tanggal: '20-09-2023',
    grade: 'A',
  },
  {
    id: 2,
    subject: 'Submit Sarat',
    tanggal: '22-09-2023',
    grade: 'A-',
  },
  {
    id: 3,
    subject: 'Submit Sarat',
    tanggal: '25-09-2023',
    grade: 'B+',
  },
  // Tambahkan lebih banyak data laporan hasil ujian sesuai kebutuhan
];

const ReportScreen = () => {
  const [reportData, setReportData] = useState(dummyReportData);

  return (
    <View style={styles.container}>
      <FlatList
        data={reportData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reportItem}>
            <View style={styles.subjectContainer}>
              <Text style={styles.subject}>{item.subject}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.tanggal}>Tanggal: {item.tanggal}</Text>
              <Text style={styles.grade}>Kelas: {item.grade}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  reportItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  subjectContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
  },
  subject: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  tanggal: {
    fontSize: 18,
    color: '#555',
  },
  grade: {
    fontSize: 18,
    color: '#555',
  },
});

export default ReportScreen;
