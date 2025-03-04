import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, MapPin, Video, MessageSquare, Phone, X } from 'lucide-react-native';
import Header from '../../components/Header';
import { appointments } from '../../data/appointments';
import { format } from 'date-fns';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const appointment = appointments.find(app => app.id === id);
  
  if (!appointment) {
    return (
      <View style={styles.container}>
        <Header title="Appointment Details" showBack />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Appointment not found</Text>
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  const handleChat = () => {
    // Find the chat thread with this doctor
    router.push(`/chat/${appointment.doctorId}`);
  };

  const handleCancel = () => {
    // In a real app, this would update the appointment status in the database
    router.back();
  };

  return (
    <View style={styles.container}>
      <Header title="Appointment Details" showBack />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: getStatusColor(appointment.status) + '20' }
            ]}>
              <Text style={[
                styles.statusText, 
                { color: getStatusColor(appointment.status) }
              ]}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Text>
            </View>
          </View>
          
          <View style={styles.doctorContainer}>
            <Image source={{ uri: appointment.doctorImage }} style={styles.doctorImage} />
            <View>
              <Text style={styles.doctorName}>{appointment.doctorName}</Text>
              <Text style={styles.doctorSpecialty}>{appointment.doctorSpecialty}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Calendar size={20} color="#666666" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{formatDate(appointment.date)}</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Clock size={20} color="#666666" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>{appointment.time}</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                {appointment.type === 'video' ? (
                  <Video size={20} color="#0066CC" />
                ) : (
                  <MapPin size={20} color="#FF9500" />
                )}
              </View>
              <View>
                <Text style={styles.detailLabel}>Appointment Type</Text>
                <Text 
                  style={[
                    styles.detailValue,
                    { color: appointment.type === 'video' ? '#0066CC' : '#FF9500' }
                  ]}
                >
                  {appointment.type === 'video' ? 'Video Consultation' : 'In-Person Visit'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {appointment.status === 'upcoming' && (
          <View style={styles.actionsCard}>
            <Text style={styles.actionsTitle}>Actions</Text>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={handleChat}>
                <View style={[styles.actionIconContainer, { backgroundColor: '#0066CC20' }]}>
                  <MessageSquare size={20} color="#0066CC" />
                </View>
                <Text style={styles.actionText}>Send Message</Text>
              </TouchableOpacity>
              
              {appointment.type === 'video' && (
                <TouchableOpacity style={styles.actionButton}>
                  <View style={[styles.actionIconContainer, { backgroundColor: '#34C75920' }]}>
                    <Video size={20} color="#34C759" />
                  </View>
                  <Text style={styles.actionText}>Start Call</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.actionButton}>
                <View style={[styles.actionIconContainer, { backgroundColor: '#FF950020' }]}>
                  <Phone size={20} color="#FF9500" />
                </View>
                <Text style={styles.actionText}>Call Clinic</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {appointment.status === 'upcoming' && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <X size={20} color="#FF3B30" />
            <Text style={styles.cancelText}>Cancel Appointment</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  doctorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 16,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  actionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF3B30',
    marginLeft: 8,
  },
});