import { ChatThread, Message } from '../types';

export const chatThreads: ChatThread[] = [
  {
    id: '1',
    participantId: '1',
    participantName: 'Dr. Sarah Johnson',
    participantImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop',
    lastMessage: 'Please let me know if you have any questions before your appointment.',
    lastMessageTime: Date.now() - 3600000, // 1 hour ago
    unreadCount: 1
  },
  {
    id: '2',
    participantId: '3',
    participantName: 'Dr. Emily Rodriguez',
    participantImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop',
    lastMessage: 'The prescription has been sent to your pharmacy.',
    lastMessageTime: Date.now() - 86400000, // 1 day ago
    unreadCount: 0
  },
  {
    id: '3',
    participantId: '5',
    participantName: 'Dr. Aisha Patel',
    participantImage: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=300&auto=format&fit=crop',
    lastMessage: 'How are you feeling after starting the new medication?',
    lastMessageTime: Date.now() - 172800000, // 2 days ago
    unreadCount: 0
  }
];

export const messages: { [threadId: string]: Message[] } = {
  '1': [
    {
      id: '1-1',
      senderId: 'user',
      receiverId: '1',
      text: 'Hello Dr. Johnson, I have a question about my upcoming appointment.',
      timestamp: Date.now() - 7200000, // 2 hours ago
      read: true
    },
    {
      id: '1-2',
      senderId: '1',
      receiverId: 'user',
      text: 'Hi there! What would you like to know?',
      timestamp: Date.now() - 5400000, // 1.5 hours ago
      read: true
    },
    {
      id: '1-3',
      senderId: 'user',
      receiverId: '1',
      text: 'Should I fast before the appointment?',
      timestamp: Date.now() - 3900000, // 1.08 hours ago
      read: true
    },
    {
      id: '1-4',
      senderId: '1',
      receiverId: 'user',
      text: 'Please let me know if you have any questions before your appointment.',
      timestamp: Date.now() - 3600000, // 1 hour ago
      read: false
    }
  ],
  '2': [
    {
      id: '2-1',
      senderId: 'user',
      receiverId: '3',
      text: 'Dr. Rodriguez, my son has been having a fever since yesterday.',
      timestamp: Date.now() - 172800000, // 2 days ago
      read: true
    },
    {
      id: '2-2',
      senderId: '3',
      receiverId: 'user',
      text: 'I\'m sorry to hear that. What\'s his temperature?',
      timestamp: Date.now() - 171000000, // 1.98 days ago
      read: true
    },
    {
      id: '2-3',
      senderId: 'user',
      receiverId: '3',
      text: 'It\'s 101.3°F',
      timestamp: Date.now() - 169200000, // 1.96 days ago
      read: true
    },
    {
      id: '2-4',
      senderId: '3',
      receiverId: 'user',
      text: 'I\'ll prescribe some medication. Make sure he stays hydrated.',
      timestamp: Date.now() - 90000000, // 1.04 days ago
      read: true
    },
    {
      id: '2-5',
      senderId: '3',
      receiverId: 'user',
      text: 'The prescription has been sent to your pharmacy.',
      timestamp: Date.now() - 86400000, // 1 day ago
      read: true
    }
  ],
  '3': [
    {
      id: '3-1',
      senderId: '5',
      receiverId: 'user',
      text: 'Hello! Just following up on your last visit.',
      timestamp: Date.now() - 259200000, // 3 days ago
      read: true
    },
    {
      id: '3-2',
      senderId: 'user',
      receiverId: '5',
      text: 'Hi Dr. Patel, I\'ve been feeling better but still have occasional headaches.',
      timestamp: Date.now() - 258000000, // 2.99 days ago
      read: true
    },
    {
      id: '3-3',
      senderId: '5',
      receiverId: 'user',
      text: 'I\'ll adjust your medication. Let\'s try a different dosage.',
      timestamp: Date.now() - 172800000, // 2 days ago
      read: true
    },
    {
      id: '3-4',
      senderId: '5',
      receiverId: 'user',
      text: 'How are you feeling after starting the new medication?',
      timestamp: Date.now() - 172800000, // 2 days ago
      read: true
    }
  ]
};