import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star, Calendar, Video, MapPin, ChevronDown, ChevronUp } from 'lucide-react-native';
import Header from '../../components/Header';
import { doctors } from '../../data/doctors';
import { format } from 'date-fns';

export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const doctor = doctors.find(doc => doc.id === id);
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'in-person' | 'video'>('in-person');
  const [showFullAbout, setShowFullAbout] = useState(false);
  
  if (!doctor) {
    return (
      <View style={styles.container}>
        <Header title="Doctor Details" showBack />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Doctor not found</Text>
        </View>
      </View>
    );
  }

  const availableDates = Object.keys(doctor.availability);
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      // In a real app, this would create an appointment in the database
      router.push('/appointments');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEE, MMM d');
  };

  return (
    <View style={styles.container}>
      <Header title="Doctor Details" showBack />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: doctor.image }} style={styles.profileImage} />
          <Text style={styles.doctorName}>{doctor.name}</Text>
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
            <View style={styles.infoItem}>
              <Text style={styles.infoValue}>{doctor.hospital}</Text>
              <Text style={styles.infoLabel}>Hospital</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About Doctor</Text>
            <TouchableOpacity onPress={() => setShowFullAbout(!showFullAbout)}>
              {showFullAbout ? (
                <ChevronUp size={20} color="#0066CC" />
              ) : (
                <ChevronDown size={20} color="#0066CC" />
              )}
            </TouchableOpacity>
          </View>
          
          <Text style={styles.aboutText} numberOfLines={showFullAbout ? undefined : 3}>
            {doctor.about}
          </Text>
          
          {!showFullAbout && (
            <TouchableOpacity onPress={() => setShowFullAbout(true)}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {doctor.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.educationDot} />
              <Text style={styles.educationText}>{edu}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Type</Text>
          <View style={styles.appointmentTypeContainer}>
            <TouchableOpacity 
              style={[
                styles.appointmentTypeButton,
                selectedType === 'in-person' && styles.selectedTypeButton
              ]}
              onPress={() => setSelectedType('in-person')}
            >
              <MapPin 
                size={20} 
                color={selectedType === 'in-person' ? '#FFFFFF' : '#FF9500'} 
              />
              <Text 
                style={[
                  styles.appointmentTypeText,
                  selectedType === 'in-person' && styles.selectedTypeText
                ]}
              >
                In-Person
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.appointmentTypeButton,
                selectedType === 'video' && styles.selectedTypeButton,
                { backgroundColor: selectedType === 'video' ? '#0066CC' : '#0066CC20' }
              ]}
              onPress={() => setSelectedType('video')}
            >
              <Video 
                size={20} 
                color={selectedType === 'video' ? '#FFFFFF' : '#0066CC'} 
              />
              <Text 
                style={[
                  styles.appointmentTypeText,
                  selectedType === 'video' && styles.selectedTypeText,
                  { color: selectedType === 'video' ? '#FFFFFF' : '#0066CC' }
                ]}
              >
                Video Call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Dates</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesContainer}
          >
            {availableDates.map(date => (
              <TouchableOpacity 
                key={date}
                style={[
                  styles.dateButton,
                  selectedDate === date && styles.selectedDateButton
                ]}
                onPress={() => handleDateSelect(date)}
              >
                <Text 
                  style={[
                    styles.dateText,
                    selectedDate === date && styles.selectedDateText
                  ]}
                >
                  {formatDate(date)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <View style={styles.timeContainer}>
              {doctor.availability[selectedDate].map(time => (
                <TouchableOpacity 
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedTime === time && styles.selectedTimeButton
                  ]}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text 
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.selectedTimeText
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.bookButton,
            (!selectedDate || !selectedTime) && styles.disabledButton
          ]}
          onPress={handleBookAppointment}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
  },
  readMoreText: {
    fontSize: 14,
    color: '#0066CC',
    marginTop: 8,
  },
  educationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  educationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066CC',
    marginRight: 12,
  },
  educationText: {
    fontSize: 14,
    color: '#666666',
  },
  appointmentTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appointmentTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF950020',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 0.48,
  },
  selectedTypeButton: {
    backgroundColor: '#FF9500',
  },
  appointmentTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF9500',
    marginLeft: 8,
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  datesContainer: {
    paddingRight: 16,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  selectedDateButton: {
    backgroundColor: '#0066CC',
  },
  dateText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTimeButton: {
    backgroundColor: '#0066CC',
  },
  timeText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  bookButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#0066CC80',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});