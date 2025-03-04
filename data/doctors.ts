import { Doctor } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 124,
    experience: 12,
    price: 150,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop',
    availability: {
      '2025-06-01': ['09:00', '10:00', '14:00', '16:00'],
      '2025-06-02': ['11:00', '13:00', '15:00'],
      '2025-06-03': ['09:00', '10:00', '11:00', '14:00', '16:00'],
    },
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
    education: [
      'MD, Harvard Medical School',
      'Residency, Massachusetts General Hospital',
      'Fellowship in Cardiology, Johns Hopkins Hospital'
    ],
    hospital: 'City Heart Center',
    location: 'New York, NY'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    rating: 4.8,
    reviews: 98,
    experience: 8,
    price: 120,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop',
    availability: {
      '2025-06-01': ['10:00', '11:00', '15:00'],
      '2025-06-02': ['09:00', '13:00', '16:00'],
      '2025-06-03': ['10:00', '11:00', '14:00', '15:00'],
    },
    about: 'Dr. Michael Chen is a dermatologist specializing in medical and cosmetic dermatology. He has expertise in treating acne, eczema, psoriasis, and skin cancer.',
    education: [
      'MD, Stanford University School of Medicine',
      'Residency in Dermatology, UCSF Medical Center'
    ],
    hospital: 'Clear Skin Dermatology Clinic',
    location: 'San Francisco, CA'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    rating: 4.9,
    reviews: 156,
    experience: 10,
    price: 100,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop',
    availability: {
      '2025-06-01': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      '2025-06-02': ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      '2025-06-03': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    },
    about: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She has a special interest in childhood development and preventive care.',
    education: [
      'MD, University of Pennsylvania School of Medicine',
      'Residency in Pediatrics, Children\'s Hospital of Philadelphia'
    ],
    hospital: 'Sunshine Pediatric Center',
    location: 'Chicago, IL'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic Surgeon',
    rating: 4.7,
    reviews: 87,
    experience: 15,
    price: 200,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop',
    availability: {
      '2025-06-01': ['09:00', '11:00', '14:00'],
      '2025-06-02': ['10:00', '13:00', '15:00'],
      '2025-06-03': ['09:00', '11:00', '14:00', '16:00'],
    },
    about: 'Dr. James Wilson is an orthopedic surgeon specializing in sports medicine and joint replacement surgery. He has treated professional athletes and has extensive experience in minimally invasive surgical techniques.',
    education: [
      'MD, Duke University School of Medicine',
      'Residency in Orthopedic Surgery, Mayo Clinic',
      'Fellowship in Sports Medicine, Andrews Institute'
    ],
    hospital: 'Advanced Orthopedic Center',
    location: 'Boston, MA'
  },
  {
    id: '5',
    name: 'Dr. Aisha Patel',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 112,
    experience: 11,
    price: 180,
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=300&auto=format&fit=crop',
    availability: {
      '2025-06-01': ['10:00', '11:00', '15:00', '16:00'],
      '2025-06-02': ['09:00', '10:00', '14:00', '15:00'],
      '2025-06-03': ['11:00', '13:00', '14:00', '16:00'],
    },
    about: 'Dr. Aisha Patel is a neurologist with expertise in headache disorders, multiple sclerosis, and neurodegenerative diseases. She takes a comprehensive approach to neurological care, combining medication management with lifestyle modifications.',
    education: [
      'MD, Johns Hopkins University School of Medicine',
      'Residency in Neurology, Massachusetts General Hospital',
      'Fellowship in Headache Medicine, Jefferson Headache Center'
    ],
    hospital: 'Neuroscience Institute',
    location: 'Philadelphia, PA'
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialty: 'Psychiatrist',
    rating: 4.9,
    reviews: 78,
    experience: 9,
    price: 160,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop',
    availability: {
      '2025-06-01': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      '2025-06-02': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      '2025-06-03': ['10:00', '11:00', '14:00', '15:00', '16:00'],
    },
    about: 'Dr. Robert Kim is a psychiatrist specializing in mood disorders, anxiety, and PTSD. He combines medication management with psychotherapy to provide comprehensive mental health care.',
    education: [
      'MD, Yale School of Medicine',
      'Residency in Psychiatry, New York-Presbyterian Hospital',
      'Fellowship in Psychopharmacology, Columbia University Medical Center'
    ],
    hospital: 'Mindful Psychiatry Clinic',
    location: 'Seattle, WA'
  }
];