import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { MapPin, ChevronDown, X, Plus } from 'lucide-react-native';
import { Location } from '../data/locations';

interface LocationSelectorProps {
  currentLocation: Location;
  savedLocations: Location[];
  onLocationChange: (location: Location) => void;
}

export default function LocationSelector({ 
  currentLocation, 
  savedLocations, 
  onLocationChange 
}: LocationSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationAddress, setNewLocationAddress] = useState('');

  const filteredLocations = savedLocations.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: Location) => {
    onLocationChange(location);
    setModalVisible(false);
    setSearchQuery('');
    setShowAddNew(false);
  };

  const handleAddNewLocation = () => {
    if (newLocationName.trim() === '' || newLocationAddress.trim() === '') {
      return;
    }

    const newLocation: Location = {
      id: `new-${Date.now()}`,
      name: newLocationName,
      address: newLocationAddress
    };

    onLocationChange(newLocation);
    setModalVisible(false);
    setNewLocationName('');
    setNewLocationAddress('');
    setShowAddNew(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.locationButton} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <MapPin size={18} color="#0066CC" />
        <Text style={styles.locationText} numberOfLines={1}>
          {currentLocation.name}
        </Text>
        <ChevronDown size={16} color="#666666" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity 
                onPress={() => {
                  setModalVisible(false);
                  setShowAddNew(false);
                  setSearchQuery('');
                }}
              >
                <X size={24} color="#333333" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search locations..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {!showAddNew ? (
              <>
                <FlatList
                  data={filteredLocations}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={[
                        styles.locationItem,
                        currentLocation.id === item.id && styles.selectedLocation
                      ]}
                      onPress={() => handleLocationSelect(item)}
                    >
                      <View style={styles.locationItemContent}>
                        <MapPin 
                          size={18} 
                          color={currentLocation.id === item.id ? "#0066CC" : "#666666"} 
                        />
                        <View style={styles.locationDetails}>
                          <Text style={styles.locationName}>{item.name}</Text>
                          <Text style={styles.locationAddress} numberOfLines={1}>
                            {item.address}
                          </Text>
                        </View>
                      </View>
                      {item.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultText}>Default</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.locationsList}
                />

                <TouchableOpacity 
                  style={styles.addNewButton}
                  onPress={() => setShowAddNew(true)}
                >
                  <Plus size={18} color="#0066CC" />
                  <Text style={styles.addNewText}>Add New Location</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.addNewContainer}>
                <Text style={styles.inputLabel}>Location Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Home, Work, etc."
                  value={newLocationName}
                  onChangeText={setNewLocationName}
                />

                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter full address"
                  value={newLocationAddress}
                  onChangeText={setNewLocationAddress}
                />

                <View style={styles.addNewActions}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setShowAddNew(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.saveButton,
                      (newLocationName.trim() === '' || newLocationAddress.trim() === '') && 
                      styles.disabledButton
                    ]}
                    onPress={handleAddNewLocation}
                    disabled={newLocationName.trim() === '' || newLocationAddress.trim() === ''}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  locationText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    marginHorizontal: 6,
    maxWidth: 150,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  locationsList: {
    paddingHorizontal: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  locationItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedLocation: {
    backgroundColor: '#F2F2F7',
  },
  locationDetails: {
    marginLeft: 12,
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666666',
  },
  defaultBadge: {
    backgroundColor: '#0066CC20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '500',
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 8,
  },
  addNewText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
    marginLeft: 8,
  },
  addNewContainer: {
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  addNewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#0066CC',
    borderRadius: 10,
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#0066CC80',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});