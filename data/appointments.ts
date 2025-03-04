import { Appointment } from '../types';

export const appointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop',
    date: '2025-06-01',
    time: '10:00',
    type: 'in-person',
    status: 'upcoming'
  },
  {
    id: '2',
    doctorId: '3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorSpecialty: 'Pediatrician',
    doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop',
    date: '2025-06-03',
    time: '14:00',
    type: 'video',
    status: 'upcoming'
  },
  {
    id: '3',
    doctorId: '5',
    doctorName: 'Dr. Aisha Patel',
    doctorSpecialty: 'Neurologist',
    doctorImage: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=300&auto=format&fit=crop',
    date: '2025-05-20',
    time: '11:00',
    type: 'in-person',
    status: 'completed'
  },
  {
    id: '4',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Dermatologist',
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop',
    date: '2025-05-15',
    time: '15:00',
    type: 'video',
    status: 'completed'
  },
  {
    id: '5',
    doctorId: '4',
    doctorName: 'Dr. James Wilson',
    doctorSpecialty: 'Orthopedic Surgeon',
    doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop',
    date: '2025-05-10',
    time: '09:00',
    type: 'in-person',
    status: 'cancelled'
  }
];