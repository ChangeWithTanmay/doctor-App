import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, Video, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Appointment } from '../types';
import { format } from 'date-fns';

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/appointment/${appointment.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#0066CC';
      case 'completed':
        return '#34C759';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEE, MMM d, yyyy');
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.doctorInfo}>
          <Image source={{ uri: appointment.doctorImage }} style={styles.image} />
          <View>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.specialty}>{appointment.doctorSpecialty}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Calendar size={16} color="#666666" />
          <Text style={styles.detailText}>{formatDate(appointment.date)}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.timeText}>{appointment.time}</Text>
        </View>
        
        <View style={styles.detailItem}>
          {appointment.type === 'video' ? (
            <Video size={16} color="#0066CC" />
          ) : (
            <MapPin size={16} color="#FF9500" />
          )}
          <Text style={[
            styles.appointmentType, 
            { color: appointment.type === 'video' ? '#0066CC' : '#FF9500' }
          ]}>
            {appointment.type === 'video' ? 'Video Call' : 'In-Person Visit'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: '#666666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  appointmentType: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});