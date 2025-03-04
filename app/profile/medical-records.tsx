import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FileText, Download } from 'lucide-react-native';
import Header from '../../components/Header';
import { user } from '../../data/user';

export default function MedicalRecordsScreen() {
  const handleDownload = (fileId: string) => {
    // In a real app, this would download the file
    console.log(`Downloading file ${fileId}`);
  };

  const renderRecord = ({ item }: { item: any }) => {
    return (
      <View style={styles.recordCard}>
        <View style={styles.recordIconContainer}>
          <FileText size={24} color="#0066CC" />
        </View>
        
        <View style={styles.recordInfo}>
          <Text style={styles.recordTitle}>{item.title}</Text>
          <Text style={styles.recordDate}>{item.date}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={() => handleDownload(item.id)}
        >
          <Download size={20} color="#0066CC" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Medical Records" showBack />
      
      <FlatList
        data={user.medicalRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderRecord}
        contentContainerStyle={styles.recordsList}
        ListHeaderComponent={
          <Text style={styles.headerText}>
            Your medical records are securely stored and can be accessed anytime.
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No medical records found</Text>
          </View>
        }
      />
      
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload New Record</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  headerText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  recordsList: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0066CC20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 14,
    color: '#666666',
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0066CC20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});