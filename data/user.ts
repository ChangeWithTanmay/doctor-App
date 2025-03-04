import { User } from '../types';

export const user: User = {
  id: 'user',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 123-4567',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
  medicalRecords: [
    {
      id: 'rec1',
      title: 'Annual Physical Examination',
      date: '2025-01-15',
      file: 'physical_exam_report.pdf'
    },
    {
      id: 'rec2',
      title: 'Blood Test Results',
      date: '2025-02-20',
      file: 'blood_test_results.pdf'
    },
    {
      id: 'rec3',
      title: 'Vaccination Record',
      date: '2025-03-10',
      file: 'vaccination_record.pdf'
    }
  ]
};