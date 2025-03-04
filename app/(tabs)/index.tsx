import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, Calendar, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import DoctorCard from '../../components/DoctorCard';
import SpecialtyCard from '../../components/SpecialtyCard';
import LocationSelector from '../../components/LocationSelector';
import { doctors } from '../../data/doctors';
import { user } from '../../data/user';
import { appointments } from '../../data/appointments';
import { savedLocations, Location } from '../../data/locations';

const specialties = [
  { id: '1', name: 'Cardiology', icon: 'heart', color: '#FF3B30' },
  { id: '2', name: 'Neurology', icon: 'brain', color: '#5856D6' },
  { id: '3', name: 'General', icon: 'stethoscope', color: '#34C759' },
  { id: '4', name: 'Orthopedic', icon: 'bone', color: '#FF9500' },
  { id: '5', name: 'Ophthalmology', icon: 'eye', color: '#007AFF' },
  { id: '6', name: 'Dental', icon: 'tooth', color: '#5AC8FA' },
];

export default function HomeScreen() {
  const router = useRouter();
  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;
  
  const [currentLocation, setCurrentLocation] = useState<Location>(
    savedLocations.find(loc => loc.isDefault) || savedLocations[0]
  );
  
  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleAppointmentPress = () => {
    if (nextAppointment) {
      router.push(`/appointment/${nextAppointment.id}`);
    }
  };

  const handleLocationChange = (location: Location) => {
    setCurrentLocation(location);
    // In a real app, you might want to fetch doctors near this location
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image source={{ uri: user.image }} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.locationContainer}>
        <LocationSelector 
          currentLocation={currentLocation}
          savedLocations={savedLocations}
          onLocationChange={handleLocationChange}
        />
      </View>

      <TouchableOpacity 
        style={styles.searchBar}
        onPress={handleSearchPress}
        activeOpacity={0.7}
      >
        <Search size={20} color="#8E8E93" />
        <Text style={styles.searchPlaceholder}>Search doctor, medicines etc.</Text>
      </TouchableOpacity>

      {nextAppointment && (
        <TouchableOpacity 
          style={styles.appointmentCard}
          onPress={handleAppointmentPress}
          activeOpacity={0.7}
        >
          <View style={styles.appointmentHeader}>
            <Text style={styles.appointmentTitle}>Upcoming Appointment</Text>
            <TouchableOpacity onPress={() => router.push('/appointments')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.appointmentContent}>
            <View style={styles.appointmentInfo}>
              <View style={styles.appointmentDetail}>
                <Calendar size={16} color="#666666" />
                <Text style={styles.appointmentText}>{nextAppointment.date}</Text>
              </View>
              <View style={styles.appointmentDetail}>
                <Text style={styles.appointmentTime}>{nextAppointment.time}</Text>
              </View>
            </View>
            
            <View style={styles.doctorInfo}>
              <Image source={{ uri: nextAppointment.doctorImage }} style={styles.doctorImage} />
              <View>
                <Text style={styles.doctorName}>{nextAppointment.doctorName}</Text>
                <Text style={styles.doctorSpecialty}>{nextAppointment.doctorSpecialty}</Text>
              </View>
            </View>
            
            <View style={styles.appointmentType}>
              {nextAppointment.type === 'video' ? (
                <View style={[styles.typeBadge, styles.videoBadge]}>
                  <Text style={styles.typeText}>Video Consultation</Text>
                </View>
              ) : (
                <View style={[styles.typeBadge, styles.inPersonBadge]}>
                  <MapPin size={14} color="#FF9500" />
                  <Text style={styles.inPersonText}>In-Person Visit</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialtiesContainer}
        >
          {specialties.map(specialty => (
            <SpecialtyCard key={specialty.id} specialty={specialty} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Doctors Near You</Text>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.locationIndicator}>
          <MapPin size={16} color="#666666" />
          <Text style={styles.locationIndicatorText} numberOfLines={1}>
            {currentLocation.address}
          </Text>
        </View>
        
        {doctors.slice(0, 3).map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#666666',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  locationContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 8,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0066CC',
  },
  appointmentContent: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
  },
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666666',
  },
  appointmentType: {
    alignItems: 'flex-start',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  videoBadge: {
    backgroundColor: '#0066CC20',
  },
  inPersonBadge: {
    backgroundColor: '#FF950020',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0066CC',
  },
  inPersonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF9500',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  specialtiesContainer: {
    paddingHorizontal: 16,
  },
  locationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  locationIndicatorText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
    flex: 1,
  },
});