export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  price: number;
  image: string;
  availability: {
    [date: string]: string[]; // date -> available time slots
  };
  about: string;
  education: string[];
  hospital: string;
  location: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  type: 'in-person' | 'video';
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
  read: boolean;
}

export interface ChatThread {
  id: string;
  participantId: string;
  participantName: string;
  participantImage: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  medicalRecords: {
    id: string;
    title: string;
    date: string;
    file: string;
  }[];
}