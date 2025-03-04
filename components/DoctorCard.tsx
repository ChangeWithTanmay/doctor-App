import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  compact?: boolean;
}

export default function DoctorCard({ doctor, compact = false }: DoctorCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/doctor/${doctor.id}`);
  };

  if (compact) {
    return (
      <TouchableOpacity 
        style={styles.compactContainer} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Image source={{ uri: doctor.image }} style={styles.compactImage} />
        <View style={styles.compactContent}>
          <Text style={styles.compactName}>{doctor.name}</Text>
          <Text style={styles.compactSpecialty}>{doctor.specialty}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: doctor.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.rating}>{doctor.rating}</Text>
          <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{doctor.experience}+</Text>
            <Text style={styles.infoLabel}>Years</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>${doctor.price}</Text>
            <Text style={styles.infoLabel}>Fee</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoItem: {
    marginRight: 24,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666666',
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  compactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  compactContent: {
    flex: 1,
  },
  compactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  compactSpecialty: {
    fontSize: 14,
    color: '#666666',
  },
});