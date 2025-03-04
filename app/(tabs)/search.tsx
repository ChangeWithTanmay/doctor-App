import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Search as SearchIcon, X } from 'lucide-react-native';
import Header from '../../components/Header';
import DoctorCard from '../../components/DoctorCard';
import { doctors } from '../../data/doctors';
import { useLocalSearchParams } from 'expo-router';

const specialties = [
  { id: '1', name: 'Cardiology', icon: 'heart', color: '#FF3B30' },
  { id: '2', name: 'Neurology', icon: 'brain', color: '#5856D6' },
  { id: '3', name: 'General', icon: 'stethoscope', color: '#34C759' },
  { id: '4', name: 'Orthopedic', icon: 'bone', color: '#FF9500' },
  { id: '5', name: 'Ophthalmology', icon: 'eye', color: '#007AFF' },
  { id: '6', name: 'Dental', icon: 'tooth', color: '#5AC8FA' },
];

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const initialSpecialty = params.specialty as string || '';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchQuery === '' || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === '' || 
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    
    return matchesSearch && matchesSpecialty;
  });

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(selectedSpecialty === specialty ? '' : specialty);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <Header title="Find Doctors" showNotification />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.specialtiesContainer}
      >
        {specialties.map(specialty => (
          <TouchableOpacity 
            key={specialty.id}
            style={[
              styles.specialtyChip,
              selectedSpecialty === specialty.name && styles.selectedSpecialtyChip
            ]}
            onPress={() => handleSpecialtySelect(specialty.name)}
          >
            <Text 
              style={[
                styles.specialtyChipText,
                selectedSpecialty === specialty.name && styles.selectedSpecialtyChipText
              ]}
            >
              {specialty.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
        </Text>
      </View>
      
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DoctorCard doctor={item} />}
        contentContainerStyle={styles.doctorsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#333333',
  },
  specialtiesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  specialtyChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  selectedSpecialtyChip: {
    backgroundColor: '#0066CC',
  },
  specialtyChipText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedSpecialtyChipText: {
    color: '#FFFFFF',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsText: {
    fontSize: 14,
    color: '#666666',
  },
  doctorsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});